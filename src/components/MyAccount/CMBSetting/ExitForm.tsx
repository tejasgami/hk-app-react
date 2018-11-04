import * as React from 'react';
import TextField from 'Elements/TextField';
import ToggleField from 'Elements/ToggleField';
import SelectField from 'Elements/SelectField';

const myAccountStyles = require('../my-account.css');
const styles = require('./cmb-setting.css');

class ExitForm extends React.Component<any> {

  constructor(props) {
    super(props);
  }

  render() {
    let { onToggleChange, initialValues } = this.props;
    initialValues = (initialValues != null && typeof initialValues['exit_notified_by_email'] != 'undefined') ? initialValues : { exit_notified_by_email:false, exit_notified_by_sms: false, exit_is_auto_trading : false};
    const { exit_notified_by_email, exit_notified_by_sms, exit_is_auto_trading} = initialValues;
    return (
        <div className={myAccountStyles.rightPanelSub}>
          <div>
            <div>
              <div>
                <div>
                  <div className={styles.description}>
                    Here goes a description short description of what this section does and how it should be used.
                  </div>
                  <div className={' row'}>
                    <div className={styles.base + ' col-lg-4 col-md-6'}>
                      <TextField label="Target" name="exit_target" tabIndex={1} leftSideError />
                    </div>
                    <div className={styles.base + ' col-lg-4 col-md-6'}>
                      <TextField label="Shrink differential" name="exit_shrink_differential" tabIndex={2} leftSideError/>
                    </div>
                  </div>
                  <div className={styles.baseExitBox + ' row'}>
                    <div className={styles.base + ' col-lg-4 col-md-6'}>
                      <SelectField searchable
                                   options={[{ label: 'Sell', value: 'Sell' }]}
                                   label="Option exit" name="exit_option" tabIndex={3} leftSideError />
                    </div>
                  </div>
                </div>

                <div className={styles.notificationSetting +' col-md-12'}>
                  <div className={styles.sendEmail}>
                    <ToggleField icons={false} isFormField={true} onChange={onToggleChange} defaultCheckedValue={(!!parseInt(exit_notified_by_email))}
                                 label="Send email when values are achieved" name="exit_notified_by_email" tabIndex={4} leftSideError/>
                  </div>
                  <div className={styles.sendSMS}>
                    <ToggleField icons={false} isFormField={true} onChange={onToggleChange} defaultCheckedValue={(!!parseInt(exit_notified_by_sms))}
                                 label="Send SMS when values are achieved" name="exit_notified_by_sms" tabIndex={5} leftSideError/>
                  </div>
                  <div className={styles.tradeCoins}>
                    <ToggleField icons={false} isFormField={true} onChange={onToggleChange} defaultCheckedValue={(!!parseInt(exit_is_auto_trading))}
                                 label="Trade coins when values are achieved" name="exit_is_auto_trading" tabIndex={6} leftSideError/>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ExitForm;
