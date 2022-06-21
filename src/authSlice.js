import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticated:localStorage.getItem('token'),
    errorMessage:null
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        authenticate(state,action){
            return {...state,errorMessage:null,authenticated:action.payload};
        },
        authError(state, action){
            return {...state,authenticated:null,errorMessage:action.payload};
        },
        signout(state,action){
            return {...state,authenticated:null}
        }
    }
});


export const {authenticate, authError, signout} = authSlice.actions;

export default authSlice.reducer;