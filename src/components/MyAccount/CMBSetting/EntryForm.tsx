import * as React from 'react';
import TextField from 'Elements/TextField';
import ToggleField from 'Elements/ToggleField';

const myAccountStyles = require('../my-account.css');
const styles = require('./cmb-setting.css');

class EntryForm extends React.Component<any> {

  constructor(props) {
    super(props);
  }

  render() {
         let { onToggleChange, initialValues } = this.props;
          initialValues = (initialValues != null && typeof initialValues['entry_notified_by_email'] != 'undefined') ? initialValues : { entry_notified_by_email:false, entry_notified_by_sms: false, entry_is_auto_trading : false};
         const { entry_notified_by_email, entry_notified_by_sms, entry_is_auto_trading} = initialValues;

         return (
            <div className={myAccountStyles.rightPanelSub}>
              <div>
                <div>
                  <div>
                    <div>
                      <div className={styles.description}>
                        Here goes a description short description of what this section does and how it should be used.
                      </div>
                      <div className={styles.baseInputBox + ' row'}>
                        <div className={styles.base + ' col-md-4'}>
                          <TextField label="Frugality Ratio" name="entry_frugality_ratio" tabIndex={1} leftSideError />
                        </div>
                        <div className={styles.base + ' col-md-4'}>
                          <TextField label="Price Relativity Ratio" name="entry_price_relativity_ratio" tabIndex={2} leftSideError/>
                        </div>
                      </div>
                    </div>

                    <div className={styles.notificationSetting +' col-md-12'}>
                      <div className={styles.sendEmail}>
                        <ToggleField icons={false} isFormField={true} onChange={onToggleChange}
                                     label="Send email when values are achieved"
                                     name="entry_notified_by_email"
                                     defaultCheckedValue={(!!parseInt(entry_notified_by_email))}
                                     tabIndex={3} leftSideError/>

                      </div>

                      <div className={styles.sendSMS}>
                        <ToggleField icons={false} isFormField={true}
                                     label="Send SMS when values are achieved"
                                     name="entry_notified_by_sms"
                                     onChange={onToggleChange}
                                     defaultCheckedValue={(!!parseInt(entry_notified_by_sms))}
                                     tabIndex={4} leftSideError/>
                      </div>
                      <div className={styles.tradeCoins}>
                        <ToggleField
                                     icons={false} isFormField={true}
                                     label="Trade coins when values are achieved"
                                     name="entry_is_auto_trading"
                                     onChange={onToggleChange}
                                     defaultCheckedValue={(!!parseInt(entry_is_auto_trading))}
                                     tabIndex={5} leftSideError/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
}

export default EntryForm;

