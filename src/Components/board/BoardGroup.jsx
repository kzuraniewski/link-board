import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';

export function BoardGroup({ name, open, children = null }) {
    const [show, setShow] = useState(open);
    const [editMode, setEditMode] = useState(name.length ? false : true);

    useEffect(() => {}, [editMode]);

    return (
        <div className={`mb-3 p-1 group rounded text-light`}>
            <div
                className='w-100 p-1 d-flex justify-content-between user-select-none pointer'
                onClick={() => setShow(show => !show)}
            >
                {/* name or input */}
                {editMode ? (
                    <input type='text' placeholder='Name' className='group__input bg-transparent text-light border-0 border-bottom border-light' onClick={e => e.stopPropagation()} />
                ) : (
                    <h6 className='my-auto'>{name}</h6>
                )}

                {/* Icons */}
                <div className='d-flex'>
                    <button
                        className='btn-blank text-light me-5'
                        onClick={e => {
                            if (show) e.stopPropagation();
                        }}
                    >
                        <i
                            className={`fas fa-plus group__add${show ? '' : ' group__add--hidden'}`}
                        ></i>
                    </button>
                    <i
                        className={`fas fa-sort-down group__arrow${
                            show ? '' : ' group__arrow--hidden'
                        }`}
                    ></i>
                </div>
            </div>

            {/* Group content */}
            <MDBCollapse show={show}>
                {children.length ? (
                    <div className='d-flex flex-wrap'>{children}</div>
                ) : (
                    <div className='p-5 d-flex justify-content-center align-items-center opacity-50'>
                        This group has no links yet
                    </div>
                )}
            </MDBCollapse>
        </div>
    );
}
