import axios from 'axios';

// Action Types
const GET_SEARCH = 'GET_BLOG';
const SHOW_SEARCH = 'SHOW_SEARCH';

// Action dispatchers

export const search = (key) => {
 const url = `http://localhost:5000/search/${key}`;
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
     dispatch({ type: GET_SEARCH, payload: res.data.data });
     dispatch(showSearchChange(true));
    } else {
     //dispatch({ type: SIGN_UP, payload: res.data });
    }
   })
   .catch((err) => console.log(err));
 };
};

export const showSearchChange = (value) => {
 return (dispatch) => {
  dispatch({ type: SHOW_SEARCH, payload: value });
 };
};

const initialState = {
 data: [],
 showSearch: false,
};

// Reducer

const getSearchReducer = (state = initialState, action) => {
 switch (action.type) {
  case GET_SEARCH:
   return { ...state, data: action.payload };
  case SHOW_SEARCH:
   return { ...state, showSearch: action.payload };
  default:
   return { ...state };
 }
};

export default getSearchReducer;
