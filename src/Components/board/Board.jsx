import { MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { BoardGroup } from './BoardGroup';
import { Tile } from './Tile';

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
        <MDBContainer className='py-4'>
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
