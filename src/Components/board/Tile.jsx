import React, { useState, useEffect, useRef } from 'react';
import placeholder from '../../images/placeholder.jpeg';
import { EditableProperty } from './EditableProperty';

export function Tile({ title, link, setTileData }) {
    const [editMode, setEditMode] = useState(false);
    const [showEditBtn, setShowEditBtn] = useState(false);

    // dynamic bg image
    const style = {
        backgroundImage: `url(${placeholder})`,
    };

    return (
        <a
            className='tile'
            href={link}
            target='_blank'
            style={style}
            onMouseEnter={() => setShowEditBtn(true)}
            onMouseLeave={() => setShowEditBtn(false)}
            onClick={e => {
                // disable link when in edit mode
                if (editMode) e.preventDefault();
            }}
        >
            <div className='tile__mask'>
                {/* Edit mode button */}
                {(editMode || showEditBtn) && (
                    <button
                        className='tile__btn-edit'
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();

                            setEditMode(editMode => !editMode);
                        }}
                    >
                        {editMode ? (
                            <i className='fas fa-check'></i>
                        ) : (
                            <i className='fas fa-pen'></i>
                        )}
                    </button>
                )}

                {/* name preview */}
                <EditableProperty
                    className='tile__title'
                    focus
                    value={title}
                    defaultValue='Tile'
                    editMode={editMode}
                    onPropertySet={titleValue => {
                        setEditMode(false);
                        setTileData({ title: titleValue, link });
                    }}
                />

                {/* link path */}
                <EditableProperty
                    className='tile__link'
                    value={link}
                    editMode={editMode}
                    onPropertySet={linkValue => {
                        setEditMode(false);
                        setTileData({ title, link: linkValue });
                    }}
                />
            </div>
        </a>
    );
}
