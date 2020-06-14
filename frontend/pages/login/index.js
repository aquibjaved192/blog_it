import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../../sharedComponents/renderField';
import { withRouter } from 'next/router';
import { required, email, minLength8 } from '../../validation/validations';
import { logIn } from '../../redux/reducers/signupReducer';
import style from '../index.module.scss';

class Login extends React.Component {
 constructor(props) {
  super(props);
 }

 goToSignUp = () => {
  const { router } = this.props;
  router.push('/');
 };

 onSubmit = (values) => {
  const { logIn } = this.props;
  logIn(values);
 };

 render() {
  const { handleSubmit, data } = this.props;
  return (
   <div className={style.container}>
    <div className="card border-0">
     <article className="card-body mx-auto">
      <h4 className="card-title mt-3 text-center">Sign in</h4>
      <p className="text-center">Get started with blogging journey</p>
      <p>
       <a href="" className={`btn btn-block ${style.btnTwitter}`}>
        {' '}
        <i className="fa fa-twitter"></i>   Login via Twitter
       </a>
       <a href="" className={`btn btn-block ${style.btnFacebook}`}>
        {' '}
        <i className="fa fa-facebook-f"></i>   Login via facebook
       </a>
      </p>
      <p className={style.dividerText}>
       <span className="bg-light">OR</span>
      </p>
      {data.status && data.status === 201 && (
       <p className={`text-center ${style.olduser}`}>
        {data.message}{' '}
        <button type="button" className={style.login} onClick={this.goToSignUp}>
         Register
        </button>{' '}
       </p>
      )}
      {data.status && data.status === 202 && (
       <p className={`text-center ${style.olduser}`}>{data.message} </p>
      )}
      <form onSubmit={handleSubmit(this.onSubmit)}>
       <div className={`form-group input-group ${style.formFix}`}>
        <div className="input-group-prepend">
         <span className="input-group-text">
          {' '}
          <i className="fa fa-envelope"></i>{' '}
         </span>
        </div>
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
        <div className="input-group-prepend">
         <span className="input-group-text">
          {' '}
          <i className="fa fa-lock"></i>{' '}
         </span>
        </div>
        <Field
         name="password"
         className="form-control form-control-lg"
         component={RenderField}
         validate={[required, minLength8]}
         type="password"
         placeholder="your password"
         size="lg"
        />
       </div>

       <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
         {' '}
         Sign in{' '}
        </button>
       </div>
       <p className="text-center">
        Do not have an account?{' '}
        <button type="button" className={style.login} onClick={this.goToSignUp}>
         Register
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
 data: state.signup.data,
});

const mapDispatchToProps = (dispatch) => {
 return {
  logIn: (data) => dispatch(logIn(data)),
 };
};

export default withRouter(
 reduxForm({
  form: 'login',
 })(connect(mapStateToProps, mapDispatchToProps)(Login))
);
