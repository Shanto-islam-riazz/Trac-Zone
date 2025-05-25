import React, { useState, useEffect } from 'react';

const FixedClock = ({ personalClock, onEdit }) => {
  const [time, setTime] = useState(new Date(personalClock.datetime));

  // useEffect(() => {
  //   const interval = setInterval(() => {
      
      
  //     // setTime(new Date(personalClock.datetime));


  //     setTime(prev => new Date(prev.getTime() + 1000));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [personalClock.datetime]);

  // const getFormattedTime = () => time.toLocaleTimeString();
  // const getFormattedDate = () => time.toDateString();




useEffect(() => {
  setTime(new Date(personalClock.datetime)); // update immediately when datetime changes
  const interval = setInterval(() => {
    setTime(prev => new Date(prev.getTime() + 1000));
  }, 1000);

  return () => clearInterval(interval);
}, [personalClock.datetime]);

const getFormattedTime = () => time.toLocaleTimeString();
const getFormattedDate = () => time.toDateString();





  return (
    <div style={{
    //   border: '2px solid #333',
    //   padding: '20px',
    //   margin: '20px auto',
    //   width: '60%',
    //   textAlign: 'center',
    //   borderRadius: '10px',
    //   backgroundColor: '#f0f0f0'



  fontSize: '20px',
  background:'f9f9f9',
  padding:'30px',
  marginBottom:'20px',
  border:'2px solid #555',
  borderRadius:'12px',
  backgroundColor: '#e0ecf8',



    }}>
      <h2>{personalClock.title} </h2>
      <p>(UTC {personalClock.offset >= 0 ? '+' : ''}{personalClock.offset})</p>
      <p>{personalClock.diffNote}</p>
      <h1>{getFormattedTime()}</h1>
      <p>{getFormattedDate()}</p>
      <button onClick={() => onEdit(personalClock)}>Edit</button>
    </div>
  );
};

export default FixedClock;



