import * as React from 'react';
import Dropdown from 'Elements/Dropdown';
import AccountSettings from 'Components/MyAccount/AccountInformation/index';
import SectionHeader from 'Partials/SectionHeader';
import Setting from 'Components/MyAccount/CMBSetting/index';

const styles = require('./my-account.css');

interface MyAccountProps {
  activeIndex?: number;
  leftMenuArray?: { text: string, template: any, title: string }[];
  className?: string;

  onChange?(leftMenuArray: {}): void;
}

class MyAccount extends React.Component<MyAccountProps, any> {

  public static defaultProps: MyAccountProps = {
    activeIndex: 0,
    leftMenuArray: [
      {
        text: 'Account Information', template: <AccountSettings/>,
        title: 'Account Information Settings'
      },
      {
        text: 'CMB Settings', template: <Setting/>,
        title: 'Coin Management Board Setting'
      }
    ],
    className: 'active',
    onChange: () => {
      return;
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(activeIndex: number) {
    return () => {
      this.setState({
        activeIndex,
      });
    };
  }

  render() {
    const { leftMenuArray } = this.props;
    const { activeIndex } = this.state;
    let leftMenuArrayCustom = [];
    let leftMenuArrayDesktop = [];
    leftMenuArray.map(( item, index ) => {
      leftMenuArrayDesktop.push(
        <li key={index}
            className={styles.defaultMenuTab + ' ' +
            ((activeIndex === index) ? styles.activeMenuTab : '')}>
          <a onClick={this.onChange(index).bind(this)} >
            {item.text}
          </a>
        </li>
      );
      leftMenuArrayCustom.push(
        {
          label: item.text,
          value: index,
          onClick: () => {
            this.setState({
              activeIndex: index
            });
          },
        }
      );
    });

    return (
      <div className={`container-fluid ` + styles.wrapper}>
        <SectionHeader
          goBack="/"
          hasBorder={false}
          title={leftMenuArray[activeIndex].title}>
        </SectionHeader>
        <div className={styles.mainPanel}>
          <div className={styles.tableHolder}>
            <div className={styles.leftPanel}>
              <ul className={styles.leftPanelList}>
                {leftMenuArrayDesktop}
              </ul>
              <Dropdown
                menus={leftMenuArrayCustom}
                customMainWrapperClass = { styles.leftPanelDropDown}
                menuMainCustomClass = { styles.menusFullWidth}
                className={"medium md-small md-auto-size-popup-left no-border "}
                minWidth={320}
              />
            </div>
            <div className={styles.rightPanel}>
              {leftMenuArray[activeIndex].template}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
