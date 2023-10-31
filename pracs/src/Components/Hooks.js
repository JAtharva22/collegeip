// Hooks.js Component
import React, { useState } from 'react';

const Hooks = () => {
    const [name, setName] = useState('');
    const [Last, setLast] = useState('');

    const handleFirst = event => {
        setName(event.target.value);
    };

    const handleLast = event => {
        setLast(event.target.value);
    };

    return (
        <div className='container'>
            <div className='form-group'>
                <label>firstname:</label>
                <input
                    className="form-control"
                    type="text"
                    required
                    onChange={handleFirst}
                    value={name} 
                />
            </div>
            <br />
            <div className='form-group'>
                <label>lastname:</label>
                <input
                    className="form-control"
                    type="text"
                    required
                    onChange={handleLast}
                    value={Last} 
                />
            </div>
            <br />
            <div className='form-group'>
                <textarea
                    className="form-control" id="exampleFormControlTextarea1" rows="3"
                    value={`${name} ${Last}`}
                ></textarea>
            </div>
        </div>
    );
};

export default Hooks;
