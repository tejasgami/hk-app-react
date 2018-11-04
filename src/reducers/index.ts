import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import root from './root';
import loginReducers from '../components/Login/reducers';
import signupReducers from '../components/Signup/reducers';
import contactReducers from 'Components/Support/Contact/reducers';
import helpReducers from 'Components/Support/Help/reducers';
import globalMessageReducers from '../components/GlobalMessage/reducers';
import verifyEmailReducers from '../components/VerifyEmail/reducers';
import mainHeaderReducers from '../components/MainHeader/reducers';

export default combineReducers({
  root,
  routing: routerReducer,
  form: formReducer,
  login: loginReducers,
  globalMessage: globalMessageReducers,
  verifyEmail: verifyEmailReducers,
  signup: signupReducers,
  contact: contactReducers,
  help: helpReducers,
  mainHeader: mainHeaderReducers
});
