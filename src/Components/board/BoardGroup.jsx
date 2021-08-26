import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { GroupName } from './GroupName';

function CollapseArrow({ show }) {
    return (
        <i
            className={`fas fa-sort-down board-group__arrow${
                show ? '' : ' board-group__arrow--hidden'
            }`}
        ></i>
    );
}

function AddTileBtn({ show }) {
    return (
        <button
            className={`board-group__btn-add${show ? '' : ' board-group__btn-add--hidden'}`}
            onClick={e => {
                if (show) e.stopPropagation();
            }}
        >
            <i className='far fa-plus-square'></i>
        </button>
    );
}

export function BoardGroup({ name, setName, open, children = null }) {
    const [show, setShow] = useState(open);

    return (
        <div className='board-group'>
            <div className='board-group__topbar' onClick={() => setShow(show => !show)}>
                <GroupName name={name} setName={setName} />

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
