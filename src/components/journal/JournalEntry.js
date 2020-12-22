import React from 'react'
import moment from 'moment'
// https://momentjs.com/
export const JournalEntry = ({id, date, title, body, url }) => {
    // console.log(id, date, title, body, url);

    const noteDate = moment(date);
    console.log(noteDate);

    return (
        <div className="journal__entry pointer">

            {
                //Si url existe entonces se muestra
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                >
                </div>
            }


            <div className="journal__entry-body">
                <p className="journal__entry-tittle">{ title }</p>
                <p className="journal__entry-content">{ body }</p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
