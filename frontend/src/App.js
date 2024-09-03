import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NewTicket from './pages/NewTicket';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      {/* TODO: fix error messages */}
      <ToastContainer />

    </>
  );
}

export default App;
