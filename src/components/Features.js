import useAuth from "./useAuth";
import {useNavigate} from 'react-router-dom';
import {Navigate} from 'react-router-dom';

const Features = (props)=>{
    const navigate = useNavigate();
    const credentials  = useAuth();
    console.log('features',credentials,'\n',useAuth() === props.somefn(),credentials === useAuth());
    
    if(!credentials.authenticated){
        return (
            <Navigate replace to={'/'}/>
        )
    }

    return (
        <h2>This is features Page!!!</h2>
    );
};

export default  Features;