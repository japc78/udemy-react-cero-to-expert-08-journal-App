import Swal from 'sweetalert2';
import { db } from '../firebase/firebaseConfig'
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
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

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ));
    }
}


export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})


export const startSaveNote = ( note ) => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url
        }

        // console.log("Pasa" + note);

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        try {
            await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );
            // Se actualiza la nota en el SideBar
            dispatch( refreshNote( note ));
            Swal.fire('Saved', note.title, 'success');

        } catch (error) {
            // console.warn(error);
            Swal.fire('Error', error.toString(), 'error');
        }
    }
}


export const refreshNote = ( note) => ({
    type: types.notesUpdate,
    payload: {
        note
    }
});


export const startUploadingFile = ( file ) => {
    return async( dispatch, getState ) => {
        const  { active: activeNote } = getState().notes;
        // console.log(file);
        // console.log(activeNote);

        Swal.fire({
            title: 'Uploading....',
            text: 'Please wait...',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload( file );
        // console.log( fileUrl );

        activeNote.url = fileUrl;
        dispatch( startSaveNote (activeNote))

        Swal.close();
    }
}

export const startDeleteNote = (id) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));

    }
}


export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})