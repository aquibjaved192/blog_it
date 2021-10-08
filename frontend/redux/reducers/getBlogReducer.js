import axios from 'axios';
import Router from 'next/router'
// Action Types
const GET_BLOG = 'GET_BLOG';

// Action dispatchers

export const getBlog = (id) => {
 const url = `http://localhost:5000/getBlog/${id}`;
 return (dispatch) => {
  return axios({
   url,
   headers: {
    'Content-Type': 'application/json',
   },
   method: 'get',
   responseType: 'json',
  })
   .then((res) => {
    if (res.status === 200) {
     dispatch({ type: GET_BLOG, payload: res.data.data });
    }
   })
   .catch((err) => console.log(err));
 };
};

export const updateBlog = (data, id) => {
  const url = `http://localhost:5000/updateBlog/${id}`;
  return (dispatch) => {
   return axios({
    url,
    headers: {
     'Content-Type': 'application/json',
    },
    method: 'patch',
    data,
    responseType: 'json',
   })
    .then(() => {
      Router.push('/blog/[id]', `/blog/${id}`);
    })
    .catch((err) => console.log(err));
  };
};

export const deleteBlog = (id) => {
  const url = `http://localhost:5000/deleteBlog/${id}`;
  return (dispatch) => {
   return axios({
    url,
    headers: {
     'Content-Type': 'application/json',
    },
    method: 'delete',
    responseType: 'json',
   })
    .then(() => {
      Router.push('/');
    })
    .catch((err) => console.log(err));
  };
};

export const likeUnlikeBlog = (blogId, userId) => {
  const url = `http://localhost:5000/like/${blogId}`;
  const data = { userId }
  return (dispatch) => {
    return axios({
      url,
      headers: {
      'Content-Type': 'application/json',
      },
      data,
      method: 'patch',
      responseType: 'json',
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => console.log(err));
  };
};

const initialState = {
 data: {},
};

// Reducer

const getBlogReducer = (state = initialState, action) => {
 switch (action.type) {
  case GET_BLOG:
   return { ...state, data: action.payload };
  default:
   return { ...state };
 }
};

export default getBlogReducer;
