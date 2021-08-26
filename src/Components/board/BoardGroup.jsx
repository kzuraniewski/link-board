import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { AddTileBtn } from './AddTileBtn';
import { CollapseArrow } from './CollapseArrow';
import { GroupName } from './GroupName';

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
