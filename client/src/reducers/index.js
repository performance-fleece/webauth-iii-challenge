import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../actions';

const initialState = {
  users: [],
  fetchingUsers: false,
  addingUser: false,
  loggingIn: false,
  loggedIn: false,
  error: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...state,
        error: '',
        loggingIn: true,
        loggedIn: false
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        error: '',
        loggedIn: true,
        loggingIn: false
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        error: action.payload,
        loggedIn: false,
        loggingIn: false
      };
    }
    case FETCH_USERS_START: {
      return {
        ...state,
        error: '',
        fetchingUsers: true
      };
    }
    case FETCH_USERS_SUCCESS: {
      return {
        ...state,
        fetchingUsers: false,
        users: action.payload
      };
    }
    case FETCH_USERS_FAIL: {
      return {
        ...state,
        fetchingUsers: false,
        error: action.payload
      };
    }
    case REGISTER_USER_START: {
      return {
        ...state,
        loggingIn: true,
        loggedIn: false,
        error: ''
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        loggingIn: false,
        loggedIn: true
      };
    }
    case REGISTER_USER_FAIL: {
      return {
        ...state,
        loggingIn: false,
        error: action.payload
      };
    }
    case LOGOUT_START: {
      return {
        ...state,
        error: ''
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        loggedIn: false,
        users: []
      };
    }
    case LOGOUT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
