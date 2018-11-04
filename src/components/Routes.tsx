import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import GlobalMessage from 'Components/GlobalMessage';
import ManualTradingRobot from 'Components/ManualTradingRobot';
import Login from 'Components/Login';
import ForgotPassword from 'Components/ForgotPassword';
import Signup from 'Components/Signup';
import SignupSuccess from 'Components/Signup/SignupSuccess';
import Contact from 'Components/Support/Contact';
import Help from 'Components/Support/Help';
import VerifyEmail from 'Components/VerifyEmail';
import MyAccount from 'Components/MyAccount';
import MainHeader from 'Components/MainHeader';
import Welcome from 'Components/Welcome';
import SubscriptionPlan from 'Components/Subscribe';
import AssignManager from 'Components/AssignManager';
import StrategySetup from 'Components/Manager/StrategySetup';
import { isAuthenticated } from 'Utils/auth';
import WalletId from 'Components/WalletId';

const Layout = (props) => (
  <div>
    <MainHeader {...props}/>
    {props.children}
  </div>
);


const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Layout path={path}>
        <Component {...props} />
      </Layout>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} />
    )
  )}/>
);

export default () => (
  <div>
    <Switch>
      <PrivateRoute path="/" exact component={ManualTradingRobot}></PrivateRoute>
      <PublicRoute path="/login" exact component={Login}/>
      <PublicRoute path="/signup" exact component={Signup}/>
      <PublicRoute path="/signup-success" exact component={SignupSuccess}/>
      <PublicRoute path="/forgot-password" exact component={ForgotPassword}/>
      <PublicRoute path="/verify/:emailToken" exact component={VerifyEmail}/>
      <PrivateRoute path="/my-account" exact component={MyAccount}></PrivateRoute>
      <PrivateRoute path="/contact" exact component={Contact}></PrivateRoute>
      <PrivateRoute path="/help" exact component={Help}></PrivateRoute>
      <PrivateRoute path="/welcome" exact component={Welcome}></PrivateRoute>
      <PrivateRoute path="/subscribe" exact component={SubscriptionPlan}></PrivateRoute>
      <PrivateRoute path="/assign-manager" exact component={AssignManager}></PrivateRoute>
      <PrivateRoute path="/wallet-id" exact component={WalletId}></PrivateRoute>
      <PrivateRoute path="/strategy-setup" exact component={StrategySetup}></PrivateRoute>
    </Switch>
    <Route component={GlobalMessage}/>
  </div>
);
