import { MDBCol, MDBCollapse, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import placeholder from '../images/placeholder.jpeg';

function Tile({ title, link }) {
    const [editMode, setEditMode] = useState(false);
    const [editable, setEditable] = useState(false);

    // dynamic bg image and size
    const style = {
        backgroundImage: `url(${placeholder})`,
    };

    return (
        <a
            className='tile d-block text-light overflow-hidden rounded m-1 d-inline-block'
            href={link}
            style={style}
            onMouseEnter={() => setEditable(true)}
            onMouseLeave={() => setEditable(false)}
        >
            <div className='tile-mask w-100 h-100 d-flex flex-column justify-content-end p-2 position-relative'>
                {editable && (
                    <button
                        className='btn-edit text-light bg-transparent border-0 position-absolute top-0 end-0 mt-2 me-2'
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();

                            setEditMode(editMode => !editMode);
                        }}
                    >
                        <i className='fas fa-pen'></i>
                    </button>
                )}

                <h5 className='text-truncate user-select-none'>{title}</h5>
                <p className='tile-link text-truncate user-select-none mb-0'>{link}</p>
            </div>
        </a>
    );
}

function BoardGroup({ name, children = null }) {
    const [show, setShow] = useState(false);

    return (
        <div className={`mb-3 rounded p-1 group${show ? '' : ' group--hidden'}`}>
            <div
                className='d-flex justify-content-between user-select-none pointer'
                onClick={() => setShow(show => !show)}
            >
                <h6>{name}</h6>
                <div>
                    <button
                        className='btn-blank'
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <i
                            className={`fas fa-plus group__add${show ? '' : ' group__add--hidden'}`}
                        ></i>
                    </button>
                    <i
                        className={`fas fa-sort-down group__arrow ms-5${
                            show ? '' : ' group__arrow--hidden'
                        }`}
                    ></i>
                </div>
            </div>
            <MDBCollapse show={show} className='p-2'>
                <div className='d-flex h-100'>{children}</div>
            </MDBCollapse>
        </div>
    );
}

export default function Board() {
    const [groups, setGroups] = useState([]);

    //test
    useEffect(() => {
        setGroups([
            {
                name: 'General',
                tiles: [
                    {
                        title: 'Lorem',
                        link: 'https://google.com',
                    },
                    {
                        title: 'Ipsum',
                        link: 'https://google.com',
                    },
                    {
                        title: 'Dolor',
                        link: 'https://google.com',
                    },
                ],
            },
            {
                name: 'Group test',
                tiles: [
                    {
                        title: 'Sit',
                        link: 'https://googlr.com',
                    },
                ],
            },
        ]);
    }, []);

    useEffect(() => {
        console.log(groups);
    }, [groups]);

    return (
        <MDBContainer className='bg-light text-dark shadow-2-strong rounded p-4 my-3'>
            {/* translate groups into components */}
            {groups.map(({ name, tiles }, index) => (
                <BoardGroup key={index} name={name}>
                    {tiles.map(({ title, link }, index) => (
                        <Tile key={index} title={title} link={link} />
                    ))}
                </BoardGroup>
            ))}
        </MDBContainer>
    );
}
