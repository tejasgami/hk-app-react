import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from 'Elements/Dropdown';

import {
  signOut,
  resetStatus,
} from 'Components/MainHeader/actions';

const styles = require('Components/MainHeader/main-header.css');

class MainHeader extends React.Component<any, any> {

  static renderMyAccount(menu: any, index: number, isActive: boolean,
                         isOpen: boolean, onChange: () => void): JSX.Element {
    if (isOpen) {
      return null;
    }

    return (
      <div>
        <div className={styles.myAccount}>My Account</div>
        <div className={styles.myAccountIcon}><i className="fa fa-user" aria-hidden="true"/></div>
      </div>
    );
  }

  componentDidMount() {
    this.props.resetStatus();
  }

  render() {
    const {status: {success}, signOut, path} = this.props;

    var noMenusInMiddle = !![
      '/welcome',
      '/subscribe',
      '/assign-manager',
      '/wallet-id',
      '/hk-accounts',
    ].find(p => p === path);

    if (success) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {from: location},
          }}
        />
      );
    }

    return (
      <div className={styles.header}>
        <div className="container-fluid">
          <div className={styles.headerLayout}>
            <Link to="/" className="flex">
              <div className={styles.logo}/>
            </Link>
            {!noMenusInMiddle && (
              <ul className={styles.navigation}>
                <li className={styles.menu }>Strategy</li>
                <li className={styles.menu}>Execution</li>
                <li className={styles.menu}>Dashboard</li>
                <li className={styles.menu}>Manual Trading</li>
                <li className={styles.menu + ' ' + styles.active}>Manual Trading via Robot</li>
              </ul>
            )}
            <div className={styles.right}>
              <Dropdown
                menus={[{
                  label: 'My Account',
                  value: 'my-account-default',
                  renderItem: MainHeader.renderMyAccount
                },
                  {
                    label: 'Settings',
                    value: 'my-account',
                    href: '/my-account',
                    nonSelectable: true,
                  },
                  {
                    label: 'Help Center',
                    value: 'help',
                    href: '/help',
                    nonSelectable: true,
                  },
                  {
                    label: 'Sign Out',
                    value: 'sign-out',
                    onClick: () => {
                      signOut();
                    },
                  },
                ]}
                className="medium md-small md-auto-size-popup-left no-border"
                minWidth={1}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.mainHeader.status,
});

const mapDispatchToProps = {
  signOut,
  resetStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
