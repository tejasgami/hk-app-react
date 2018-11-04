import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, change, untouch } from 'redux-form';
import { Redirect } from 'react-router';

import { Status } from '../../models/Status';
import { Country } from '../../models/Country';
import { City } from '../../models/City';
import { Currency } from '../../models/Currency';
import { isProvided, isEmail, isMobilePhone } from '../../utils/validators';
import { signup, loadCountries, loadCurrencies } from './actions';
import TextField from '../../elements/TextField';
import CheckboxField from '../../elements/CheckboxField';
import SelectField from '../../elements/SelectField';
import { cities } from '../../utils/api';
// import RadioField from '../../elements/RadioField';
// <RadioField label="Sex" name="sex" options={['Female', 'Male']}></RadioField>
import Button from '../../elements/Button';

const styles = require('./signup.css');

class SignupForm extends React.Component<any> {

  componentDidMount() {
    this.props.loadCountries();
    this.props.loadCurrencies();
  }

  componentWillUpdate(nextProps) {
    if (this.props.country != nextProps.country) {
      this.props.dispatch(change('signup', 'city', ''));
      this.props.dispatch(untouch('signup', 'city', ''));
    }
  }

  onSubmit(values: object) {
    this.props.signup(values);
  }

  render() {
    const { handleSubmit, status = new Status(), location, invalid = true, agreeTermsOfUse,
      countries, currencies } = this.props;

    if (status.success) {
      return <Redirect to={{
        pathname: '/signup-success',
        state: { from: location },
      }} />
    }

    const countryOptions = (countries as Country[]).map(it => ({ value: it.country_code, label: it.country_name }));
    const currencyOptions = (currencies as Currency[]).map(it => ({ value: it.id, label: it.code }));

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="row">
          <div className="col-lg-6">
            <TextField label="Your name" name="name" tabIndex={1} leftSideError />
          </div>
          <div className="col-lg-6">
            <TextField label="Your e-mail" name="email" tabIndex={2} />
          </div>
        </div>
        <div className={"row " + styles.paddedTopRow}>
          <div className="col-lg-6">
            <SelectField searchable
              options={countryOptions}
              label="Your country" name="country" tabIndex={3} leftSideError>
            </SelectField>
          </div>
          <div className="col-lg-6">
            <SelectField searchable key={this.props.country}
              loadOptions={input => this.loadCityOptions(input)}
              label="Your city" name="city" tabIndex={4} >
            </SelectField>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <TextField label="Your phone number" name="phone" tabIndex={5} leftSideError />
          </div>
          <div className="col-lg-6">
          </div>
        </div>
        <div className={'row ' + styles.paddedBottomRow + ' ' + styles.paddedTopRow}>
          <div className="col-lg-6">
            <TextField type="password" label="Password" name="password" tabIndex={6} leftSideError />
          </div>
          <div className="col-lg-6">
            <TextField type="password" label="Repeat password" name="password_confirmation" tabIndex={7} />
          </div>
        </div>
        <div className={"row " + styles.paddedBottomRow}>
          <div className="col-lg-6">
            <SelectField searchable
              options={currencyOptions}
              label="Your currency" name="currency" tabIndex={8} leftSideError />
          </div>
          <div className="col-lg-6">
          </div>
        </div>
        <div className={"row " + styles.bottomPanel}>
          <div className={"col-lg-8 " + styles.agreeCol}>
            <CheckboxField name="agreeTermsOfUse" tabIndex={9}>
              I agree with the <a href="#" target="_blank">Terms of Use</a> and want to continue
            </CheckboxField>
          </div>
          <div className="col-lg-4 text-right">
            <Button submit tabIndex={10}
              disabled={invalid || !agreeTermsOfUse}
              className="large blue full" loading={status.loading}>
              Sign up
            </Button>
          </div>
        </div>
      </form>
    );
  }

  loadCityOptions(input: string) {
    if (!this.props.country) {
      return Promise.resolve({ options: [], cache: false });
    }

    return cities(this.props.country, input)
      .then(response => {
        const data = _.get(response, 'data', []) as City[];
        let options = data.map(it => ({ value: it.city_name, label: it.city_name }));
        return { options, cache: false };
      })
      .catch(error => {
        // Ignore errors during auto-fill
      });
  }
}

const validate = values => {
  const errors: any = {};
  if (!isProvided(values.email)) {
    errors.email = 'Please provide your e-mail.';
  } else if (!isEmail(values.email)) {
    errors.email = 'Please provide a valid e-mail.';
  }

  if (!isProvided(values.password)) {
    errors.password = 'Please provide your password.';
  }

  if (!isProvided(values.password_confirmation)) {
    errors.password_confirmation = 'Please confirm your password.';
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match.';
  }

  if (!isProvided(values.name)) {
    errors.name = 'Please provide your name.';
  }

  if (!isProvided(values.country)) {
    errors.country = 'Please select your country.';
  }

  if (!isProvided(values.city)) {
    errors.city = 'Please select your city.';
  }

  if (!isProvided(values.sex)) {
    errors.sex = 'Please select your sex.';
  }

  if (!isProvided(values.phone)) {
    errors.phone = 'Please provide your phone number.';
  } else if (!isMobilePhone(values.phone)) {
    errors.phone = 'Please provide a valid phone number.';
  }

  if (!isProvided(values.currency)) {
    errors.currency = 'Please select your currency.';
  }

  return errors;
};

const mapDispatchToProps = {
  signup,
  loadCountries,
  loadCurrencies
};

const form = reduxForm({
  form: 'signup',
  validate,
})(SignupForm);

const selector = formValueSelector('signup');

const mapStateToProps = state => {
  const agreeTermsOfUse = selector(state, 'agreeTermsOfUse');
  const country = selector(state, 'country');

  return ({
    user: state.signup.user,
    status: state.signup.status,
    agreeTermsOfUse,
    countries: state.signup.countries,
    currencies: state.signup.currencies,
    country
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
