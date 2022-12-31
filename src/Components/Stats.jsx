import React, { useEffect } from 'react'
import Graph from './Graph'
import { useAlert } from '../Context/AlertContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';

const Stats = ({wpm, accuracy, correctChars, incorrectChars, missedChars, extraChars, graphData}) => {
  var timeSet = new Set();
  const {setAlert} = useAlert();   //alert

  const newGraph = graphData.filter((i)=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  })
    //push stats data to firestore
  const [user] = useAuthState(auth);
          const pushResultToDatabase = async ()=>{
              const resultsRef = db.collection('Results');
              const {uid} = auth.currentUser;
              await resultsRef.add({
                wpm: wpm,
                accuracy: accuracy,
                characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
                userID: uid,
                timeStamp: new Date()
            }).then((response)=>{
                setAlert({
                    open: true,
                    type: 'success',
                    message: 'result saved to db'
                });
            });
          }

          //push data when components is loaded
    useEffect(()=>{
       if(user){
          //saving because user is logged in;
          pushResultToDatabase();
      }
      else{
          //no user, no save
          setAlert({
              open: true,
              type: 'warning',
              message: 'login to save results'
          });
        }
    },[]);
  

  return (
    <div className="stats-box">
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}%</div>
            <div className="title">Characters</div>
            <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
        </div>
        <div className="right-stats">
            {/* graph comp will go here */}
            
            <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats