import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { Status } from 'Models/Status';
import { isProvided, isEmail } from 'Utils/validators';
import TextField from 'Elements/TextField';
import CheckboxField from 'Elements/CheckboxField';
import Button from 'Elements/Button';
import { login, resetStatus } from 'Components/Login/actions';

import { Redirect } from 'react-router';
const styles = require('Components/Login/login.css');

class LoginForm extends React.Component<any> {

  componentDidMount() {
    this.props.resetStatus();
  }

  onSubmit(values) {
    this.props.login(values);
  }

  render() {
    const { handleSubmit, status = new Status(), auth = false, location, invalid = true } = this.props;

    if (auth) {
      return <Redirect to={{
        pathname: '/',
        state: { from: location },
      }} />
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <TextField label="Your email" name="email" />
        </div>
        <div>
          <TextField type="password" label="Password" name="password" />
        </div>
        <div className={'d-flex flex-column flex-sm-row justify-content-between ' + styles.paddedRow}>
          <CheckboxField label="Keep me signed in" name="rememberMe" />
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
        <Button className="large blue full" submit loading={status.loading} disabled={invalid}>Sign in</Button>
        <div className={styles.signup}>
          If you don't have an account, please <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors: any = {};
  if (!isProvided(values.email)) {
    errors.email = 'Please provide your e-mail.';
  } else if (!isEmail(values.email)) {
    errors.email = 'Please provide a valid e-mail address.';
  }

  if (!isProvided(values.password)) {
    errors.password = 'Please provide your password.';
  }

  return errors;
};

const mapStateToProps = state => ({
  user: state.login.user,
  status: state.login.status,
  auth: state.login.auth,
});

const mapDispatchToProps = {
  login,
  resetStatus,
};

const form = reduxForm({
  form: 'login',
  validate,
})(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
