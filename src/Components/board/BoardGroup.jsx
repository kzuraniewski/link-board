import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';

export function BoardGroup({ name, open, children = null }) {
    const [show, setShow] = useState(open);

    return (
        <div className={`mb-3 p-1 group rounded text-light`}>
            <div
                className='w-100 p-1 d-flex justify-content-between user-select-none pointer'
                onClick={() => setShow(show => !show)}
            >
                <h6 className='my-auto'>{name}</h6>
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

            <MDBCollapse show={show}>
                <div className='d-flex flex-wrap'>{children}</div>
            </MDBCollapse>
        </div>
    );
}
