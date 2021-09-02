import axios from 'axios';

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
