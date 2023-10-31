import React from 'react';
import './App.css';
import Notepad from './Notepad/Notepad';

function App() {
  // Define a note object with content
  const initialNote = { content: ' auhchas ', title: "First Note" };

  return (
    <div className="App">
      <Notepad note={initialNote} />
    </div>
  );
}

export default App;











































// App.js
// import './App.css';
// import Navbar from './Components/Navbar';
// import DateButton from './Components/DateButton';
// import ToDo from './Components/ToDo';
// import Hooks from './Components/Hooks';
// import Project from './Components/Project';
// import FormReg from './Components/FormReg';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// function App() {
//   const currentDate = new Date();
//   const formattedDate = currentDate.toLocaleDateString();
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Project />} />
//         <Route path="/dash" element={<ToDo />} />
//         <Route path="/team" element={<FormReg />} />
//         <Route path="/project" element={<Hooks />} />
//         <Route path="/calender" element={<DateButton date={formattedDate} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
