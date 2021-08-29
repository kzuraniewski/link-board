import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import React, { useEffect, useRef, useState } from 'react';
import { BoardGroup } from './BoardGroup';
import { Tile } from './Tile';

export default function Board() {
    const [groups, setGroups] = useState([]);

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
                        />
                    ))}

                    {/* new tile button */}
                    <button
                        ref={addTileBtn}
                        className={`board-group__btn-add`}
                        onClick={() => setTileData(groupIndex, tiles.length, emptyTileTemplate())}
                    >
                        <i className='far fa-plus-square'></i>
                    </button>
                </BoardGroup>
            ))}

            {/* new board button */}
            <MDBBtn className='board__add-group' size='sm' block outline onClick={addGroup}>
                <i className='fas fa-plus'></i>
            </MDBBtn>
        </MDBContainer>
    );
}
