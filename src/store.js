import { configureStore, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './authSlice';
import { logger } from './middleware';

export const store = configureStore({
    reducer:{
        auth: authReducer
    },
    middleware:[logger,thunk]
})