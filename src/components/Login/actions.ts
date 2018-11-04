import * as api from 'Utils/api';
import * as _ from 'lodash';
import { User } from 'Models/User';
import { createAction } from 'Models/Action';
import {
  LOGIN_LOGIN,
  LOGIN_AUTH,
  LOGIN_STATUS,
} from 'Components/Login/types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_LOGIN_FAILED = {};

export const login = (user: User) => {
  return (dispatch) => {
    dispatch(createAction(LOGIN_LOGIN, user));
    api.login(user.email, user.password)
      .then(response => {
        const data = _.get(response, 'data', {});
        const apiKey = _.get(data, 'api_key', '');
        localStorage.setItem('auth', 'true');
        localStorage.setItem('user', JSON.stringify(_.get(data, 'user')));
        localStorage.setItem('api_key', apiKey);
        dispatch(createAction(LOGIN_AUTH, true));

        dispatch(hideMessage(MSG_LOGIN_FAILED));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_LOGIN_FAILED));
        dispatch(createAction(LOGIN_STATUS, { loading: false }));
      });
  };
};

export const resetStatus = () => {
  return (dispatch) => {
    dispatch(createAction(LOGIN_AUTH, false));
  };
};
