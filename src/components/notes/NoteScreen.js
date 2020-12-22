import React from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange] = useForm( note );

    const { title, body, url } = formValues;

    // date, title, body, url

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    onChange = { handleInputChange }
                    value={ title }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    onChange = { handleInputChange }
                    value={ body }
                ></textarea>

                {
                    url &&
                    <div className="notes__image">
                        <img
                            src={ url }
                            alt={ title }
                        />
                    </div>
                }

            </div>
        </div>
    )
}
