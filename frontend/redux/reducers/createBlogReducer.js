import axios from 'axios';
import Router from 'next/router';

// Action Types
const CREATE_BLOG = 'CREATE_BLOG';

// Action dispatchers

export const create = (data) => {
 const url = `http://localhost:5000/blog/create`;
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
     dispatch({ type: CREATE_BLOG, payload: res.data.data });
     Router.push('/');
    } else {
     //dispatch({ type: SIGN_UP, payload: res.data });
    }
   })
   .catch((err) => console.log(err));
 };
};

const initialState = {
 data: {},
};

// Reducer

const createBlogReducer = (state = initialState, action) => {
 switch (action.type) {
  case CREATE_BLOG:
   return { ...state, data: action.payload };
  default:
   return { ...state };
 }
};

export default createBlogReducer;
