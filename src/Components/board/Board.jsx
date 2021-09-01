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
import { addDoc, deleteDoc, setDoc } from 'firebase/firestore';

// /**
//  * Gathers group info and interacts with firebase
//  * @param {Array} initialState - array's initial state
//  * @param {*} firestore - database reference
//  * @param {string} path - path to a document
//  * @param {*} [pathSegments] - additional path segments
//  */
// const useDatabaseState = (initialState, firestore, path, pathSegments) => {
//     const [state, setState] = useState(initialState);

//     // Collect data from database on mount
//     useEffect(() => {
//         getDocs(collection(firestore, path)).then(snapshot => {
//             setState(() => {
//                 const r = [];
//                 snapshot.forEach(doc => r.push(doc.data()));
//                 return r;
//             });
//         });
//     }, []);

//     // Upload data to database every time it changes
//     useEffect(() => {
//         setDoc(doc(firestore, path, pathSegments), {});
//     }, [state]);

//     return [state, setState];
// };

/**
 * Gathers group info and interacts with firebase
 */
export default function Board() {
    const firebaseCollection = collection(database, 'BoardData');

    const [groups, setGroups] = useState({});
    const [groupElements, setGroupElements] = useState([]);
    const [user] = useAuthState(auth);

    // Set mouse down target which will be passed to Tile elements
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    const addTileBtn = useRef(null);

    // Upload data to server
    const uploadGroups = async () => {
        const snapshot = await getDocs(firebaseCollection);

        snapshot.forEach(groupDoc => {
            if (groupDoc.id in groups) setDoc(groupDoc.ref, groups[groupDoc.id]);
            // Erase Firebase doc if not in groups
            else deleteDoc(groupDoc.ref);
        });
    };

    // Collect group data from database
    const pullGroups = async () => {
        const snapshot = await getDocs(firebaseCollection);

        setGroups(() => {
            const r = {};

            snapshot.forEach(doc => {
                const data = doc.data();
                r[doc.id] = data;
            });

            return r;
        });
    };

    useEffect(() => {
        // Collect data from database
        pullGroups();

        // Listen for mouse click for exiting tiles' edit mode
        const cb = e => setMouseDownTarget(e.target);
        document.addEventListener('mousedown', cb);

        return () => {
            document.removeEventListener('mousedown', cb);
        };
    }, []);

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
                        setName={name => setGroupName(key, name)}
                    >
                        {tiles.map(({ title, link }, tileIndex) => (
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
                            onClick={() => setTileData(key, tiles.length, { title: '', link: '' })}
                        >
                            <i className='fas fa-plus'></i>
                        </MDBBtn>
                    </BoardGroup>
                );
            }

            return groupElements;
        });
    }, [groups]);

    // Upload groups every time it changes
    useUpdateEffect(() => {
        uploadGroups();
    }, [groups]);

    // add new empty editable group
    const addGroup = async () => {
        /// Upload first then pull so Firebase generates id on its own

        // Empty group template
        const docData = {
            name: '',
            open: true,
            tiles: [],
        };

        // Create new doc with auto id
        await addDoc(firebaseCollection, docData);

        // Pull from server
        pullGroups();
    };

    /**
     * Set or add tile record
     * @param {string} groupKey - key of the group object from groups list
     * @param {number} tileIndex - index of tile from the selected group
     * @param {{ title: string, link: string }} tileData - title and link of the tile
     */
    const setTileData = (groupKey, tileIndex, tileData) => {
        /// Set data locally then push
        console.log(tileData);

        setGroups(groups => {
            groups[groupKey].tiles[tileIndex] = tileData;
            return groups;
        });

        uploadGroups();
    };

    /**
     * Delete tile record
     * @param {string} groupKey - key of the group object from groups list
     * @param {number} tileIndex - index of tile from the selected group
     */
    const deleteTileData = (groupKey, tileIndex) => {
        setGroups(groups => {
            let t = { ...groups };
            delete t[groupKey].tiles[tileIndex];
            return t;
        });

        uploadGroups();
    };

    const setGroupName = (groupKey, name) => {
        // Update board's name in the groups object
        setGroups(groups => {
            groups[groupKey].name = name;
            return groups;
        });

        uploadGroups();
    };

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
