import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../../sharedComponents/renderField';
import { withRouter } from 'next/router';
import {
 required,
 email,
 minLength8,
 maxLength20,
} from '../../validation/validations';
import { signUp } from '../../redux/reducers/signupReducer';
import { getLocalStorage } from '../../sharedComponents/helpers';
import style from './index.module.scss';

class SignUp extends React.PureComponent {
 componentDidMount() {
  const user = getLocalStorage('user');
  const { router } = this.props;
  if (user) {
   router.push('/');
  }
 }

 onSubmit = (values) => {
  const { signUp } = this.props;
  signUp(values);
 };

 goTo = (route) => {
  const { router } = this.props;
  router.push(route);
 };

 render() {
  const { handleSubmit, status, message } = this.props;
  return (
    <div className={style.container}>
      <div className="card secondary-bg border-0 text-white">
        <article className="card-body mx-auto">
          <h4 className="card-title mt-3 text-center font-weight-bold">Create Account</h4>
          <p className="text-center font-weight-bold">Get started with your free account</p>
          {status === 201 && (
          <p className={`text-center ${style.olduser}`}>
            {message}{' '}
          </p>
          )}
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className={`form-group  ${style.formFix}`}>
              <label className="font-weight-bold">Full Name</label>
                <Field
                name="name"
                className="form-control form-control-lg"
                component={RenderField}
                validate={[required, maxLength20]}
                type="text"
                placeholder="Full Name"
                size="lg"
                />
            </div>
            <div className={`form-group  ${style.formFix}`}>
              <label className="font-weight-bold">Profession</label>
              <Field
              name="profession"
              className="form-control form-control-lg"
              component={RenderField}
              validate={[required, maxLength20]}
              type="text"
              placeholder="Your Profession"
              size="lg"
              />
            </div>
            <div className={`form-group  ${style.formFix}`}>
              <label className="font-weight-bold">Email</label>
                <Field
                name="email"
                className="form-control form-control-lg"
                component={RenderField}
                validate={[required, email]}
                type="email"
                placeholder="Your email"
                size="lg"
                />
            </div>
            <div className={`form-group  ${style.formFix}`}>
              <label className="font-weight-bold">Password</label>
                <Field
                name="password"
                className="form-control form-control-lg"
                component={RenderField}
                validate={[required, minLength8]}
                type="password"
                placeholder="Password(Min 8 characters)"
                size="lg"
                />
            </div>
            <div className="form-group">
              <button type="submit" className="btn primary-bg btn-block color-secondary font-weight-bold">
              Create Account
              </button>
            </div>
            <p className="text-center text-small">
              Have an account?
              <button type="button" className="color-primary bg-transparent border-0 font-weight-bold" onClick={() => this.goTo('/login')}>
              Log In
              </button>
            </p>
            <p className="text-center text-small">
              <button type="button" className={`color-primary bg-transparent border-0 font-weight-bold ${style.underline}`} onClick={() => this.goTo('/')}>
                I want to go Home
              </button>
            </p>
          </form>
        </article>
      </div>
    </div>
  );
 }
}

const mapStateToProps = (state) => ({
 status: state.signup.signupData.status,
 message: state.signup.signupData.message,
});

const mapDispatchToProps = (dispatch) => {
 return {
  signUp: (data) => dispatch(signUp(data)),
 };
};

export default withRouter(
 reduxForm({
  form: 'signup',
 })(connect(mapStateToProps, mapDispatchToProps)(SignUp))
);
