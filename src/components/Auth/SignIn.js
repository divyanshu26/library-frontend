import { useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { authenticate, authError } from "../../authSlice";
import axios from "axios";
import {useNavigate, Navigate} from 'react-router-dom';
import useAuth from '../useAuth';
import './login.css';
import url from '../../url';


function login(user,navigate){
   return async dispatch=>{
       try{
        const response = await  axios.post(`${url}signin`,user);
        
       console.log(response);
       dispatch(authenticate(response.data.token));
       localStorage.setItem('token',response.data.token);
       console.log('@@@@@@@@@@@@@');
       navigate('/features',{replace:true});
       }catch(err){
        dispatch(authError('Invalid Credentials'));
       }
   }
}

const SignIn = ()=>{
    const passwordRef = useRef();
    const emailRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authState = useAuth();
    console.log(authState,'llllll');



    function submitHandler(evt){
        evt.preventDefault();
        console.log(authenticate());
        //dispatch(authenticate());
        dispatch(login({email:emailRef.current.value,password:passwordRef.current.value},navigate));
    }
    return (
        <>
        <div className="login-container">
        <div className="login-header"><h1>Sign In</h1></div>
        <div className="login-form">
        <form onSubmit={submitHandler}>
            <div className="input-contanier">
                <label>Email: </label>
                <input className="input-email login-input " ref={emailRef}/>
            </div>
            <div className="input-container">
                <label>Password: </label>
                <input className="login-input " ref={passwordRef}/>
            </div>
            <button className="button">Sign In</button>
        </form>
        {authState.errorMessage && <div><p>{authState.errorMessage}</p></div>}
        </div>
        </div>
        </>
    );
};

export default SignIn;