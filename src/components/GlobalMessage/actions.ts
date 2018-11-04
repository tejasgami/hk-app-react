import { createAction } from 'Models/Action';
import {
  GLOBAL_MESSAGE_SHOW,
  GLOBAL_MESSAGE_HIDE,
  GLOBAL_MESSAGE_HIDE_ALL,
  MessageType
} from 'Components/GlobalMessage/types';

const messages = require('Constants/messages.json');

export const showMessage = (message: string, type: MessageType, id: any) => {
  return (dispatch) => {
    if (typeof (message) !== 'string') {
      const errorMessage = (message as any).message;
      if (errorMessage) {
        message = errorMessage;
      } else {
        message = messages.generalErrorMessage;
      }
    }

    dispatch(createAction(GLOBAL_MESSAGE_SHOW, { message, type, id }));
  };
};

export const hideMessage = (id: any) => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_MESSAGE_HIDE, { id }));
  };
};

export const hideAllMessages = () => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_MESSAGE_HIDE_ALL, {}));
  };
};
