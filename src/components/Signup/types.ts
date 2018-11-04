import { Status } from '../../models/Status';
import { User } from '../../models/User';
import { Country } from '../../models/Country';
import { Currency } from '../../models/Currency';

export const SIGNUP_STATUS = 'SIGNUP_STATUS';
export const SIGNUP_SIGNUP = 'SIGNUP_SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_COUNTRIES_LOADED = 'SIGNUP_COUNTRIES_LOADED';
export const SIGNUP_CURRENCIES_LOADED = 'SIGNUP_CURRENCIES_LOADED';
export const ALL_COINS_LOADED = 'ALL_COINS_LOADED';

export type IState = {
  status: Status,
  user: User,
  countries: Country[],
  currencies: Currency[],
  coins: object[]
};
