import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import DogList from './DogList';
import NotFound from './NotFound';
import DogDetails from './DogDetails';
import dogs from './Dogs';

function App() {
  return (
     <div>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/dogs" element={<DogList dogs={dogs} />} />
          <Route path='/dogs/:name' element={<DogDetails dogs={dogs} /> } />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
     </div>
  );
}


export default App;
