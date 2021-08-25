import { MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { AddGroup } from './AddGroup';
import { BoardGroup } from './BoardGroup';
import { Tile } from './Tile';

export default function Board() {
    const [groups, setGroups] = useState([]);

    const addGroup = () => {
        // add new empty editable group
        setGroups(groups => [
            ...groups,
            {
                name: '',
                open: true,
                tiles: [],
            },
        ]);
    };

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
        <MDBContainer className='board'>
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
