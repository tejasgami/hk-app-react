import * as React from 'react';
import { Field } from 'redux-form';
import Toggle from 'react-toggle';
import '../../styles/react-toggle.less';
import '../../styles/toggle.less';

const styles = require('./toggle-field.css');

const ToggleFieldComponent = (props) => {
  const { label, onChange, defaultCheckedValue, icons = false } = props;
  return (
    <div className={styles.wrapper}>
      <label className="flex">
        <Toggle
          defaultChecked={defaultCheckedValue}
          icons={icons}
          className={(label ? '' : 'react-toggle-mr')}
          onChange={onChange}/>
        <div className={styles.labelText + ' ' + (label ? '' : styles.noLabel)}>{label}</div>
      </label>
    </div>
  );
};

class ToggleField extends React.Component<any> {

  toggleFieldComponent = (props) => {
    const { label, defaultCheckedValue, icons = false } = props;
    const { name, onChange } = this.props;
    return (
      <label className={styles.wrapper}>
        <Toggle
          defaultChecked={defaultCheckedValue}
          icons={icons}
          className={(label ? '' : 'react-toggle-mr')}
          onChange={onChange} name={name}/>
        <div className={styles.labelText + ' ' + (label ? '' : styles.noLabel)}>{label}</div>
      </label>
    );
  };

  render() {
    const { isFormField = false } = this.props;
    return isFormField ?
      <Field component={this.toggleFieldComponent} {...this.props} />
      : <ToggleFieldComponent {...this.props}/>;
  }
}

export default ToggleField;
