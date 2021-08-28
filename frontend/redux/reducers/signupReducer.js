import axios from 'axios';
import Router from 'next/router';
import { saveLocalStorage } from '../../sharedComponents/helpers';

// Action Types
const SIGN_UP = 'SIGN_UP';
const LOG_IN = 'LOGIN';

// Action dispatchers
export const signUp = (data) => {
 const url = `http://localhost:5000/signup`;
 return (dispatch) => {
  return axios({
   url,
   headers: {
    'Content-Type': 'application/json',
   },
   method: 'post',
   data,
   responseType: 'json',
  })
   .then((res) => {
    if (res.data.status === 200) {
     Router.push('/login');
    } else {
     dispatch({ type: SIGN_UP, payload: res.data });
    }
   })
   .catch((err) => console.log(err));
 };
};

export const logIn = (data) => {
 const url = `http://localhost:5000/login`;
 return (dispatch) => {
  return axios({
   url,
   headers: {
    'Content-Type': 'application/json',
   },
   method: 'post',
   data,
   responseType: 'json',
  })
   .then((res) => {
    if (res.status === 200) {
     dispatch({ type: LOG_IN, payload: res.data.data });
     saveLocalStorage('user', res.data.data);
     Router.push('/');
    } else {
     dispatch({ type: LOG_IN, payload: res.data });
    }
   })
   .catch((err) => console.log(err));
 };
};

const initialState = {
 loginData: {},
 signupData: {}
};

// Reducer

const signupReducer = (state = initialState, action) => {
 switch (action.type) {
  case SIGN_UP:
    return { ...state, signupData: action.payload };
  case LOG_IN:
    return { ...state, loginData: action.payload };
  default:
    return { ...state };
 }
};

export default signupReducer;
