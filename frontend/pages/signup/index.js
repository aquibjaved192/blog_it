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

class SignUp extends React.Component {
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

 goToLogin = () => {
  const { router } = this.props;
  router.push('/login');
 };

 render() {
  const { handleSubmit, status, message } = this.props;
  return (
   <div className={style.container}>
    <div className="card border-0">
     <article className="card-body mx-auto">
      <h4 className="card-title mt-3 text-center">Create Account</h4>
      <p className="text-center">Get started with your free account</p>
      {status === 201 && (
       <p className={`text-center ${style.olduser}`}>
        {message}{' '}
        <button type="button" className={style.login} onClick={this.goToLogin}>
         Log In
        </button>{' '}
       </p>
      )}
      <form onSubmit={handleSubmit(this.onSubmit)}>
       <div className={`form-group input-group ${style.formFix}`}>
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
       <div className={`form-group input-group ${style.formFix}`}>
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
       <div className={`form-group input-group ${style.formFix}`}>
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

       <div className={`form-group input-group ${style.formFix}`}>
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
        <button type="submit" className="btn btn-primary btn-block">
         {' '}
         Create Account{' '}
        </button>
       </div>
       <p className="text-center">
        Have an account?{' '}
        <button type="button" className={style.login} onClick={this.goToLogin}>
         Log In
        </button>{' '}
       </p>
      </form>
     </article>
    </div>
   </div>
  );
 }
}

const mapStateToProps = (state) => ({
 status: state.signup.data.status,
 message: state.signup.data.message,
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
