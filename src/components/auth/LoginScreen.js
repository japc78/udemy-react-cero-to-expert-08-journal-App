import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { login } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formValues, handleInputChange] = useForm({
        email: 'dev@bitcero.es',
        password: '1234'
    })

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(email, password);

        dispatch(login(12345, 'Bitcero'));
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit= { handleLogin}>
                <input onChange = { handleInputChange } className="auth__input" type="text" placeholder="email" name="email" autoComplete="off" value={ email } />
                <input onChange = { handleInputChange } className="auth__input" type="password" placeholder="Password" name="password" value= { password} />
                <button className="btn btn-primary btn-block" type="submit">Login</button>
                <hr/>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div className="google-btn">
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
