// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import ClockCard from './components/ClockCard';
import EditModal from './components/EditModal';
import FixedClock from './components/FixedClock';



const App = () => {
  const [clocks, setClocks] = useState([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [offset, setOffset] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [clockToEdit, setClockToEdit] = useState(null);

  // const [showEditModal, setShowEditModal] = useState(false);
  
  
  
  
  const [personalClock, setPersonalClock] = useState({
    id: 'personal',
  title: 'My Clock',
  datetime: new Date(),
  offset: 0,
  diffNote: ''
});



// const handlePersonalTimezoneChange = (offset) => {
// setPersonalClock(prev => ({
//   ...prev,
//   offset: offset,
//   // optionally recalculate time here if needed
// }));
// };



  const handleAddClock = () => {
    if (!title || !time || !date) return alert("All fields are required!");

  

    const fullDate = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = (fullDate.getTime() - now.getTime()) / 3600000;
    const diffNote = diff > 0 ? `${diff.toFixed(2)} hrs ahead` : `${Math.abs(diff).toFixed(2)} hrs behind`;

    setClocks([...clocks, {
      id: Date.now(),
      title,
      datetime: fullDate,
      offset,
      diffNote
    }]);

    setTitle('');
    setTime('');
    setDate('');
  };

  const deleteClock = id => {
    setClocks(clocks.filter(c => c.id !== id));
  };

  const handleEdit = (clock) => {
    setClockToEdit(clock);
    setModalVisible(true);
  };

  // const handleSaveEdit = (updatedClock) => {
  //   // setClocks(clocks.map(c => c.id === updatedClock.id ? updatedClock : c));
  //   setClocks(prevClocks =>
  //   prevClocks.map(clock =>
  //     clock.id === updatedClock.id ? updatedClock : clock
  //   )
  // );
  // setShowEditModal(false);
  // };






// const handleSaveEdit = (updatedClock) => {

// // console.log("Saving Updated Clock:", updatedClock);

//   const fullDate = new Date(`${updatedClock.date}T${updatedClock.time}`);

// // console.log("New full datetime:", fullDate);

//   const now = new Date();
//   const diff = (fullDate.getTime() - now.getTime()) / 3600000;
//   const diffNote = diff > 0 ? `${diff.toFixed(2)} hrs ahead` : `${Math.abs(diff).toFixed(2)} hrs behind`;

//   const newClock = {
//     ...updatedClock,
//     datetime: fullDate,
//     diffNote
//   };





// if (updatedClock.id === 'personal') {
//     setPersonalClock(newClock);
//   } else {
//     setClocks(prevClocks =>
//       prevClocks.map(clock =>
//         clock.id === updatedClock.id ? newClock : clock
//       )
//     );
//   }


//   // setClocks(prevClocks =>
//   //   prevClocks.map(clock =>
//   //     clock.id === updatedClock.id ? newClock : clock
//   //   )
//   // );

//   setModalVisible(false);
// };







const handleSaveEdit = (updatedClock) => {
  const now = new Date();
  const diff = (updatedClock.datetime.getTime() - now.getTime()) / 3600000;
  const diffNote = diff > 0 ? `${diff.toFixed(2)} hrs ahead` : `${Math.abs(diff).toFixed(2)} hrs behind`;

  const newClock = {
    ...updatedClock,
    diffNote
  };

  if (updatedClock.id === 'personal') {
    setPersonalClock(newClock);
  } else {
    setClocks(prevClocks =>
      prevClocks.map(clock =>
        clock.id === updatedClock.id ? newClock : clock
      )
    );
  }

  setModalVisible(false);
};

















  return (

    

    <div className="container">
<FixedClock personalClock={personalClock} onEdit={handleEdit}  />
      <h2>Time Zone</h2>
      <div>
        <select onChange={(e) => setOffset(parseFloat(e.target.value))}>
          <option value="0">Custom</option>
          <option value="-6">Central America Standard Time (UTC-6)</option>
          <option value="6">Bangladesh Standard Time (UTC+6)</option>
        </select>
        <input placeholder="Type your clock title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button onClick={handleAddClock}>Set Time</button>
      </div>




      <div>
        {clocks.map(clock => (
          <ClockCard
            key={clock.id}
            data={clock}
            onDelete={() => deleteClock(clock.id)}
            onEdit={() => handleEdit(clock) }
            // onEdit={() => alert("Edit feature not implemented yet.")}
          />
        ))}
      </div>
      <EditModal
        show={modalVisible}
        clock={clockToEdit || {}}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default App;





