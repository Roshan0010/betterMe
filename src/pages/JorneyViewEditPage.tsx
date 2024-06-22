/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import TransformCard from "../components/TransformCard";
import TransformViewCard from "../components/TransformViewCard";
import { useParams } from "react-router";
import moment from "moment";
import { database, id, query } from "../utils/apprite";
import { userState } from '../store/atoms/AuthAtom';
import { useRecoilValue } from "recoil";

const JorneyViewEditPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [mainDescription, setMainDescription] = useState("");
  const [docid, setDocId] = useState("");
  const { date } = useParams();
  const user = useRecoilValue(userState);

  useEffect(() => {
    const todaysDate = moment().format('DD-MM-YYYY');
    console.log(typeof todaysDate)
    console.log(date)
    if (date === todaysDate) {
      setShowEdit(true);
    }
  }, [date]);

  useEffect(() => {
    const documentCheck = async () => {
      const todaysDate = moment().format("DD-MM-YYYY");
      console.log(todaysDate);

      try {
        const getSkinTransformData = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_SKIN_COLLECTION,
          [
            query.equal("date", todaysDate)
          ]
        );
        if (getSkinTransformData.total > 0) {
          setMainDescription(getSkinTransformData.documents[0].mainDescription);
          setDocId(getSkinTransformData.documents[0].$id);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        return false;
      }
    }

    const mainLogin = async () => {
      const check = await documentCheck();
      if (check) {
        // Update logic here
        console.log(docid);

        //geting all subtables logic for latter

      } else {
        const data = {
          date: moment().format("DD-MM-YYYY"),
          mainDescription: mainDescription,
          users: user.id,
          faceSubTable: [],
          done: false
        }

        try {
          const createDocumentPromise = await database.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_SKIN_COLLECTION,
            id.unique(),
            data
          );
          console.log(createDocumentPromise);
        } catch (error) {
          console.log(error);
        }
      }
    }
    mainLogin();
  }, [docid]);



  return (
    <div className='min-h-[100vh] w-full bg-[#020913] flex flex-col items-center gap-10 p-4'>
      <div className="w-[85%] flex flex-col gap-10">
        {showEdit && <TransformCard docid={docid} />}
        <TransformViewCard />
        <div>
          <p className="text-white text-start text-4xl mb-4">Days Description</p>
          <input
            type="text"
            value={mainDescription}
            onChange={(e) => setMainDescription(e.target.value)}
            className="bg-red-400 text-white w-full flex text-2xl h-[10rem] rounded-xl p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default JorneyViewEditPage;