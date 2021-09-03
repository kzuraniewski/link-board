import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useUpdateEffect } from '../../hooks';
import placeholder from '../../images/placeholder.jpeg';
import { EditableLabel } from '../EditableLabel';

/**
 * Editable tile containing its title, link and preview
 * @param {object} props
 * @param {string} props.title - tile's title
 * @param {string} props.link - tile's path
 * @param {any} [props.mouseTarget] - mouse down target to detect if user clicked outside of tile
 * @param {any} props.addTileBtn - only exception to clicking outside so the tile stays in edit mode after added
 * @param {function} props.setTileData - callback to update changed properties in parent element
 * @param {function} props.deleteTileData - callback to delete the tile from tiles list
 */
export function Tile({ title, link, mouseTarget, addTileBtn, setTileData, deleteTileData }) {
    const titleDefaultValue = 'New tile';

    // Edit mode on when title or link empty
    const [editMode, setEditMode] = useState(title.length === 0);
    const [showEditBtn, setShowEditBtn] = useState(false);

    // Label values
    const [titleValue, setTitleValue] = useState(title);
    const [linkValue, setLinkValue] = useState(link);

    // Update data after closing edit mode
    useUpdateEffect(() => {
        if (!editMode) {
            const data = {
                title: titleValue,
                link: linkValue,
            };

            // Use default title when empty
            if (!titleValue.length) {
                data.title = titleDefaultValue;
                setTitleValue(titleDefaultValue);
            }

            setTileData(data);
        }
    }, [editMode]);

    // Exit edit mode when user clicked outside of tile
    const tile = useRef(null);
    useEffect(() => {
        if (
            mouseTarget &&
            tile.current &&
            ![mouseTarget, ReactDOM.findDOMNode(mouseTarget).parentElement].includes(addTileBtn) &&
            !tile.current.contains(mouseTarget)
        ) {
            if (editMode) setEditMode(false);
        }
    }, [mouseTarget]);

    // Enter edit mode if mounted and labels not set
    useEffect(() => {
        if (!title.length) setEditMode(true);
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
            {/* background */}
            <div className='tile__background'>
                <i className='fas fa-align-left'></i>
            </div>

            <div className='tile__mask'>
                <div className='tile__btn-container'>
                    {/* Delete button */}
                    <button
                        className={`tile__btn${editMode ? '' : ' tile__btn--hidden'}`}
                        onClick={() => deleteTileData()}
                    >
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
                    value={titleValue}
                    setValue={setTitleValue}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />

                {/* link path */}
                <EditableLabel
                    className='tile__link'
                    value={linkValue}
                    setValue={setLinkValue}
                    placeholder='No link specified'
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            </div>
        </a>
    );
}
