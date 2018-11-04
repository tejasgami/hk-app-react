import { User } from 'Models/User';

export const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};

export const getCurrentUser = (): User => {
  try {
    let userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson) as User;
    if (!user.currency) {
      user.currency = 'USD';
    }
    if (!user.city) {
      user.city = '';
    }
    if (!user.country) {
      user.country = '';
    }
    if (!user.walletId) {
      user.walletId = '';
    }

    return user;
  } catch (err) {
  }

  return null;
};

export const getUserCurrency = () => {
  return getCurrentUser().currency;
};
