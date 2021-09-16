import axios from 'axios';
import { getLocalStorage, saveLocalStorage } from '../../sharedComponents/helpers';

// Action Types
const GET_PROFILE = 'GET_PROFILE';

// Action dispatchers

export const getUserProfile = (id) => {
 const url = `http://localhost:5000/getuser/${id}`;
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
     dispatch({ type: GET_PROFILE, payload: res.data.data });
    }
   })
   .catch((err) => console.log(err));
 };
};

export const followUser = (process ,followerId, followingId) => {
  const url = `http://localhost:5000/${process}`;
  return (dispatch) => {
   return axios({
    url,
    headers: {
     'Content-Type': 'application/json',
    },
    method: 'post',
    data: { followerId, followingId },
    responseType: 'json',
   })
    .then((res) => {
     if (res.status === 200) {
      const user = getLocalStorage('user');
      if(process === 'follow'){
        user.following = [...user.following, followingId];
      } else if(process === 'unfollow') {
        const index = user.following.indexOf(followingId);
        if (index > -1) {
          user.following.splice(index, 1);
        }
      }
      saveLocalStorage('user', user);
      dispatch(getUserProfile(followingId));
     }
    })
    .catch((err) => console.log(err));
  };
 };

const initialState = {
 data: {},
};

// Reducer

const userProfileReducer = (state = initialState, action) => {
 switch (action.type) {
  case GET_PROFILE:
   return { ...state, data: action.payload };
  default:
   return { ...state };
 }
};

export default userProfileReducer;
