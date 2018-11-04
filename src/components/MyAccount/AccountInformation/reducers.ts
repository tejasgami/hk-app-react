import { Status } from 'Models/Status';
import {
  ACCOUNT_INFORMATION_STATUS,
  IState
} from './types';

const initialState: IState = {
  status: new Status()
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INFORMATION_STATUS:
      return {
        ...state,
        status: action.payload
      };
    default:
      return {
        ...state,
      };
  }
};
