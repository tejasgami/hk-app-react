import { Status } from 'Models/Status';
import {
  SETTING_INFORMATION_STATUS,
  SETTING_INFORMATION_GET,
  IState
} from './types';

const initialState: IState = {
  status: new Status(),
  getCmbSetting: []
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case SETTING_INFORMATION_STATUS:
      return {
        ...state,
        status: action.payload
      };
    case SETTING_INFORMATION_GET:
      return {
        ...state,
        getCmbSetting:  action.payload
      };
    default:
      return {
        ...state,
      };
  }
};
