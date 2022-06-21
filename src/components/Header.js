import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { signout } from '../authSlice';
import {useNavigate} from 'react-router-dom';
import useAuth from './useAuth';
import '../HeaderStyle.css';


const  Header = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useAuth();

    function signOutHandler(){
        localStorage.removeItem('token');
        dispatch(signout());
        navigate('/',{replace:true});
    };

    const islogOutPaths = <><Link to='signin'>Sign In</Link>
                         <Link to='signup'>Sign Up</Link></>


    const isLogInPaths =<> 
    
                            <Link to='/' onClick={signOutHandler}>Sign Out</Link>
                             
                        </>
    return (
        <div className="header">
            <h2>Library</h2>
          
           <nav>
           <div className='links'>
           <Link to='/books'>Books</Link>
           <Link to='/dashboard'>Dashboard</Link>
           </div>
            <div className='login-links'>
            {!authState.authenticated && islogOutPaths}
           {authState.authenticated && isLogInPaths}
            </div>
           </nav>
        </div>
    )
}

export default Header;