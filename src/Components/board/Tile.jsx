import React, { useState } from 'react';
import placeholder from '../../images/placeholder.jpeg';

export function Tile({ title, link }) {
    const [editMode, setEditMode] = useState(false);
    const [editable, setEditable] = useState(false);

    // dynamic bg image and size
    const style = {
        backgroundImage: `url(${placeholder})`,
    };

    return (
        <a
            className='tile d-block text-light overflow-hidden rounded m-1 d-block'
            href={link}
            style={style}
            onMouseEnter={() => setEditable(true)}
            onMouseLeave={() => setEditable(false)}
        >
            <div className='tile-mask w-100 h-100 d-flex flex-column justify-content-end p-2 position-relative'>
                {editable && (
                    <button
                        className='btn-edit text-light bg-transparent border-0 position-absolute top-0 end-0 mt-2 me-2'
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();

                            setEditMode(editMode => !editMode);
                        }}
                    >
                        <i className='fas fa-pen'></i>
                    </button>
                )}

                <h5 className='text-truncate user-select-none'>{title}</h5>
                <p className='tile-link text-truncate user-select-none mb-0'>{link}</p>
            </div>
        </a>
    );
}
