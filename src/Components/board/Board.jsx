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
 * Gathers group info and interacts with firebase
 */
export default function Board() {
    const [user] = useAuthState(auth);

    const [groups, setGroups] = useState([]);
    const [groupElements, setGroupElements] = useState([]);

    // Set mouse down target which will be passed to Tile elements
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    const addTileBtn = useRef(null);

    // Get the user's group doc, create if not found
    const getBoardDoc = async () => {
        const firebaseCollection = collection(database, 'BoardData');

        // Get the user's group doc
        let boardDoc = await getDocs(firebaseCollection).then(
            snapshot => snapshot.docs.filter(doc => doc.id === user.uid)[0]
        );

        // let boardDoc = doc(firebaseCollection, user.uid);

        // Create new user's group doc if not found
        if (!boardDoc) {
            const templateGroup = {
                groups: [
                    {
                        name: 'New group',
                        open: true,
                        tiles: [],
                    },
                ],
            };

            await setDoc(doc(firebaseCollection, user.uid), templateGroup);
            boardDoc = await getDocs(firebaseCollection)[user.uid];
        }

        return boardDoc;
    };

    // Collect group data from database
    const pull = async () => {
        const boardDoc = await getBoardDoc();

        setGroups(() => boardDoc.data().groups);
    };

    // Upload data to server
    const push = async () => {
        const boardDoc = await getBoardDoc();

        // Filter out all undefined tiles
        const fixedGroups = groups.map(group => ({
            ...group,
            tiles: group.tiles.filter(tile => tile !== undefined),
        }));

        setDoc(boardDoc.ref, { groups: fixedGroups });
    };

    useEffect(() => {
        if (!user) return;

        // Collect data from database
        pull();

        // Listen for mouse click for exiting tiles' edit mode
        const cb = e => setMouseDownTarget(e.target);
        document.addEventListener('mousedown', cb);

        return () => {
            document.removeEventListener('mousedown', cb);
        };
    }, [user]);

    // Upload groups every time it changes
    useUpdateEffect(() => {
        push();
    }, [groups]);

    // add new empty editable group
    const addGroup = async () => {
        /// Upload first then pull so Firebase generates id on its own

        // Empty group template
        const groupTemplate = {
            name: '',
            open: true,
            tiles: [],
        };

        setGroups(groups => [...groups, groupTemplate]);
    };

    /**
     * Set or add tile record
     * @param {string} groupIndex - index of the group object from groups list
     * @param {number} tileIndex - index of tile from the selected group
     * @param {{ title: string, link: string }} tileData - title and link of the tile
     */
    const setTileData = (groupIndex, tileIndex, tileData) => {
        setGroups(groups => {
            const t = [...groups];
            t[groupIndex].tiles[tileIndex] = tileData;
            return t;
        });
    };

    /**
     * Delete tile record
     * @param {string} groupIndex - key of the group object from groups list
     * @param {number} tileIndex - index of tile from the selected group
     */
    const deleteTileData = (groupIndex, tileIndex) => {
        setGroups(groups => {
            let t = [...groups];
            delete t[groupIndex].tiles[tileIndex];
            // t[groupIndex].tiles.splice(tileIndex, 1);
            return t;
        });
    };

    /**
     * Update board's data in the groups object
     * @param {string} groupIndex - key of the group object from groups list
     * @param {object} data - group's modified keys
     */
    const setGroupData = (groupIndex, data) => {
        setGroups(groups => {
            const t = [...groups];

            t[groupIndex] = {
                ...t[groupIndex],
                ...data,
            };

            return t;
        });
    };

    /**
     * Removes a group of given index from groups array
     * @param {number} groupIndex
     */
    const deleteGroup = groupIndex => {
        setGroups(groups => {
            groups.splice(groupIndex, 1);
            return groups;
        });
    };

    // Generate group elements outside of return statement (because for...of)
    useEffect(() => {
        setGroupElements(() => {
            const groupElements = [];

            for (const [key, { name, open, tiles }] of Object.entries(groups)) {
                groupElements.push(
                    <BoardGroup
                        key={key}
                        open={open}
                        name={name}
                        setData={data => setGroupData(key, data)}
                    >
                        {tiles &&
                            tiles.map(({ title, link }, tileIndex) => (
                                <Tile
                                    key={tileIndex}
                                    title={title}
                                    link={link}
                                    mouseDownTarget={mouseDownTarget}
                                    addTileBtn={addTileBtn}
                                    setTileData={tileData => setTileData(key, tileIndex, tileData)}
                                    deleteTileData={() => deleteTileData(key, tileIndex)}
                                />
                            ))}

                        {/* new tile button */}
                        <MDBBtn
                            ref={addTileBtn}
                            className='board__add-tile-btn'
                            size='sm'
                            outline
                            onClick={() =>
                                setTileData(key, tiles ? tiles.length : 0, { title: '', link: '' })
                            }
                        >
                            <i className='fas fa-plus'></i>
                        </MDBBtn>
                    </BoardGroup>
                );
            }

            return groupElements;
        });
    }, [groups]);

    if (!user) {
        if (expectSignIn()) return <Loading centered />;
        else return <LogIn />;
    }

    return (
        <MDBContainer className='board'>
            {groupElements}

            {/* new board button */}
            <MDBBtn className='board__add-group' size='sm' block outline onClick={addGroup}>
                <i className='fas fa-plus'></i>
            </MDBBtn>
        </MDBContainer>
    );
}
