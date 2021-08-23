import { MDBCollapse } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import Tile from './Tile';

function BoardGroup({ name, children = null }) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div
                className='d-flex justify-content-between'
                onClick={() => setShow(show => !show)}
                style={{ cursor: 'pointer' }}
            >
                <h6>{name}</h6>
                <i className={`fas fa-sort-down${show ? '' : ' hidden'}`}></i>
            </div>
            <MDBCollapse show={show}>{children}</MDBCollapse>
        </div>
    );
}

export default function Board() {
    return (
        <div className='bg-light shadow-1-strong rounded p-4 my-3'>
            <BoardGroup name='Group 1'>
                <Tile size='l' title='Lorem ipsum' link='https://google.com' />
            </BoardGroup>
            <BoardGroup name='Group 2'></BoardGroup>
        </div>
    );
}
