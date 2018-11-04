import { User } from 'Models/User';
import { Status } from 'Models/Status';
import {
  LOGIN_STATUS,
  LOGIN_LOGIN,
  LOGIN_AUTH,
  IState,
} from 'Components/Login/types';

const initialState: IState = {
  user: new User(),
  status: new Status(),
  auth: false,
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOGIN:
      return {
        ...state,
        status: <Status> {
          loading: true,
        },
        user: <User> {
          ...action.payload,
        },
      };
    case LOGIN_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case LOGIN_AUTH:
      return {
        ...state,
        auth: action.payload,
        status: <Status> {
          loading: false,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
