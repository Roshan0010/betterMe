import React, { useState } from 'react';
import { database, storage } from '../utils/apprite'; // Ensure these are correct imports
import { Databases, ID } from 'appwrite'; // Ensure correct usage of Appwrite's ID
import moment from 'moment';
import imageCompression from 'browser-image-compression';

type Props = {
  docid: string
}

const TransformCard = ({ docid }: Props) => {
  const [text, setText] = useState('');
  const [isFirstFocus, setIsFirstFocus] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { selectionStart, selectionEnd, value } = event.currentTarget;

    if (event.key === 'Enter') {
      event.preventDefault();
      const beforeEnter = text.substring(0, selectionStart);
      const afterEnter = text.substring(selectionEnd);
      setText(beforeEnter + '\n* ' + afterEnter);
      setTimeout(() => {
        const textarea = event.currentTarget;
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 3;
        }
      }, 0);
    } else if (event.key === 'Backspace') {
      if (selectionStart === selectionEnd && value[selectionStart - 1] === '*' && value[selectionStart - 2] === '\n') {
        event.preventDefault();
        const beforeBullet = text.substring(0, selectionStart - 2);
        const afterBullet = text.substring(selectionEnd);
        setText(beforeBullet + afterBullet);
        setTimeout(() => {
          const textarea = event.currentTarget;
          if (textarea) {
            textarea.selectionStart = textarea.selectionEnd = selectionStart - 2;
          }
        }, 0);
      }
    }
  };

  const handleFocus = () => {
    if (isFirstFocus) {
      setText('* ');
      setIsFirstFocus(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPhoto = e.target.files?.[0];
    if (selectedPhoto) {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };

      try {
        const compressedFile = await imageCompression(selectedPhoto, options);
        const newFile = new File([compressedFile], selectedPhoto.name, {
          type: selectedPhoto.type,
          lastModified: Date.now()
        });
        setPhotoFile(newFile);
        const photoURL = URL.createObjectURL(newFile);
        setPhoto(photoURL);
      } catch (error) {
        console.error('Error compressing file:', error);
      }
    }
  };

  const handleOnSubmit = async () => {
    if (!docid) {
      console.error("Document ID is required");
      return;
    }

    try {
      let imageUrl = '';
      if (photoFile) {
        try {
          const photoUpload = await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_SKIN,
            ID.unique(),
            photoFile
          );
          console.log(photoUpload);
          imageUrl = `${import.meta.env.VITE_APPWRITE_URL}/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_SKIN}/files/${photoUpload.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
        } catch (error) {
          console.error("Error uploading photo:", error);
          return;
        }
      }

      const data = {
        description: text,
        imageUrl: imageUrl,
        faceTransform: docid
      };

      try {
        const createDocumentPromise = await database.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_SKIN_SUBTABLE_COLLECTION,
          ID.unique(),
          data
        );
        console.log(createDocumentPromise);
      } catch (error) {
        console.error("Error creating document:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className='w-full h-[15rem] flex gap-4'>
      {!photo ? (
        <div className='bg-[#2E2E2E] relative cursor-pointer w-[30%] flex text-white text-7xl justify-center items-center h-full rounded-xl'>
          +
          <input
            className="w-full h-full absolute opacity-0 cursor-pointer"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
      ) : (
        <img src={photo} className='w-[30%] h-full' alt="Uploaded" />
      )}

      <div className='w-full h-full flex flex-col bg-[#3C4040] items-center rounded-xl'>
        <textarea
          className='w-[100%] h-[80%] text-white bg-[#3C4040] text-2xl p-2 outline-none flex'
          value={text}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder='Share your journey detail here'
        ></textarea>
        <button className='bg-[#2F2F2F] cursor-pointer rounded-xl text-xl text-white w-[99.5%] h-[20%]'
          onClick={handleOnSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default TransformCard;