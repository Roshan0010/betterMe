import { useEffect } from 'react';
import DaysCard from '../components/DaysCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { daysDataAtom, skinTransform } from '../store/atoms/skinAtom';
import { userState } from '../store/atoms/AuthAtom';
import moment from 'moment';

const SkinDashboard = () => {
  const [skinTrans, setSkinTrans] = useRecoilState(skinTransform);
  const user = useRecoilValue(userState);
  const [daysData, setDaysData] = useRecoilState(daysDataAtom);

  interface DaysDataAtom {
    id: string | null;
    date: string;
    done:boolean;
  }
  //enum combinations:
// done + id ->green
// !done + id -> red
// today ->  yellow
  enum theme {
    green,
    red,
    grey
  }

  useEffect(() => {
    const getAllSkinData = async () => {
      try {
        const getToken = localStorage.getItem('token');
        console.log(getToken);

        const response = await axios.post(
          '/api/get-skin-transform',
          { token: getToken },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        console.log(response.data.body.faceTransform);
        setSkinTrans(response.data.body.faceTransform);
      } catch (err) {
        console.error(err);
      }
    };

    getAllSkinData();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    const daysCalculation = () => {
      if (!user.skinStart) {
        return;
      }

      console.log("*********");
      const dateFromString = moment(user.skinStart, 'DD/MM/YYYY');
      console.log(dateFromString);

      if (!dateFromString.isValid()) {
        console.error("Invalid date format for user.skinStart");
        return;
      }

      const today = moment();
      const dateArray: DaysDataAtom[] = [];
      const currentDate = dateFromString.clone();
      let x = -1;
      console.log(skinTrans);

      while (currentDate.isBefore(today, 'day')) {
        const tempdate = currentDate.format('DD/MM/YYYY');
        let id = null;
        let done=false;

        while (x <= skinTrans.length) {
          x++;
         
          console.log(skinTrans[x]?.date)
          console.log(tempdate)
          if (skinTrans[x]?.date === tempdate) {
            console.log("here",id)
            id = skinTrans[x].id;
            done= skinTrans[x].done?true:false
            console.log(skinTrans[x]);
            break;
          }
        }

        const tempdata = {
          date: tempdate,
          id: id,
          done:done
        };
        dateArray.push(tempdata);
        currentDate.add(1, 'day');
      }
      console.log(dateArray)
const reversedateArray: DaysDataAtom[]=dateArray.reverse();
      console.log(reversedateArray);
      setDaysData(reversedateArray);
    };

    if (skinTrans.length) {
      daysCalculation();
    }
  }, [skinTrans, user.skinStart]); // Add dependencies here

  return (
    <div className="min-h-[100vh] bg-[#020913] flex flex-col gap-3 items-center p-4">
      {daysData.map((item, index) => {
        let currTheme=theme.red;
        if(item.done){
          currTheme=theme.green;
        }

        return(
        <DaysCard key={index} index={index} size={daysData.length}  id={item.id} date={item.date}
        theme={currTheme}
         />
      )})}
    </div>
  );
};
// Type={item.id?Type.}

export default SkinDashboard;






   


