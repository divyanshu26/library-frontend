import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Books from './components/Books';

import Header from './components/Header';
import Signup from './components/Auth/Signup';
import { useSelector } from 'react-redux';
import useAuth from './components/useAuth';
import SignIn from './components/Auth/SignIn';
import { Navigate } from 'react-router-dom';
import Dahsboard from './components/Dashboard';



const App = ()=>{
    console.log('app');

   
    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/dashboard' element={<Dahsboard/>}/>
                <Route path='/books'  element={<Books/>} />
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path="*" element={<Navigate to="/books" replace />}
    />
            </Routes>
        </div>
    );
}

export default App;