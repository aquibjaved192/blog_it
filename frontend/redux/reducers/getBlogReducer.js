import axios from 'axios';
import Router from 'next/router'
// Action Types
const GET_BLOG = 'GET_BLOG';
const GET_COMMENTS = 'GET_COMMENTS';

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

export const likeUnlikeBlog = (blogId, user) => {
  const url = `http://localhost:5000/blog/like/${blogId}`;
  const data = { user }
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

export const commentBlog = (data) => {
  const url = `http://localhost:5000/blog/comment`;
  return (dispatch) => {
    return axios({
      url,
      headers: {
      'Content-Type': 'application/json',
      },
      data,
      method: 'post',
      responseType: 'json',
    })
    .then(() => {
      if(data.type === 'comment') {
        dispatch(getComments(data.parentId));
      }
    })
    .catch((err) => console.log(err));
  };
};

export const getComments = (id) => {
  const url = `http://localhost:5000/blog/comment/${id}`;
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
      dispatch({ type: GET_COMMENTS, payload: res.data.data });
    })
    .catch((err) => console.log(err));
  };
};

export const deleteComments = (id, type, parentId) => {
  const url = `http://localhost:5000/blog/comment/${id}`;
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
      if(type === 'comment') {
        dispatch(getComments(parentId));
      }
    })
    .catch((err) => console.log(err));
  };
};

export const getReplies = (id) => {
  const url = `http://localhost:5000/blog/comment/replies/${id}`;
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
      return res.data.data;
    })
    .catch((err) => console.log(err));
  };
};

export const likeComments = (id, user) => {
  const url = `http://localhost:5000/blog/comment/like/${id}`;
  return (dispatch) => {
    return axios({
      url,
      headers: {
      'Content-Type': 'application/json',
      },
      data: { user },
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
 comments: [],
};

// Reducer

const getBlogReducer = (state = initialState, action) => {
 switch (action.type) {
  case GET_BLOG:
   return { ...state, data: action.payload };
  case GET_COMMENTS:
  return { ...state, comments: action.payload };
  default:
   return { ...state };
 }
};

export default getBlogReducer;
