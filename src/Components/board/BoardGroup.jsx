import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';

export function BoardGroup({ name, children = null }) {
    const [show, setShow] = useState(false);

    return (
        <div className={`mb-3 p-1 bg-light border border-primary border-2 rounded`}>
            <div
                className='btn-blank w-100 p-1 d-flex justify-content-between user-select-none pointer'
                onClick={() => setShow(show => !show)}
            >
                <h6 className='my-auto'>{name}</h6>
                <div className='d-flex'>
                    <button
                        className='btn-blank'
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <i
                            className={`fas fa-plus group__add me-5${
                                show ? '' : ' group__add--hidden'
                            }`}
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
