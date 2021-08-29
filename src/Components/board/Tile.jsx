import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import placeholder from '../../images/placeholder.jpeg';
import { EditableLabel } from './EditableLabel';

/**
 * Editable tile containing its title, link and preview
 * @param {object} props
 * @param {string} props.title - tile's title
 * @param {string} props.link - tile's path
 * @param {any} props.mouseDownTarget - mouse down target to detect if user clicked outside of tile
 * @param {any} props.addTileBtn - only exception to clicking outside so the tile stays in edit mode after added
 * @param {function} props.setTileData - callback to update changed properties in parent element
 * @returns
 */
export function Tile({ title, link, mouseDownTarget, addTileBtn, setTileData }) {
    // Edit mode on when title or link empty
    const [editMode, setEditMode] = useState(!title.length || !link.length);
    const [showEditBtn, setShowEditBtn] = useState(false);

    // Exit edit mode when user clicked outside of tile
    const tile = useRef(null);
    useEffect(() => {
        if (
            mouseDownTarget &&
            tile.current &&
            ![mouseDownTarget, ReactDOM.findDOMNode(mouseDownTarget).parentElement].includes(
                addTileBtn
            ) &&
            !tile.current.contains(mouseDownTarget)
        ) {
            if (editMode) setEditMode(false);
        }
    }, [mouseDownTarget]);

    // Enter edit mode if mounted and labels not set
    useEffect(() => {
        if (!title.length || !link.length) setEditMode(true);
    }, []);

    return (
        <a
            ref={tile}
            className='tile'
            href={link}
            target='_blank'
            onMouseEnter={() => setShowEditBtn(true)}
            onMouseLeave={() => setShowEditBtn(false)}
            onClick={e => {
                // disable link when in edit mode
                if (editMode) e.preventDefault();
            }}
        >
            <div className='tile__mask'>
                <div className='tile__btn-container'>
                    {/* Delete button */}
                    <button className={`tile__btn${editMode ? '' : ' tile__btn--hidden'}`}>
                        <i className='fas fa-trash-alt'></i>
                    </button>

                    {/* Edit mode button */}
                    <button
                        className={`tile__btn${
                            !editMode && !showEditBtn ? ' tile__btn--hidden' : ''
                        }`}
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
                </div>

                {/* name preview */}
                <EditableLabel
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
                <EditableLabel
                    className='tile__link'
                    value={link}
                    placeholder='No link specified'
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
