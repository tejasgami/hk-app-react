import * as api from 'Utils/api';
import { CMBSettings } from 'Models/CMBSettings';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  SETTING_INFORMATION_SAVE,
  SETTING_INFORMATION_GET,
  SETTING_INFORMATION_SAVE_SUCCESS,
  SETTING_INFORMATION_STATUS
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_ERROR = {};

export const saveSetting = (CMBSettings: CMBSettings) => {
  return (dispatch) => {
    dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createLoading()));
    dispatch(createAction(SETTING_INFORMATION_SAVE, CMBSettings));
    api.saveCMBSettings(CMBSettings)
      .then(response => {
        dispatch(createAction(SETTING_INFORMATION_SAVE_SUCCESS, null));
        dispatch(hideMessage(MSG_ERROR));
        dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createSuccess()));
        dispatch(showMessage('CMB Settings updated successfully.', 'success', MSG_ERROR));
      })
      .catch(error => {
        dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const getSetting = () => {
  return (dispatch) => {
    dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createLoading()));
    dispatch(createAction(SETTING_INFORMATION_GET, null));
    api.getCMBSettings()
      .then(response => {
        dispatch(createAction(SETTING_INFORMATION_GET, response.data));
        dispatch(hideMessage(MSG_ERROR));
        dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createSuccess()));
      })
      .catch(error => {
        dispatch(createAction(SETTING_INFORMATION_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};
