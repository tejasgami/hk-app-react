import * as React from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';
import '../../../node_modules/react-select/less/select.less';
import '../../styles/select-field.less';
const styles = require('./select-field.css');

import ErrorTip from '../ErrorTip';

const selectFieldComponent = (props) => {
  const { input, options, meta: { touched, error }, label, hideLabel = false,
    searchable, clearable, loadOptions, disabled, leftSideError, tabIndex } = props;

  const handleInputChange = ({ value }) => {
    input.onChange(value);
  };

  const handleInputBlur = () => {
    input.onBlur(input.value);
  };

  let wrapperClasses = styles.wrapper;
  let errorTip;
  if (touched && error) {
    wrapperClasses += ' ' + styles.hasError;
    errorTip = <ErrorTip text={error} leftSide={leftSideError} />
  }
  const SelectTag = loadOptions ? Select.Async : Select;

  return (
    <div className={wrapperClasses}>
      <SelectTag
        clearable={!!clearable}
        searchable={!!searchable}
        options={options}
        loadOptions={loadOptions}
        {...input}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
        tabIndex={tabIndex ? ('' + tabIndex) : undefined}
      />
      {!hideLabel && <label className={styles.label}>{label}</label>}
      {errorTip}
    </div>
  );
};

class SelectField extends React.Component<any> {
  render() {
    return (
      <Field component={selectFieldComponent} {...this.props}>
        {this.props.children}
      </Field>
    );
  }
}

export default SelectField;
