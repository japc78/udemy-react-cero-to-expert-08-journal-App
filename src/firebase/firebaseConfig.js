import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAYFC4_5bQL8BOoRqega-ckqog1hEuWM2Q",
    authDomain: "udemy-react-app-848bd.firebaseapp.com",
    projectId: "udemy-react-app-848bd",
    storageBucket: "udemy-react-app-848bd.appspot.com",
    messagingSenderId: "1029533721038",
    appId: "1:1029533721038:web:96d476be15cb55773f8b9f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}