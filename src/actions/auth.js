import Swal from 'sweetalert2'
//https://sweetalert2.github.io/
import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from './notes';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch)=> {
        dispatch( startLoading() );
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({ user }) => {
                dispatch(
                    // startLoading(),
                    login( user.uid, user.displayName)
                );
                dispatch( finishLoading() );
            })
            .catch( err => {
                console.log(err);
                Swal.fire('Error', err.message, 'error')
                dispatch( finishLoading() );
            });
    }
}

export const startRegisterWithEmailPassword = (email, password, name ) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({ user }) => {

                // Actualizamos el nombre y se espera a que se complete
                await user.updateProfile({ displayName: name })
                // console.log(user);

                dispatch(
                    login( user.uid, user.displayName)
                );
            })
            .catch ( err => {
                console.log(err);
                Swal.fire('Error', err.message, 'error')
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            // .then( userCred => {
            //     console.log(userCred);
            // })

            // Con desestructuracion
            .then(( { user } ) => {
                dispatch(
                    login( user.uid, user.displayName)
                )
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}


export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(noteLogout());
    }
}


export const logout = () => ({
    type: types.logout
})
