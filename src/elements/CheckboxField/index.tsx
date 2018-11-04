import * as React from 'react';
import { Field } from 'redux-form';
const styles = require('./checkbox-field.css');

const checkboxFieldComponent = (props) => {
  const { label, tabIndex, input: { value } } = props;
  let groupClasses = styles.group;
  if (value) {
    groupClasses += ' ' + styles.groupChecked;
  }

  return (
    <div className={groupClasses}>
      <label> <input className={styles.input} type="checkbox" {...props.input} tabIndex={tabIndex} /> {label || props.children}</label>
    </div>
  );
};

class CheckboxField extends React.Component<any> {
  render() {
    return <Field component={checkboxFieldComponent} {...this.props} />;
  }
}

export default CheckboxField;
