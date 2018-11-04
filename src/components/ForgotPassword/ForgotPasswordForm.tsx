import * as React from 'react';
import { reduxForm } from 'redux-form';

import { isProvided, isEmail } from 'Utils/validators';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';

const styles = require('Components/ForgotPassword/forgot-password.css');

class ForgotPasswordForm extends React.Component<any> {

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div className={styles.paddedRow}>
          <TextField label="Your email" name="email" />
        </div>
        <Button className="large blue full" submit>Reset password</Button>
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

  return errors;
}

const form = reduxForm({ form: 'forgotPassword', validate })(ForgotPasswordForm);
export default form;
