import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch)=> {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName)
                );
            })
            .catch( err => {
                console.log(err);
            })
    }
}

export const startRegisterWithEmailPassword = (email, password, name ) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({ user }) => {

                // Actualizamos el nombre y se espera a que se complete
                await user.updateProfile({ displayName: name })
                console.log(user);

                dispatch(
                    login( user.uid, user.displayName)
                );
            })
            .catch ( err => {
                console.log(err);
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