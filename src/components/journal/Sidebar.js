import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    // Recogemos la info de autentificacion del usuario para el nombre desde el state de redux.
    const { name } = useSelector( state => state.auth)

    const handleLogout = () => {
        dispatch ( startLogout() );
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fa fa-moon"></i>
                    <span>{ name }</span>
                </h3>

                <button
                    className="btn"
                    onClick = { handleLogout }
                >
                    Logout
                </button>
            </div>

            <div className="journal__new-entry">
                <i className="fa fa-calendar-plus fa-5x"></i>
                <p className="mt-1">New entry</p>
            </div>

            <JournalEntries />

        </aside>
    )
}
