import * as React from 'react';
import TextField from 'Elements/TextField';
import ToggleField from 'Elements/ToggleField';
import SelectField from 'Elements/SelectField';
import { Currency } from 'Models/Currency';
const myAccountStyles = require('../my-account.css');
const styles = require('./cmb-setting.css');

class WithdrawalForm extends React.Component<any> {

  constructor(props) {
    super(props);
  }

  render() {
    let { onToggleChange, initialValues, currencies, coins} = this.props;
    initialValues = (initialValues != null && typeof initialValues['withdrawal_notified_by_email'] != 'undefined') ? initialValues : { withdrawal_notified_by_email:false, withdrawal_notified_by_sms: false, withdrawal_is_auto_trading : false};
    const { withdrawal_notified_by_email, withdrawal_notified_by_sms, withdrawal_is_auto_trading} = initialValues;
    const currencyOptions = (currencies as Currency[]).map(it => ({ value: it.id, label: it.code }));
    const coinOptions = (coins).map(it => ({ value: it.symbol, label: it.symbol }));
    return (
        <div className={myAccountStyles.rightPanelSub}>
          <div>
            <div>
              <div>
                <div>
                  <div className={styles.withdrawalDescription}>
                    Maintaining a specific capital level ensures you benefits from the automatic withdrawal feature of the
                    Application which guarantees you benefit from price volatility
                  </div>
                  <div className={' row'}>
                    <div className={styles.comboRow + ' col-lg-4 col-md-6'}>
                      <div className={styles.comboText}><TextField label="Capital Balance" name="withdrawal_capital_balance" tabIndex={1} leftSideError /></div>
                      <div className={styles.comboSelect}><SelectField name="withdrawal_capital_balance_currency" searchable hideLabel options={currencyOptions} key={this.props.withdrawal_capital_balance_currency}/></div>
                    </div>
                  </div>
                  <div className={styles.baseExitBox + ' row'}>
                    <div className={styles.comboRow + ' col-lg-4 col-md-6'}>
                      <div className={styles.comboText}><TextField label="Value" name="withdrawal_value" tabIndex={2} leftSideError /></div>
                      <div className={styles.comboSelect}><SelectField name="withdrawal_value_coin" searchable hideLabel options={coinOptions} key={this.props.withdrawal_value_coin}/></div>
                    </div>
                    <div className={styles.comboRow + ' col-md-6'}>
                      <TextField label="Withdrawal address" name="withdrawal_address" tabIndex={3} leftSideError />
                    </div>
                    </div>
                </div>

                <div className={styles.notificationSetting +' col-md-12'}>
                  <div className={styles.sendEmail}>
                    <ToggleField icons={false} isFormField={true}
                                 label="Send email when values are achieved" name="withdrawal_notified_by_email"
                                 onChange={onToggleChange} defaultCheckedValue={(!!parseInt(withdrawal_notified_by_email))} tabIndex={3} leftSideError/>
                  </div>
                  <div className={styles.sendSMS}>
                    <ToggleField icons={false} isFormField={true}
                                 label="Send SMS when values are achieved" name="withdrawal_notified_by_sms" onChange={onToggleChange} defaultCheckedValue={(!!parseInt(withdrawal_notified_by_sms))} tabIndex={4} leftSideError/>
                  </div>
                  <div className={styles.tradeCoins}>
                    <ToggleField icons={false} isFormField={true}
                                 label="Trade coins when values are achieved" name="withdrawal_is_auto_trading" onChange={onToggleChange} defaultCheckedValue={(!!parseInt(withdrawal_is_auto_trading))} tabIndex={5} leftSideError/>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default WithdrawalForm;

