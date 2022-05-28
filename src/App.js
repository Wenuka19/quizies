import React from 'react'
import ReactDOM from "react-dom/client";
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="main-container">
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/start' element={<Quiz />} />
            <Route path='*' element={<HomePage />} />
          </Routes>
        </div>
      </div >
    </BrowserRouter>

  );
}

export default App;
