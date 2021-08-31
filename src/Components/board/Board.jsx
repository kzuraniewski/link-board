import React, { useEffect, useRef, useState } from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { useUpdateEffect } from '../../hooks';

import Loading from '../authentication/Loading';
import LogIn from '../authentication/LogIn';
import { BoardGroup } from './BoardGroup';
import { Tile } from './Tile';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, expectSignIn, database } from '../../firebase';
import { collection, getDocs, doc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';

/**
 *
 * @param {Array} initialState - array's initial state
 * @param {*} firestore - database reference
 * @param {string} path - path to a document
 * @param {*} [pathSegments] - additional path segments
 * @returns
 */
const useDatabaseState = (initialState, firestore, path, pathSegments) => {
    const [state, setState] = useState(initialState);

    // Upload data to server
    const uploadState = () => {
        setDoc(doc(firestore, path, pathSegments), {});
    };

    // Collect group data from database
    const pullState = () =>
        getDocs(collection(firestore, path)).then(snapshot => {
            setState(() => {
                const r = [];
                snapshot.forEach(doc => r.push(doc.data()));
                return r;
            });
        });

    useEffect(() => {
        pullState();
    }, []);

    useEffect(() => {
        uploadState();
    }, [state]);

    return [state, setState];
};

export default function Board() {
    const databasePath = 'BoardData';

    const [groups, setGroups] = useState({});
    const [user] = useAuthState(auth);

    // Set mouse down target which will be passed to Tile elements
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    const addTileBtn = useRef(null);

    // Upload data to server
    const uploadGroups = () => {
        // setDoc(doc(database, databasePath, '9nZP4O6VhAZ51nE0HtRm'), {});
        getDocs(collection(database, databasePath)).then(snapshot => {
            snapshot.forEach(doc => {
                console.log(groups);
                setDoc(doc.ref, groups[doc.id]);
            });
        });
    };

    // Collect group data from database
    const pullGroups = () => {
        getDocs(collection(database, databasePath)).then(snapshot => {
            setGroups(() => {
                const r = {};

                snapshot.forEach(doc => {
                    const data = doc.data();
                    r[doc.id] = data;
                });

                return r;
            });
        });
    };

    useEffect(() => {
        pullGroups();

        const cb = e => setMouseDownTarget(e.target);
        document.addEventListener('mousedown', cb);

        return () => {
            document.removeEventListener('mousedown', cb);
        };
    }, []);

    useUpdateEffect(() => {
        uploadGroups();
    }, [groups]);

    // add new empty editable group
    const addGroup = () => {
        // setGroups(groups => [
        //     ...groups,
        //     {
        //         name: '',
        //         open: true,
        //         tiles: [],
        //     },
        // ]);
    };

    /**
     * Set or add tile record
     * @param {number} groupKey - key of the group object from groups list
     * @param {number} tileIndex - index of tile from the selected group
     * @param {{ title: string, link: string }} tileData - title and link of the tile
     */
    const setTileData = (groupKey, tileIndex, tileData) => {
        setGroups(groups => {
            let t = { ...groups };
            t[groupKey].tiles[tileIndex] = { ...tileData };
            return t;
        });
    };

    /**
     * Delete tile record
     * @param {number} groupKey - key of the group object from groups list
     * @param {number} tileIndex - index of tile from the selected group
     */
    const deleteTileData = (groupKey, tileIndex) => {
        setGroups(groups => {
            let t = { ...groups };
            delete t[groupKey].tiles[tileIndex];
            return t;
        });
    };

    const emptyTileTemplate = () => {
        return { title: '', link: '' };
    };

    if (!user) {
        if (expectSignIn()) return <Loading centered />;
        else return <LogIn />;
    }

    return (
        <MDBContainer className='board'>
            {/* translate groups into components */}
            {Object.values(groups).map(({ name, open, tiles }, groupIndex) => (
                <BoardGroup
                    key={groupIndex}
                    open={open}
                    name={name}
                    setName={name => {
                        // Update board's name in the groups object
                        setGroups(groups => {
                            const t = { ...groups };
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
