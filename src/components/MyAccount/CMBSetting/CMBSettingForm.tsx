import * as React from 'react';
import { reduxForm, change } from 'redux-form';
import ButtonGroup from 'Elements/ButtonGroup';
import EntryForm from './EntryForm';
import ExitForm from './ExitForm';
import WithdrawalForm from './WithdrawalForm';
import Button from 'Elements/Button';
import { isProvided , isStrictlyPositiveNumber} from 'Utils/validators';
import { saveSetting, getSetting } from './actions';
import { connect } from 'react-redux';
import { Status } from 'Models/Status';
import { loadCurrencies } from 'Components/Signup/actions';
import { loadAllCoins } from 'Components/Signup/actions';
const styles = require('./cmb-setting.css');
const myAccountStyles = require('../my-account.css');

class CMBSettingForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      activeSettingIndex: 'Entry',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.loadCurrencies();
    this.props.loadAllCoins();
    this.props.getSetting();
  }

  onChange(button: any) {
    this.setState({
      activeSettingIndex: button.value,
    });
  }

  onToggleChange = (event) => {
    const { dispatch } = this.props;
    dispatch(change('cmb-setting', event.target.name, event.target.checked));
  }

  onSubmit(values: object) {
    this.props.saveSetting(values);
  }

  render() {
    const { activeSettingIndex } = this.state;
    const { handleSubmit, status = new Status(), invalid = true} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className={myAccountStyles.rightPanelSub}>
            <ButtonGroup
              className="medium"
              buttons={[
                { label: 'Entry', value: 'Entry' },
                { label: 'Exit', value: 'Exit' },
                { label: 'Withdrawal', value: 'Withdrawal' },
              ]}
              onChange={this.onChange.bind(this)}
            />
          </div>

            {((activeSettingIndex == 'Entry') && ((this.props.initialValues !== undefined) && (this.props.initialValues))) ? <EntryForm onToggleChange={this.onToggleChange} {...this.props}/> : (activeSettingIndex == 'Exit') ? <ExitForm onToggleChange={this.onToggleChange} {...this.props}/> : (activeSettingIndex == 'Withdrawal')? <WithdrawalForm onToggleChange={this.onToggleChange} {...this.props}/> :true}

          <div className={styles.bottomPanel}>
              <div className={myAccountStyles.rightPanelSub + ' row'}>
                <Button submit tabIndex={6}
                        disabled={ invalid }
                        className={"large blue pull-left "+ myAccountStyles.submitButton} loading={status.loading}>
                  Save Settings
                </Button>
              </div>
            </div>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors: any = {};
  //Entry tabs validation
  if (!isProvided(values.entry_frugality_ratio)) {
    errors.entry_frugality_ratio = 'Please provide your frugality ratio.';
  } else if (!isStrictlyPositiveNumber(values.entry_frugality_ratio)) {
    errors.entry_frugality_ratio = 'Please provide a valid amount.';
  }

  if (!isProvided(values.entry_price_relativity_ratio)) {
    errors.entry_price_relativity_ratio = 'Please provide a valid';
  } else if (!isStrictlyPositiveNumber(values.entry_price_relativity_ratio)) {
    errors.entry_price_relativity_ratio = 'Please provide a valid amount.';
  }

  //Withdrawal tabs validation
  if (!isProvided(values.withdrawal_capital_balance)) {
    errors.withdrawal_capital_balance = 'Please provide your capital balance.';
  } else if (!isStrictlyPositiveNumber(values.withdrawal_capital_balance)) {
    errors.withdrawal_capital_balance = 'Please provide a valid amount.';
  }

  if (!isProvided(values.withdrawal_capital_balance_currency)) {
    errors.withdrawal_capital_balance_currency = 'Please provide your capital balance currency.';
  }
  if (!isProvided(values.withdrawal_value)) {
    errors.withdrawal_value = 'Please provide your withdrawal value.';
  } else if (!isStrictlyPositiveNumber(values.withdrawal_value)) {
    errors.withdrawal_value = 'Please provide a valid amount.';
  }

  if (!isProvided(values.withdrawal_value_coin)) {
    errors.withdrawal_value_coin = 'Please provide your withdrawal value coin.';
  }

  if (!isProvided(values.withdrawal_address)) {
    errors.withdrawal_address = 'Please provide your withdrawal address.';
  }

  //Exit tabs validation
  if (!isProvided(values.exit_target)) {
    errors.exit_target = 'Please provide your target.';
  } else if (!isStrictlyPositiveNumber(values.exit_target)) {
    errors.exit_target = 'Please provide a valid amount.';
  }

  if (!isProvided(values.exit_shrink_differential)) {
    errors.exit_shrink_differential = 'Please provide your shrink differential.';
  } else if (!isStrictlyPositiveNumber(values.exit_shrink_differential)) {
    errors.exit_target = 'Please provide a valid amount.';
  }

  if (!isProvided(values.exit_option)) {
    errors.exit_option = 'Please provide your option exit.';
  }
  return errors;
};

const mapStateToProps = state => {
  return ({
    status: state.cmbSetting.status,
    currencies: state.signup.currencies,
    coins: state.signup.coins,
    initialValues: state.cmbSetting.getCmbSetting
  });
};

const mapDispatchToProps = {
  saveSetting,
  loadCurrencies,
  loadAllCoins,
  getSetting
};

const form = reduxForm({
  form: 'cmb-setting',
  enableReinitialize : true,
  validate
})(CMBSettingForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);

