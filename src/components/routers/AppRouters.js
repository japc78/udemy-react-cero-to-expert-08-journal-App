import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouters } from './AuthRouters';

export const AppRouters = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={AuthRouters}/>
                    <Route exact path="/" component={JournalScreen}/>
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}