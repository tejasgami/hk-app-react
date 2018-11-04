import * as React from 'react';
import AccountSettingsForm from './AccountSettingsForm';
import { getCurrentUser } from 'Utils/auth';

interface AccountSettingsProps {
  accountSettingsFormObject?: {};
}

class AccountSettings extends  React.Component<AccountSettingsProps, any> {
  public static defaultProps: AccountSettingsProps = {
    accountSettingsFormObject: {initialValues : {}}
  };
  constructor(props){
    super(props);
    this.state = {
      accountSettingsFormObject: props.accountSettingsFormObject
    };
  }
  componentWillMount() {
    this.setState({
      accountSettingsFormObject: {initialValues: getCurrentUser()}
    });
  }
  render() {
    const { accountSettingsFormObject } = this.state;
    return (
      <div>
        <AccountSettingsForm {...accountSettingsFormObject} />
      </div>
    );
  }
}

export default AccountSettings;
