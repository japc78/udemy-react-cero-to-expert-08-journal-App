import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadingFile } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();

    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        console.log(active);
        dispatch( startSaveNote( active ));
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        // console.log(e.target.files);
        const file = e.target.files[0];
        // console.log(file);

        if ( file ) {
            dispatch( startUploadingFile( file ));
        }
    }

    return (
        <div className="notes__appBar">
            <span>28 de agosto 2020</span>
            <input
                id="fileSelector"
                type="file"
                name="file"
                style = {{ display: 'none' }}
                onChange = { handleFileChange }
            />

            <div>
                <button
                    className="btn"
                    onClick= { handlePictureClick }
                >Picture
                </button>
                <button
                    className="btn"
                    onClick= { handleSave }
                >Save
                </button>
            </div>
        </div>
    )
}
