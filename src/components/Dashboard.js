import useAuth from "./useAuth";
import {useNavigate} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import url from '../url';
import './Books.css';
import classes from './Dashboard.module.css';

const Dahsboard = (props)=>{
    //const navigate = useNavigate();
    const credentials  = useAuth();
   // console.log('dashboard',credentials);
    const [user, setUser] = useState(null);
    const [returnActions, setreturnActions] = useState(0);
    let issue = false;
    let issuedList = [];
    let reservedList = [];

    async function returnHandler(isbn){
        console.log(isbn,'return');
        let res = await axios.post(`${url}returnBook`,{'ISBN':isbn},{
            headers:{
                authorization:credentials.authenticated
            }
        });
        //console.log(res);
        setreturnActions(state=>{
            state++;
            return state
        })
    }

    async function cancelHandler(isbn){
        console.log(isbn,'cancel');
        let res = await axios.post(`${url}removeBookReservation`,{'ISBN':isbn},{
            headers:{
                authorization:credentials.authenticated
            }
        });
        //console.log(res);
        setreturnActions(state=>{
            state++;
            return state
        })
    }

    if(user){
        issuedList = user.issuedBooks.map((item,index)=>{
            let dueDate = new Date(item.dueDate);
            return <tr key={item.ISBN} className='body-row'>
                <td>{item.title}</td>
                <td>{item.ISBN}</td>
                <td>{dueDate.toDateString()}</td>
                <td><button onClick={()=>returnHandler(item.ISBN)}>Return</button></td>
            </tr>
        })

        reservedList = user.reservedBooks.map((item,index)=>{
            return <tr key={item.ISBN} className='body-row'>
                <td>{item.title}</td>
                <td>{item.ISBN}</td>
                <td>-</td>
                <td><button onClick={()=>cancelHandler(item.ISBN)}>Cancel</button></td>
            </tr>
        })
    
    }

    useEffect(()=>{
       // console.log('dashboard-useeffect');
    if(credentials.authenticated){
        axios.get(`${url}user`,{
            headers:{
                authorization:credentials.authenticated
            }
        }).then(res=>{
            console.log(res);
            setUser(res.data);
        });
    }
    },[returnActions]);
    
    if(!credentials.authenticated){
        return (
            <Navigate replace to={'/signin'}/>
        )
    }

    return (
        <>
       <div className={classes["dashboard-user"]}> {user && <h2>User:   {user.email}</h2>}</div>
        <table className="table-container">
            
            <thead>
            <tr>
                    <th>Book</th>
                    <th>ISBN</th>
                    <th>Due Date</th>
                    <th>Return/Cancel</th>
                </tr>   
            </thead>
            <tbody>
                <tr className={classes["dashboard-heading"]}><td>Issued Books: {issuedList.length}</td></tr>
                {user && issuedList}
                <tr className={classes["dashboard-heading"]}><td>Reserved Books: {reservedList.length}</td></tr>
                {user && reservedList}
            </tbody>
        </table>
        </>

    );

    
};

export default  Dahsboard;