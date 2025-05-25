import React, { useEffect, useState } from 'react';

const ClockCard = ({ clock, data, onDelete, onEdit }) => {


  const [time, setTime] = useState(new Date(data.datetime));

  useEffect(() => {

   

    
    setTime(new Date(data.datetime));
    const interval = setInterval(() => {
      setTime(prev => new Date(prev.getTime() + 1000));
    }, 1000);
    return () => clearInterval(interval);
  // }, []);
  }, [data.datetime]);
  

  const getFormattedTime = () => time.toLocaleTimeString();
  const getFormattedDate = () => time.toDateString();

  return (
    <div className="card">
      <div className="zone-name"><strong>{data.title}</strong></div>
      <div>(UTC {data.offset >= 0 ? '+' : ''}{data.offset})</div>
      <div>{data.diffNote}</div>
      <div className="clock-time">{getFormattedTime()}</div>
      <div>{getFormattedDate()}</div>
      <button style={{ backgroundColor: 'red', color: 'white' }} onClick={onDelete}>Delete</button>
      {/* <button onClick={onEdit}>Edit</button> */}
      <button onClick={ () => onEdit(data)}>Edit</button>
    </div>
  );
};

export default ClockCard;
