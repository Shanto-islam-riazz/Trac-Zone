// import React, { useState } from 'react';

// const EditModal = ({ show, clock, onClose, onSave }) => {
//   const [title, setTitle] = useState(clock.title);
//   const [time, setTime] = useState(clock.time);
//   const [date, setDate] = useState(clock.date);

//   const handleSave = () => {
//     onSave({
//       ...clock,
//       title,
//       time,
//       date
//     });
//     onClose();
//   };

//   if (!show) return null;

//   return (
//     <div style={{
//       position: 'fixed', top: 0, left: 0, width: '100%',
//       height: '100%', background: 'rgba(0,0,0,0.5)',
//       display: 'flex', justifyContent: 'center', alignItems: 'center'
//     }}>
//       <div style={{ background: 'white', padding: 20, borderRadius: 10 }}>
//         <h3>Edit Clock</h3>
//         <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" /><br />
//         <input type="time" value={time} onChange={e => setTime(e.target.value)} /><br />
//         <input type="date" value={date} onChange={e => setDate(e.target.value)} /><br />
//         <button onClick={handleSave}>Save</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default EditModal;


// import React, { useState, useEffect } from 'react';

// const EditModal = ({ show, clock, onClose, onSave }) => {
//   const [title, setTitle] = useState('');
//   const [time, setTime] = useState('');
//   const [date, setDate] = useState('');

//   useEffect(() => {
//     if (clock && clock.datetime) {
//       // const dateObj = new Date(clock.datetime);
//       setTitle(clock.title || '');
//       setTime(new Date(clock.datetime).toTimeString().slice(0, 5));
//       setDate(new Date(clock.datetime).toISOString().slice(0, 10));
//       // setTime(clock.datetime ? new Date(clock.datetime).toTimeString().slice(0, 5) : '');
//       // setDate(clock.datetime ? new Date(clock.datetime).toISOString().slice(0, 10) : '');
//     }
//   }, [clock]);

//   const handleSave = () => {
//     onSave({
//       id: clock.id,
//       title,
//       time,
//       date,

//     });
//     onClose();
//   };

//   if (!show) return null;

//   return (
//     <div style={{
//       position: 'fixed', top: 0, left: 0, width: '100%',
//       height: '100%', background: 'rgba(0,0,0,0.5)',
//       display: 'flex', justifyContent: 'center', alignItems: 'center'
//     }}>
//       <div style={{ background: 'white', padding: 20, borderRadius: 10 }}>
//         <h3>Edit Clock</h3>
//         <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" /><br />
//         <input type="time" value={time} onChange={e => {setTime(e.target.value)}} /><br />
//         <input type="date" value={date} onChange={e => {setDate(e.target.value)}} /><br />
//         <button onClick={handleSave}>Save</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default EditModal;





import React, { useState, useEffect } from 'react';

const timezoneOffsets = {
  UTC: 0,
  PST: -8,
  GMT: 0,
  EST: -5,
};

const EditModal = ({ show, clock, onClose, onSave }) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [zone, setZone] = useState('UTC');

  useEffect(() => {
    if (clock && clock.datetime) {
      const current = new Date(clock.datetime);
      setTime(current.toTimeString().slice(0, 5));
      setDate(current.toISOString().slice(0, 10));
      const foundZone = Object.entries(timezoneOffsets).find(([_, offset]) => offset === clock.offset);
      setZone(foundZone ? foundZone[0] : 'UTC');
    }
  }, [clock]);

  const handleZoneChange = (e) => {
    const newZone = e.target.value;
    const current = new Date(`${date}T${time}`);
    const newOffset = timezoneOffsets[newZone];
    const utc = current.getTime() - clock.offset * 3600000;
    const adjusted = new Date(utc + newOffset * 3600000);

    setTime(adjusted.toTimeString().slice(0, 5));
    setDate(adjusted.toISOString().slice(0, 10));
    setZone(newZone);
  };

  // const handleSave = () => {
  //   onSave({
  //     id: clock.id,
  //     title: clock.title, // keep original title
  //     time,
  //     date,
  //     offset: timezoneOffsets[zone],
  //   });
  //   onClose();
  // };







const handleSave = () => {
  const [hours, minutes] = time.split(':').map(Number);
  const [year, month, day] = date.split('-').map(Number);

  const localDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const utcTimestamp = localDate.getTime() - timezoneOffsets[zone] * 3600000;

  const updatedClock = {
    id: clock.id,
    title: clock.title,
    offset: timezoneOffsets[zone],
    datetime: new Date(utcTimestamp + timezoneOffsets[zone] * 3600000),
  };

  onSave(updatedClock);
  onClose();
};









  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%',
      height: '100%', background: 'rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 10 }}>
        <h3>Edit Clock</h3>
        <select value={zone} onChange={handleZoneChange}>
          <option value="UTC">UTC</option>
          <option value="PST">PST (UTC-8)</option>
          <option value="GMT">GMT</option>
          <option value="EST">EST (UTC-5)</option>
        </select><br />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} /><br />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} /><br />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
