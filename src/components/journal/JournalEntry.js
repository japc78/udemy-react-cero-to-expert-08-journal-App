import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://picsum.photos/200/300)'
                }}
            >
            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-tittle">A new day</p>
                <p className="journal__entry-content">Voluptate cillum adipisicing consequat est aliqua tempor esse veniam cillum incididunt.</p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    )
}
