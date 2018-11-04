import * as api from 'Utils/api';
import * as _ from 'lodash';
import { User } from 'Models/User';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import {
  ACCOUNT_INFORMATION_STATUS
} from './types';

import { showMessage } from 'Components/GlobalMessage/actions';
const MSG_ERROR = {};

export const saveProfile = (user: User) => {
  return (dispatch) => {
    dispatch(createAction(ACCOUNT_INFORMATION_STATUS, Status.createLoading()));
    api.saveAccountSettings(user)
    .then(response => {
      const data = _.get(response, 'data', {});
      const { city, country, currency, email, name, phone } = data;
      localStorage.setItem('user', JSON.stringify({ city, country, currency, email, name, phone }));
      dispatch(createAction(ACCOUNT_INFORMATION_STATUS, Status.createSuccess()));
      dispatch(showMessage('Account settings updated successfully.', 'success', MSG_ERROR));
    })
    .catch(error => {
      dispatch(createAction(ACCOUNT_INFORMATION_STATUS, Status.createError()));
      dispatch(showMessage(error, 'error', MSG_ERROR));
    });
  };
};
