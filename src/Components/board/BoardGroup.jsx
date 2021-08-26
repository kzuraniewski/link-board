import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useEffect, useState, useRef } from 'react';

export function BoardGroup({ name, setName, open, children = null }) {
    const [show, setShow] = useState(open);
    const [editMode, setEditMode] = useState(name.length ? false : true);
    const [inputValue, setInputValue] = useState(name);

    const nameInput = useRef(null);

    useEffect(() => {
        if (editMode) nameInput.current.focus();
        else {
            // set group name
            if (inputValue !== name) setName(inputValue);
        }
    }, [editMode]);

    return (
        <div className='board-group'>
            <div className='board-group__topbar' onClick={() => setShow(show => !show)}>
                {/* name or input */}
                {editMode ? (
                    <input
                        ref={nameInput}
                        type='text'
                        placeholder='Name'
                        className='board-group__name-input'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onClick={e => {
                            // TODO adding tiles
                            e.stopPropagation();
                        }}
                        onBlur={() => {
                            setEditMode(false);
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') setEditMode(false);
                        }}
                    />
                ) : (
                    <h6 className='board-group__name'>{name}</h6>
                )}

                {/* Icons */}
                <div className='board-group__icons-container'>
                    <button
                        className={`board-group__btn-add${
                            show ? '' : ' board-group__btn-add--hidden'
                        }`}
                        onClick={e => {
                            if (show) e.stopPropagation();
                        }}
                    >
                        <i className='fas fa-plus'></i>
                    </button>
                    <i
                        className={`fas fa-sort-down board-group__arrow${
                            show ? '' : ' board-group__arrow--hidden'
                        }`}
                    ></i>
                </div>
            </div>

            {/* Group content */}
            <MDBCollapse show={show}>
                {children.length ? (
                    <div className='board-group__tiles-container'>{children}</div>
                ) : (
                    <div className='board-group__empty'>This group has no links yet</div>
                )}
            </MDBCollapse>
        </div>
    );
}
