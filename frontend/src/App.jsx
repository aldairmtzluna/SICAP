import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginEmail from './components/Login/Email/LoginEmail';
import LoginVerify from './components/Login/verify/LoginVerify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginEmail />} />
        <Route path="/login/verify" element={<LoginVerify />} />
      </Routes>
    </Router>
  );
}

export default App;