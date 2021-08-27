import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { AddTileBtn } from './AddTileBtn';
import { CollapseArrow } from './CollapseArrow';
import { EditableProperty } from './EditableProperty';

export function BoardGroup({ name, setName, open, children = null }) {
    const [show, setShow] = useState(open);
    const [editMode, setEditMode] = useState(name.length ? false : true);

    return (
        <div className='board-group'>
            <div className='board-group__topbar' onClick={() => setShow(show => !show)}>
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
                        <AddTileBtn show={show} />
                    </div>
                ) : (
                    <div className='board-group__empty'>This group has no links yet</div>
                )}
            </MDBCollapse>
        </div>
    );
}
