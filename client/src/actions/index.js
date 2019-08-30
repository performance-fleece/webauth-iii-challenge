import axios from 'axios';
import axiosWithAuth from './axiosWithAuth';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
export const REGISTER_USER_START = 'REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

// export const login = credentials => dispatch => {
//   dispatch({ type: LOGIN_START });
//   return axios
//     .post('http://localhost:4000/api/login', credentials, {withCredentials:true})
//     .then(res => {
//       if (res.loggedIn) {
//         dispatch({ type: LOGIN_SUCCESS });
//       } else {
//         dispatch({ type: LOGIN_FAIL });
//       }
//     })
//     .catch(err => {
//       dispatch({ type: LOGIN_FAIL, err });
//     });
// };

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  localStorage.removeItem('token');

  return axios
    .post('http://localhost:4000/api/login', credentials, {
      withCredentials: true
    })
    .then(res => {
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};

export const getUsers = token => dispatch => {
  dispatch({ type: FETCH_USERS_START });

  return axiosWithAuth()
    .get('http://localhost:4000/api/users')
    .then(res => {
      console.log(res);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_USERS_FAIL, payload: err });
    });
};

export const addUser = newUser => dispatch => {
  dispatch({ type: REGISTER_USER_START });
  localStorage.removeItem('token');

  return axios
    .post('http://localhost:4000/api/register', newUser)
    .then(res => {
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      dispatch({ type: REGISTER_USER_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: REGISTER_USER_FAIL, payload: err });
    });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_START });
  try {
    localStorage.removeItem('token');

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    console.log(err);
    dispatch({ type: LOGOUT_FAIL, payload: err });
  }
};
