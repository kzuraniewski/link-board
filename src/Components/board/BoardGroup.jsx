import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useEffect, useRef, useState } from 'react';
import { AddTileBtn } from './AddTileBtn';
import { CollapseArrow } from './CollapseArrow';
import { EditableProperty } from './EditableProperty';

/**
 * Hideable and editable board group containing its tiles
 * @param {object} props
 * @param {string} props.name - name of the group
 * @param {function} props.setName - callback to update this group's name in the parent component
 * @param {function} props.addTile - callback to store new tile in parent component
 * @param {boolean} [props.open = true] - whether the group is open
 * @param {any} [props.children = null]
 */
export function BoardGroup({ name, setName, addTile, open = true, children = null }) {
    const [show, setShow] = useState(open);
    const [editMode, setEditMode] = useState(name.length ? false : true);

    // Hide and expand the collapse so its height adjusts to content
    // since bootstrap collapse does not support dynamic content
    useEffect(() => {
        if (!show) setShow(true);
    }, [children]);

    return (
        <div className='board-group'>
            <div
                className='board-group__topbar'
                onClick={() => {
                    // Lock board group toggling when in edit mode
                    if (!editMode) setShow(show => !show);
                }}
            >
                <EditableProperty
                    editMode={editMode}
                    value={name}
                    defaultValue='New group'
                    className='board-group__name'
                    focus
                    exitOnBlur
                    onPropertySet={nameValue => {
                        setEditMode(false);
                        setName(nameValue);
                    }}
                />

                <CollapseArrow show={show} />
            </div>

            {/* Group content */}
            <MDBCollapse show={show}>
                {children.length ? (
                    <div className='board-group__tiles-container'>
                        {children}

                        {/* new tile button */}
                        <AddTileBtn
                            onClick={() => {
                                setShow(false);
                                addTile();
                            }}
                        />
                    </div>
                ) : (
                    // default text
                    <div className='board-group__empty'>This group has no links yet</div>
                )}
            </MDBCollapse>
        </div>
    );
}
