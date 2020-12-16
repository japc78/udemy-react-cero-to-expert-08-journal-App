import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { firebase } from '../../firebase/firebaseConfig'

import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();

    // Para comprobar que el usuario este logueado
    const [checking, setChecking] = useState(true);


    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {

            // Se comprueba que el usuario este logueado
            if (user?.uid) {
                dispatch( login( user.uid, user.displayName) );
                setIsLoggedIn( true );
            } else {
                setIsLoggedIn( false );
            }
            setChecking(false);
            // console.log(user);
        });
    }, [ dispatch, setChecking, setIsLoggedIn ]);

    if ( checking ) {
        return (
            <h1>Espere</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path="/auth/login" component={ AuthRouter } isAuthenticated = { isLoggedIn }/>
					<PrivateRoute path="/" component={ JournalScreen } isAuthenticated = { isLoggedIn }/>
                    {/* <Route path="/auth" component={AuthRouter}/>
                    <Route exact path="/" component={JournalScreen}/> */}
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}