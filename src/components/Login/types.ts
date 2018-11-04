import { Status } from 'Models/Status';
import { User } from 'Models/User';

export const LOGIN_STATUS = 'LOGIN_STATUS';
export const LOGIN_LOGIN = 'LOGIN_LOGIN';
export const LOGIN_AUTH = 'LOGIN_AUTH';

export type IState = {
  status: Status,
  user: User,
  auth: boolean, // login successfully if `auth` is `true`.
};
