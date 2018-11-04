import * as React from 'react';
import { Field } from 'redux-form';

import ErrorTip from '../ErrorTip';

const styles = require('./text-field.css');

const textFieldComponent = (props) => {
  const { input: { value }, meta: { touched, error }, label, type, tabIndex,
    leftSideError, maxLength, className = '' } = props;

  let inputClasses = styles.input;
  if (value) {
    inputClasses += ' ' + styles.inputFull;
  }

  let groupClasses = styles.group;
  let errorTip;
  if (touched && error) {
    groupClasses += ' ' + styles.hasError;
    errorTip = <ErrorTip text={error} leftSide={leftSideError} />
  }

  return (
    <div className={groupClasses}>
      <input className={inputClasses + ' ' + styles[className]} type={type || "text"} {...props.input} tabIndex={tabIndex} maxLength={maxLength} />
      <span className={styles.bar}></span>
      <label className={styles.label + ' ' + styles[className]}>{label}</label>
      {errorTip}
    </div>
  );
};

class TextField extends React.Component<any> {
  render() {
    return <Field component={textFieldComponent} {...this.props} />;
  }
}

export default TextField;
