import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import PanelLayout from 'Components/PanelLayout';
import ForgotPasswordForm from 'Components/ForgotPassword/ForgotPasswordForm';
import * as api from 'Utils/api';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_MAIL_SENT = {};
const MSG_RESET_ERROR = {};

const styles = require('Components/ForgotPassword/forgot-password.css');

type ForgotPasswordProps = RouteComponentProps<{}> & typeof mapDispatchToProps;

class ForgotPassword extends React.Component<ForgotPasswordProps> {

  render() {
    return (
      <PanelLayout title="Forgot your password?">
        <div className={styles.message}>
          Please provide your information and we will send you a link
          to reset your password to your e-mail address.
        </div>
        <ForgotPasswordForm onSubmit={(values) => this.onSubmit(values)} />
      </PanelLayout>
    );
  }

  onSubmit(values) {
    const { showMessage, hideMessage } = this.props;

    api.sendResetPasswordEmail(values.email)
      .then(() => {
        showMessage('If the e-mail address provided belongs to your account, then a message was sent ' +
          'to that address with instructions on how to reset your password.', 'info', MSG_MAIL_SENT);

        hideMessage(MSG_RESET_ERROR);
      })
      .catch(error => {
        showMessage(error, 'error', MSG_RESET_ERROR);
        hideMessage(MSG_MAIL_SENT);
      });
  }
}

const mapDispatchToProps = {
  showMessage,
  hideMessage,
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
