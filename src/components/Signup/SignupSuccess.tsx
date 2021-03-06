import * as React from 'react';
import PanelLayout from '../PanelLayout';

const styles = require('./signup.css');

class SignupSuccess extends React.Component<{}> {
  render() {
    return (
      <PanelLayout title="Sign Up" colSize="col-md-10 col-lg-8">
        <div className={styles.successPanel}>
          <img className={styles.successImage} src="/public/assets/images/signup-success.svg" alt="Success" />
          <p className={styles.successMessage}>
            You have successfully signed up!<br /><br />
            Please check your inbox, you will be able to login after you verify your e-mail address.
        </p>
        </div>
      </PanelLayout>
    );
  }
}

export default SignupSuccess;
