import axios from 'axios';
import * as _ from 'lodash';
import { User } from 'Models/User';
import { Country } from 'Models/Country';
import { City } from 'Models/City';
import { Currency } from 'Models/Currency';
import { CurrencyRate } from 'Models/CurrencyRate';
import { Meta } from 'Models/Meta';
import { Hk } from 'Models/Hk';
import { HkAccount } from 'Models/HkAccount';
import { CMBSettings } from 'Models/CMBSettings';
import { Trade } from 'Models/Trade';
import { ContactMessage } from 'Models/ContactMessage';
import { HelpArticle } from 'Models/HelpArticle';

const apiConfigs = require('../constants/api.json');
const messages = require('../constants/messages.json');

// For APIs without authorization.
const xapi = axios.create({
  baseURL: apiConfigs.host,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

const getSingleErrorMessage = (error) => {
  const singleMessage = error;
  if (_.isObject(error)) {
    const errorMessage = _.values(error);
    let flatten = [];
    errorMessage.forEach(m => {
      flatten = flatten.concat(m);
    });
    return flatten.join(', ');
  }
  return singleMessage;
};

const onFulfilled = (response) => {
  const status = _.get(response, 'data.status', '');
  if (!status) {
    return Promise.reject(messages.invalidAPIResponse);
  }
  if (status === 'failed') {
    let error = _.get(response, 'data.error', messages.generalErrorMessage);
    return Promise.reject(getSingleErrorMessage(error));
  }
  return _.get(response, 'data', {});
};
const onError = (err) => {
  const error = _.get(err, 'response.data.error', messages.generalErrorMessage);
  return Promise.reject(getSingleErrorMessage(error));
};
// Verify the response format
xapi.interceptors.response.use(onFulfilled, onError);

export const login = (email: string, password: string) => {
  return xapi.post('/auth/login', { email, password });
};

export const verifyEmail = (emailToken: string) => {
  return xapi.get(`/verify/${emailToken}`);
};

export const sendResetPasswordEmail = (email: string) => {
  return Promise.resolve();
};

export const signup = (user: User) => {
  return xapi.post('/auth/user-registration', { ...user });
};

export const saveAccountSettings = (user: User) => {
  return authXapi().put('/users/current', { ...user });
};

export const countries = () => {
  return xapi.get('/countries') as any as Promise<{ data: Country[] }>;
};

export const cities = (country, city) => {
  const meta = new Meta();
  meta.page.limit = 20;
  meta.filter = { country, city };
  return xapi.get(decorateApi('/cities', meta)) as any as Promise<{ data: City[] }>;
};

export const currencies = () => {
  return xapi.get('/currencies') as any as Promise<{ data: Currency[] }>;
};

export const contact = (message: ContactMessage) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  // return xapi.post('/contact', message);
};

export const help = (search?: string): Promise<{ data: HelpArticle[] }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const articles: HelpArticle[] = [];
      for (let i = 1; i <= 10; i++) {
        const article = { id: i, title: 'This is the question number ' + i, body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' + i };
        if (!search || article.title.indexOf(search) >= 0 || article.body.indexOf(search) >= 0)
          articles.push(article);
      }
      resolve({ data: articles });
    }, 1000);
  });
  // return xapi.get('/help', search);
};

/**
 * These APIs below require authorization.
 */

// For APIs with authorization.
const authXapi = (() => {
  let xapi = null;
  return () => {
    if (!xapi || xapi.defaults.headers.Authorization !== `Bearer ${localStorage.getItem('api_key')}`) {
      xapi = axios.create({
        baseURL: apiConfigs.host,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('api_key')}`,
        },
      });
      xapi.interceptors.response.use(onFulfilled, onError);
    }
    return xapi;
  };
})();

// For APIs with page/sort/filter.
const decorateApi = (api: string, meta = new Meta()) => {
  const parameters = [];
  const pageKeys = Object.keys(meta.page);
  for (const field of pageKeys) {
    parameters.push(`page[${field}]=${meta.page[field]}`);
  }
  parameters.push(`sort=${meta.sort}`);
  const filterKeys = Object.keys(meta.filter);
  for (const field of filterKeys) {
    parameters.push(`filter[${field}]=${meta.filter[field]}`);
  }
  parameters.push(`mode=${meta.mode || 'active'}`);
  return `${api}?${parameters.join('&')}`;
};

export const signOut = () => {
  return authXapi().post('/auth/logout');
};

export const suggestions = (meta = new Meta()) => {
  return authXapi().get(decorateApi('/suggestions', meta));
};

export const trades = (meta = new Meta()) => {
  return authXapi().get(decorateApi('/trades', meta));
};

export const updateTrade = (trade: Trade) => {
  return authXapi().patch(`/trades/${trade.id}`, {
    target_price: trade.target_price,
    current_shrink_differential: trade.current_shrink_differential,
    target_shrink_differential: trade.target_shrink_differential
  })
};

export const deleteTrade = (tradeId: number) => {
  return authXapi().delete(`/trades/${tradeId}`);
};

export const currencyRates = () => {
  const meta = new Meta();
  meta.page.limit = 1000;
  return authXapi().get(decorateApi('/currency-rates', meta)) as Promise<{ data: CurrencyRate[] }>;
};

export const buy = (data, mode: string) => {
  return authXapi().post(`/buy?mode=${mode}`, { ...data });
};

export const sell = (data: {
  hk_account_id: number; trade_id: number;
  target_coin_id: string; base_coin_id: string; quantity: number; rate: number
}, mode: string) => {

  return authXapi().post(`/sell?mode=${mode}`, { ...data });
};

export const cancelOrder = (data: { hk_account_id: number; trade_id: number; }, mode: string) => {
  return authXapi().post(`/cancel?mode=${mode}`, { ...data });
};

export const hks = () => {
  return authXapi().get('/hks') as Promise<{ data: Hk[] }>;
};

export const hkAccounts = () => {
  return authXapi().get('/hk-accounts') as Promise<{ data: HkAccount[] }>;
};

export const deleteHkAccount = (accountId: number) => {
  return authXapi().delete(`/hk-accounts/${accountId}`) as Promise<{}>;
};

export const createHkAccount = (account: HkAccount) => {
  return authXapi().post('/hk-accounts', account) as Promise<{ data: HkAccount }>;
};

export const updateHkAccount = (account: HkAccount) => {
  return authXapi().put(`/hk-accounts/${account.id}`, account) as Promise<{ data: HkAccount }>;
};

export const total = (hkId) => {
  return authXapi().get(`/trades/total/${hkId}`);
};

export const btc2usd = () => {
  return authXapi().get('/coins/convert/BTC/USD');
};

export const saveCMBSettings = (setting: CMBSettings) => {
  return authXapi().put(`/users/current/settings`, setting) as Promise<{ data: CMBSettings }>;
};

export const getCoins = (symbol) => {
  const meta = new Meta();
  meta.page.limit = 20;
  if ( symbol && symbol[0] && !_.isEmpty(symbol) ) {
    meta.filter = {symbol};
  }
  return authXapi().get(decorateApi('/coins', meta)) as any as Promise<{ data: object[] }>;
};

export const getCMBSettings = () => {
  return authXapi().get('/users/current/settings') as Promise<{ data: CMBSettings[] }>;
};

/**
 * Wrapped APIs of hks.
 */

export const getLowestAsk = (hk: string, coin: string) => {
  return authXapi().get(`/market-order/${hk}/${coin}`)
    .then(response => {
      if (!response.data) {
        throw Error('The coin is not available for trading.');
      }
      const data = response.data.map(item => ({ price: Number(item.price), amount: Number(item.amount) }));
      data.sort((a, b) => a.price - b.price);

      const lowest = data[0];
      const lowestPrice = lowest.price;
      let lowestAmount = lowest.amount;

      for (let i = 1; i < data.length && data[i].price === lowestPrice; i++) {
        lowestAmount += data[i].amount;
      }

      return { quantity: lowestAmount, rate: lowestPrice };
    });
};

export const getHighestBid = (hk: string, coin: string) => {
  return authXapi().get(`/market-order/sell/${hk}/${coin}`)
    .then(response => {
      if (!response.data) {
        throw Error('The coin is not available for trading.');
      }

      const data = response.data.map(item => ({ price: Number(item.price), amount: Number(item.amount) }));
      data.sort((a, b) => -a.price + b.price);

      const highest = data[0];
      const highestPrice = highest.price;
      let highestAmount = highest.amount;

      for (let i = 1; i < data.length && data[i].price === highestPrice; i++) {
        highestAmount += data[i].amount;
      }

      return { quantity: highestAmount, rate: highestPrice };
    });
};

export const walletId = (walletId: string) => {
  return authXapi().post('/walletId', { walletId });
};

export const fetchWatchList = (hkId) => {
  return authXapi().get(`/watchlist/${hkId}`);
};

/**
 * WatchList APIs
 */

export const watchCoin = (data: { interval: string, coin: string, hk: string }) => {
  return authXapi().post(`/watchlist`, { ...data });
};

export const updateWatchList = (id, data) => {
  return authXapi().put(`/watchlist/${id}`, data);
};
