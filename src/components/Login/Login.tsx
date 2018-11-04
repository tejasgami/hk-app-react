import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import PanelLayout from 'Components/PanelLayout';
import LoginForm from 'Components/Login/LoginForm';

interface LoginProps extends RouteComponentProps<{}> {
}

class Login extends React.Component<LoginProps> {

  render() {
    return (
      <PanelLayout title="Sign In">
        <LoginForm/>
      </PanelLayout>
    );
  }
}

export default Login;
