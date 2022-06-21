import { useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { authenticate, authError } from "../../authSlice";
import axios from "axios";
import {useNavigate, Navigate} from 'react-router-dom';
import './login.css';
import url from '../../url';


function registerUser(user,navigate){
   return async dispatch=>{
       try{
        const response = await  axios.post(`${url}signup`,user);
        
       console.log(response);
       dispatch(authenticate(response.data.token));
       localStorage.setItem('token',response.data.token);
       navigate('/features',{replace:true});
       
       }catch(err){
        dispatch(authError(err.message))
       }
   }
}

const Signup = ()=>{
    const passwordRef = useRef();
    const emailRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authState = useSelector(state=>{
        //console.log(state,'=====');
        return state;
    });
    console.log(authState,'llllll');


    function submitHandler(evt){
        evt.preventDefault();
        console.log(authenticate());
        //dispatch(authenticate());
        dispatch(registerUser({email:emailRef.current.value,password:passwordRef.current.value},navigate));
    }
    return (
        <>
        <div className="login-container">
        <div className="login-header"><h1>Sign Up</h1></div>
       <div className="login-form">
       <form onSubmit={submitHandler}>
            <div className="input-container">
                <label>Email: </label>
                <input className="login-input input-email" ref={emailRef}/>
            </div>
            <div className="input-container">
                <label>Password: </label>
                <input  className="login-input" ref={passwordRef}/>
            </div>
           <div className="login-button">
           <button className="button">Sign Up</button>
           </div>
        </form>
       </div>
        {authState.auth.errorMessage && <div><p>{authState.auth.errorMessage}</p></div>}
        </div>
        </>
    );
};

export default Signup;