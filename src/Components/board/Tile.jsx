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
            className='tile'
            href={link}
            target='_blank'
            style={style}
            onMouseEnter={() => setEditable(true)}
            onMouseLeave={() => setEditable(false)}
        >
            <div className='tile__mask'>
                {editable && (
                    <button
                        className='tile__btn-edit'
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();

                            setEditMode(editMode => !editMode);
                        }}
                    >
                        <i className='fas fa-pen'></i>
                    </button>
                )}

                <h5 className='tile__title'>{title}</h5>
                <p className='tile__link'>{link}</p>
            </div>
        </a>
    );
}
