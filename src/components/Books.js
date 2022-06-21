import useAuth from "./useAuth";
import {useNavigate} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import url from '../url';
import './Books.css';

const Books = (props)=>{
    //const navigate = useNavigate();
    const credentials  = useAuth();
    //console.log('books',credentials);
    const [books, setBooks] = useState([]);
    const [issueActions, setIssueActions] = useState(0);
    let issue = false;

    function bookActionHandler(val,isbn,book){
        issue = true;
        let addUrl = '';
        if(val==='available'){
            addUrl = 'issueBook' ;
        }else{
            addUrl = 'reserveBook'
        };
        //console.log(addUrl);
        axios.post(`${url + addUrl}`,{'ISBN':isbn},{
            headers:{
                authorization:credentials.authenticated
            }
        }).then(res=>{
           // console.log(res);
            setIssueActions(state=>{
                state++;
                return state
            });
            alert(res.data.status);
           
        }).catch(err=>{
            //console.log(err);
            alert(err.data.status);
        });

    };

    const booklist = books.map((item,index)=>{
        return <tr key={item.ISBN} className='body-row'>
            <td>{item.title}</td>
            <td>{item.authors}</td>
            <td>{item.status.toUpperCase()}</td>
            <td>{item.placedAt}</td>
            <td>{item.ISBN}</td>
            <td><button onClick={()=>bookActionHandler(item.status,item.ISBN,item)}>{item.status === 'available' ? 'Issue' : 'Reserve'}</button></td>
        </tr>
    })


    useEffect(()=>{
        //console.log('books-useeffect');
        if(credentials.authenticated){
            axios.get(`${url}getBooks`,{
                headers:{
                    authorization:credentials.authenticated
                }
            }).then(res=>{
               // console.log(res);
                setBooks(res.data);
            });
        }
    },[issueActions]);
    
    if(!credentials.authenticated){
        return (
            <Navigate replace to={'/signin'}/>
        )
    }

    return (
        <>
        <table className="table-container">
            <thead>
            <tr>
                    <th>Book</th>
                    <th>Authors</th>
                    <th>Status</th>
                    <th>Placed At</th>
                    <th>ISBN</th>
                    <th>Issue/Reserve</th>
                </tr>   
            </thead>
            <tbody>
                {booklist}
            </tbody>
        </table>
        </>

    );

    
};

export default  Books;