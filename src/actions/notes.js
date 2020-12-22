import { db } from '../firebase/firebaseConfig'
import { types } from '../types/types';

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        // console.log(getState());
        const { uid } = getState().auth;
        // console.log(uid);

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );
        // console.log(doc);

        dispatch ( activeNote( doc.id, newNote ));
    }
};

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});