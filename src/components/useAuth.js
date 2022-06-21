import {useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";

const useAuth = ()=>{
    const navigate = useNavigate();
    const authState = useSelector(state=>{
        //console.log(state,'=====');
        return state;
    });

    return {...authState.auth};
}

export default useAuth;