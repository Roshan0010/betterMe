import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page components
import Login from './pages/Login';
import Redirect from './pages/Redirect';

function App() {
  // const testing: string = useRecoilValue(test);
  // console.log(testing);

  return (
        <Routes>
          <Route path='/' element={<Redirect/>}></Route>
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
  );
}

export default App;


//register
