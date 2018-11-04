import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import PanelLayout from '../PanelLayout';
import SignupForm from './SignupForm';

const styles = require('./signup.css');

interface SignupProps extends RouteComponentProps<{}> {
}

class Signup extends React.Component<SignupProps> {
  render() {
    const footer = (
      <div className={'text-center ' + styles.paddedTopRow  + ' ' + styles.paddedBottomRow }>
        You already have an account? <Link to="/login">Sign In</Link>
      </div>
    );

    return (
      <PanelLayout title="Sign Up" colSize="col-md-10 col-lg-8" footer={footer}>
        <SignupForm />
      </PanelLayout>
    );
  }
}

export default Signup;

