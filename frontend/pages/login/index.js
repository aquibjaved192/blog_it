import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../../sharedComponents/renderField';
import { withRouter } from 'next/router';
import { required, email, minLength8 } from '../../validation/validations';
import { logIn } from '../../redux/reducers/signupReducer';
import { getLocalStorage } from '../../sharedComponents/helpers';
import style from '../signup/index.module.scss';

class Login extends React.Component {
  componentDidMount() {
    const user = getLocalStorage('user');
    const { router } = this.props;
    if (user) {
    router.push('/');
    }
  }

  goToSignUp = () => {
    const { router } = this.props;
    router.push('/signup');
  };

  onSubmit = (values) => {
    const { logIn } = this.props;
    logIn(values);
  };

  render() {
    const { handleSubmit, data } = this.props;
    return (
      <div className={style.container}>
        <div className="card bg-transparent border-0">
        <article className="card-body mx-auto text-white">
          <h4 className="card-title mt-3 text-center font-weight-bold">Sign in</h4>
          <p className="text-center font-weight-bold">Get started with blogging journey</p>
          {data.status && (data.status === 201 || data.status === 202) && (
            <p className={`text-center ${style.olduser}`}>
              {data.message}{' '}
            </p>
          )}
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className={`form-group input-group ${style.formFix}`}>
              <label className="font-weight-bold">Email</label>
              <Field
              name="email"
              className="form-control form-control-lg"
              component={RenderField}
              validate={[required, email]}
              type="email"
              placeholder="Enter email"
              size="lg"
              />
            </div>

            <div className={`form-group input-group ${style.formFix}`}>
              <label className="font-weight-bold">Password</label>
              <Field
              name="password"
              className="form-control form-control-lg"
              component={RenderField}
              validate={[required, minLength8]}
              type="password"
              placeholder="Enter password"
              size="lg"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn primary-bg btn-block font-weight-bold color-secondary">
                Sign in
              </button>
            </div>
            <p className="text-center text-small">
              Do not have an account?{' '}
              <button type="button" className="color-primary bg-transparent border-0 font-weight-bold" onClick={this.goToSignUp}>
                Register
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
 data: state.signup.loginData,
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
