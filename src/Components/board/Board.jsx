import { MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { BoardGroup } from './BoardGroup';
import { Tile } from './Tile';

function AddGroup({ onAdd }) {
    return (
        <button
            className='p-2 btn-blank d-flex align-items-center justify-content-center text-light bg-secondary add-group rounded w-100'
            onClick={onAdd}
        >
            <i className='fas fa-plus'></i>
        </button>
    );
}

export default function Board() {
    const [groups, setGroups] = useState([]);

    const addGroup = () => {};

    //test
    useEffect(() => {
        setGroups([
            {
                name: 'General',
                open: true,
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
                open: false,
                tiles: [
                    {
                        title: 'Sit',
                        link: 'https://google.com',
                    },
                ],
            },
        ]);
    }, []);

    return (
        <MDBContainer className='py-4'>
            {/* translate groups into components */}
            {groups.map(({ name, open, tiles }, index) => (
                <BoardGroup key={index} name={name} open={open}>
                    {tiles.map(({ title, link }, index) => (
                        <Tile key={index} title={title} link={link} />
                    ))}
                </BoardGroup>
            ))}
            <AddGroup onAdd={addGroup} />
        </MDBContainer>
    );
}
