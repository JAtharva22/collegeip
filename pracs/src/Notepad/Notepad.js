import React, { useState } from 'react';
import './Notepad.css'; // Import your CSS file
import './Notelist.css'; // Import your CSS file

function Notepad({ note }) {
    const [dummy, setDummy] = useState([
        {
            id: 1,
            title: 'First Note',
            content: 'first',
        },
        {
            id: 2,
            title: 'Second Note',
            content: 'second',
        },
        {
            id: 3,
            title: 'Third Note',
            content: 'third',
        },
    ]);

    const [data, setData] = useState({
        id: '',
        title: '',
        content: '',
    });

    function handleChange(e) {
        setData({
            ...data,
            content: e.target.value
        });
    }

    function handleSave() {
        // Implement save functionality
    }

    function handleReset() {
        setData({
            ...data,
            content: ''
        });
    }

    function changeNotepad(user) {
        setData({
            id: user.id,
            title: user.title,
            content: user.content,
        });
    }

    function addNewNote() {
        // Generate a new unique ID (you can use a more robust method)
        const newId = dummy.length + 1;

        // Add a new note with a default title and content
        const newNote = {
            id: newId,
            title: 'New Note',
            content: '',
        };
        setData(newNote)
        setDummy([...dummy, newNote]);
    }

    // Function to handle note deletion
    function handleDelete(id) {
        // Filter out the note with the specified id
        const updatedDummy = dummy.filter((note) => note.id !== id);
        setDummy(updatedDummy);
        if (dummy.length){
            
            
        }
    }

    // Function to handle title change
    function handleTitleChange(newTitle) {
        // Find the index of the current note in dummy
        const noteIndex = dummy.findIndex((note) => note.id === data.id);

        // Update the title of the matching note in dummy
        if (noteIndex !== -1) {
            const updatedDummy = [...dummy];
            updatedDummy[noteIndex] = {
                ...updatedDummy[noteIndex],
                title: newTitle,
            };

            setDummy(updatedDummy);
        }

        // Update the title in the data state
        setData({
            ...data,
            title: newTitle,
        });
    }

    return (
        <div className='page-container'>
            <div className='notelist-container'>
                <div className='list-container'>
                    <h2 className='h1'>Notelist</h2>
                    <br />
                    <div>
                        {dummy.map((user) => (
                            <div
                                className='list-item btn'
                                onClick={() => changeNotepad(user)}
                                key={user.id}
                            >
                                <h3>{user.title}</h3>
                                <button
                                    className='btn del-btn'
                                    onClick={() => handleDelete(user.id)} // Handle delete
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className='add-btn' onClick={addNewNote}>Add</button>
                </div>
            </div>
            <div className="notepad-container">
                <div className="notepad-buttons">
                    {/* <h2 className="notepad-title">{data.title}</h2> */}

                    <input
                        className="notepad-title "
                        value={data.title}
                        onChange={(e) => handleTitleChange(e.target.value)} // Handle title change
                    />
                    <div>
                        <button className='btn btn-primary' onClick={handleSave}>Save</button>
                        <button className='btn btn-secondary' onClick={handleReset}>Erase</button>
                    </div>
                </div>
                <textarea className="notepad-content" value={data.content} onChange={handleChange} />
            </div>
        </div>
    );
}

export default Notepad;
