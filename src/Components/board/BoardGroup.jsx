import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useEffect, useRef, useState } from 'react';
import { CollapseArrow } from './CollapseArrow';
import { EditableLabel } from './EditableLabel';
import { useUpdateEffect } from '../../hooks';

/**
 * Hideable and editable board group containing its tiles
 * @param {object} props
 * @param {string} props.name - name of the group
 * @param {function} props.setData - callback to update this group's data in the parent component
 * @param {boolean} [props.open = true] - whether the group is open
 * @param {any} [props.children = null]
 */
export function BoardGroup({ name, setData, open = true, children = null }) {
    const [show, setShow] = useState(open);
    const [editMode, setEditMode] = useState(name.length ? false : true);

    // Hide and expand the collapse so its height adjusts to content
    // since bootstrap collapse does not support dynamic content
    const fixCollapseHeight = useRef(false);
    useUpdateEffect(() => {
        setShow(false);

        fixCollapseHeight.current = true;
    }, [children]);

    useEffect(() => {
        if (!show && fixCollapseHeight.current) {
            setShow(true);
            fixCollapseHeight.current = false;
        }
    }, [show]);

    return (
        <div className='board-group'>
            <div
                className='board-group__topbar'
                onClick={() => {
                    // Lock board group toggling when in edit mode
                    if (!editMode) {
                        setShow(show => {
                            setData({ open: !show });
                            return !show;
                        });
                    }
                }}
            >
                <EditableLabel
                    editMode={editMode}
                    setEditMode={setEditMode}
                    value={name}
                    setValue={name => setData({ name })}
                    className='board-group__name'
                    focus
                    exitOnBlur
                />

                <CollapseArrow show={show} />
            </div>

            {/* Group content */}
            <MDBCollapse show={show}>
                {children ? (
                    <div className='board-group__tiles-container'>{children}</div>
                ) : (
                    // default text
                    <div className='board-group__empty'>This group has no links yet</div>
                )}
            </MDBCollapse>
        </div>
    );
}
