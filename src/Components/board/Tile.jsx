import React, { useState, useEffect, useRef } from 'react';
import placeholder from '../../images/placeholder.jpeg';

export function Tile({ title, link, setTileData }) {
    const [editMode, setEditMode] = useState(false);
    const [showEditBtn, setShowEditBtn] = useState(false);

    const [titleValue, setTitleValue] = useState(title);
    const titleInput = useRef(null);

    const [linkValue, setLinkValue] = useState(link);
    const linkInput = useRef(null);

    const clearSelection = () => {
        if (window.getSelection()) window.getSelection().removeAllRanges();
    };

    useEffect(() => {
        // focus and select title if in edit mode, otherwise deselect
        if (editMode) {
            titleInput.current.focus();
            titleInput.current.select();
        } else {
            clearSelection();
        }
    }, [editMode]);

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
                <input
                    ref={titleInput}
                    type='text'
                    className='tile__title'
                    value={titleValue}
                    disabled={!editMode}
                    onChange={e => setTitleValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            // @ts-ignore
                            e.target.blur();
                            setEditMode(false);
                            setTileData({ title: titleValue, link });
                        }
                    }}
                />

                {/* link path */}
                <input
                    ref={linkInput}
                    type='text'
                    className='tile__link'
                    value={linkValue}
                    disabled={!editMode}
                    onChange={e => setLinkValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            // @ts-ignore
                            e.target.blur();
                            setEditMode(false);
                            setTileData({ title, link: linkValue });
                        }
                    }}
                />
            </div>
        </a>
    );
}
