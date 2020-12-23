import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'



export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);
    console.log(loading);

    const [ formValues, handleInputChange] = useForm({
        email: 'dev@bitcero.com',
        password: '123456'
    })

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(email, password);

        if (isFormValid) {
            console.log('pasa');
            dispatch(startLoginEmailPassword(email, password));
        }
    }

    const isFormValid = () => {
        if (validator.isEmpty(email) || !validator.isEmail(email)){
            dispatch(setError('Email is not valid or empty'));
            return false;
        } else if ( validator.isEmpty(password) || password.length < 6) {
            dispatch(setError('Password should be at least 6 character and match each other'));
            return false
        }

        dispatch(removeError());
        return true;
    }

    const handleGoogleLogin = () => {
        dispatch ( startGoogleLogin() );
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit= { handleLogin }  className="animate__animated animate__fadeIn animate_faster">
                <input onChange = { handleInputChange } className="auth__input" type="text" placeholder="email" name="email" autoComplete="off" value={ email } />
                <input onChange = { handleInputChange } className="auth__input" type="password" placeholder="Password" name="password" value= { password} />
                <button className="btn btn-primary btn-block" type="submit" disabled= { loading }>Login</button>
                <hr/>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div className="google-btn" onClick={ handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className="link" to="/auth/register">
                    Create new account
                </Link>
            </form>
        </>
    )
}
