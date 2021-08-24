import { MDBCollapse, MDBContainer } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import placeholder from '../images/placeholder.jpeg';

function Tile({ position, size, title, link }) {
    const [editMode, setEditMode] = useState(false);
    const [editable, setEditable] = useState(false);

    // Grid size of a tile
    const sizes = {
        l: {
            x: 2,
            y: 2,
        },
        m: {
            x: 2,
            y: 1,
        },
        s: {
            x: 1,
            y: 1,
        },
    };

    // dynamic bg image and size
    const style = {
        backgroundImage: `url(${placeholder})`,
        backgroundSize: 'cover',

        width: sizes[size].x * 5 + 'rem',
        height: sizes[size].y * 5 + 'rem',

        gridRowStart: position[0],
        gridRowEnd: position[0] + sizes[size].x,
        gridColumnStart: position[1],
        gridColumnEnd: position[1] + sizes[size].y,
    };

    return (
        <div
            className='text-light overflow-hidden rounded'
            style={style}
            onMouseEnter={() => setEditable(true)}
            onMouseLeave={() => setEditable(false)}
        >
            <div className='tile-mask w-100 h-100 d-flex flex-column justify-content-end p-2 position-relative'>
                {editable && (
                    <button className='btn-edit text-light bg-transparent border-0 position-absolute top-0 end-0 mt-2 me-2'>
                        <i className='fas fa-pen'></i>
                    </button>
                )}

                <a href='#' className='text-light'>
                    <h5 className='text-truncate user-select-none'>{title}</h5>
                    <p className='tile-link text-truncate user-select-none mb-0'>{link}</p>
                </a>
            </div>
        </div>
    );
}

function BoardGroup({ name, children = null }) {
    const [show, setShow] = useState(false);

    return (
        <div className='mb-3'>
            <div
                className='d-flex justify-content-between user-select-none pointer'
                onClick={() => setShow(show => !show)}
            >
                <h6>{name}</h6>
                <i
                    className={`fas fa-sort-down group-arrow${show ? '' : ' group-arrow--hidden'}`}
                ></i>
            </div>
            <MDBCollapse show={show} className='p-2'>
                <div className='group-content'>{children}</div>
            </MDBCollapse>
        </div>
    );
}

export default function Board() {
    return (
        <MDBContainer className='bg-light text-dark shadow-2-strong rounded p-4 my-3'>
            <BoardGroup name='Group 1'>
                <Tile position={[1, 1]} size='l' title='Lorem ipsum' link='https://google.com' />
                <Tile position={[2, 2]} size='s' title='Lorem ipsum' link='https://google.com' />
            </BoardGroup>
            <BoardGroup name='Group 2'>
                <Tile position={[1, 1]} size='s' title='Lorem ipsum' link='https://google.com' />
            </BoardGroup>
        </MDBContainer>
    );
}
