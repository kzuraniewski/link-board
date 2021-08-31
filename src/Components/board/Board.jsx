import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, expectSignIn } from '../../firebase';
import Loading from '../authentication/Loading';
import LogIn from '../authentication/LogIn';
import { BoardGroup } from './BoardGroup';
import { Tile } from './Tile';

export default function Board() {
    const [groups, setGroups] = useState([]);
    const [user] = useAuthState(auth);

    // Set mouse down target which will be passed to Tile elements
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    const addTileBtn = useRef(null);
    useEffect(() => {
        const cb = e => setMouseDownTarget(e.target);
        document.addEventListener('mousedown', cb);

        return () => {
            document.removeEventListener('mousedown', cb);
        };
    }, []);

    // add new empty editable group
    const addGroup = () => {
        setGroups(groups => [
            ...groups,
            {
                name: '',
                open: true,
                tiles: [],
            },
        ]);
    };

    /**
     * Set or add tile record
     * @param {number} groupIndex - index of the group object from groups list
     * @param {number} tileIndex - index of tile from the selected group
     * @param {{ title: string, link: string }} tileData - title and link of the tile
     */
    const setTileData = (groupIndex, tileIndex, tileData) => {
        setGroups(groups => {
            let t = [...groups];
            t[groupIndex].tiles[tileIndex] = { ...tileData };
            return t;
        });
    };

    /**
     * Delete tile record
     * @param {number} groupIndex - index of the group object from groups list
     * @param {number} tileIndex - index of tile from the selected group
     */
    const deleteTileData = (groupIndex, tileIndex) => {
        setGroups(groups => {
            let t = [...groups];
            delete t[groupIndex].tiles[tileIndex];
            return t;
        });
    };

    const emptyTileTemplate = () => {
        return { title: '', link: '' };
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

        setTileData(0, 1, { title: 'asdf', link: 'dedasd' });
    }, []);

    if (!user) {
        if (expectSignIn()) return <Loading centered />;
        else return <LogIn />;
    }

    return (
        <MDBContainer className='board'>
            {/* translate groups into components */}
            {groups.map(({ name, open, tiles }, groupIndex) => (
                <BoardGroup
                    key={groupIndex}
                    open={open}
                    name={name}
                    setName={name => {
                        // Update board's name in the groups object
                        setGroups(groups => {
                            const t = [...groups];
                            t[groupIndex].name = name;

                            return t;
                        });
                    }}
                >
                    {tiles.map(({ title, link }, tileIndex) => (
                        <Tile
                            key={tileIndex}
                            title={title}
                            link={link}
                            mouseDownTarget={mouseDownTarget}
                            addTileBtn={addTileBtn}
                            setTileData={tileData => setTileData(groupIndex, tileIndex, tileData)}
                            deleteTileData={() => deleteTileData(groupIndex, tileIndex)}
                        />
                    ))}

                    {/* new tile button */}
                    <MDBBtn
                        ref={addTileBtn}
                        className='board__add-tile-btn'
                        size='sm'
                        outline
                        onClick={() => setTileData(groupIndex, tiles.length, emptyTileTemplate())}
                    >
                        <i className='fas fa-plus'></i>
                    </MDBBtn>
                </BoardGroup>
            ))}

            {/* new board button */}
            <MDBBtn className='board__add-group' size='sm' block outline onClick={addGroup}>
                <i className='fas fa-plus'></i>
            </MDBBtn>
        </MDBContainer>
    );
}
