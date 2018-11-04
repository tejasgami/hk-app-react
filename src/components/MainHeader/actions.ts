import * as api from 'Utils/api';
// import { User } from '../../models/User';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  MAIN_HEADER_SIGN_OUT,
  MAIN_HEADER_SIGN_OUT_STATUS,
} from 'Components/MainHeader/types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_SIGNOUT_ERROR = {};

export const signOut = () => {
  return (dispatch) => {
    dispatch(createAction(MAIN_HEADER_SIGN_OUT, localStorage.getItem('user')));
    api.signOut().then(() => {
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
      localStorage.removeItem('api_key');
      dispatch(createAction(MAIN_HEADER_SIGN_OUT_STATUS, {
        loading: false,
        success: true,
      }));
      dispatch(hideMessage(MSG_SIGNOUT_ERROR));
    }).catch((error) => {
      dispatch(showMessage(error, 'error', MSG_SIGNOUT_ERROR));
    });
  };
};

export const resetStatus = () => {
  return (dispatch) => {
    dispatch(createAction(MAIN_HEADER_SIGN_OUT_STATUS, new Status()));
  };
};
