/*
{
    notes: [],
    active: null,
    active: {
        id: 'ADAGADGAD232424KJK',
        title: '',
        body: '',
        imageUrl: '';
        date: 1212121212;
    }
}
*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.note.id
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:
            // console.log(action.payload);
            return {
                ...state,
                active: null,
                //Se pasan las notas sin la eliminada
                notes: state.notes.filter( note => note.id !== action.payload )
            }


        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}