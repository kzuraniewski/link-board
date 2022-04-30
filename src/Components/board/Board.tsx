import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { useUpdateEffect } from '../../hooks';

import Loading from '../authentication/Loading';
import LogIn from '../authentication/LogIn';
import { BoardGroup, BoardGroupData } from './BoardGroup';
import { Tile, TileData } from './Tile';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, expectSignIn, database } from '../../firebase';
import { collection, getDocs, doc, QueryDocumentSnapshot, DocumentData } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface Group extends BoardGroupData {
	tiles: TileData[];
}

/**
 * Gathers group info and interacts with firebase
 */
export default function Board() {
	const [user] = useAuthState(auth);

	const [groups, setGroups] = useState<Group[]>([]);

	// Set mouse down target which will be passed to Tile elements
	const [mouseEvent, setMouseEvent] = useState<MouseEvent>();
	// TODO: Proper template type
	const addTileBtn = useRef<any>(null);

	// Get the user's group doc, create if not found
	const getBoardDoc = async (user: User) => {
		const firebaseCollection = collection(database, 'BoardData');

		// Get the user's group doc
		let boardDoc = (await getDocs(firebaseCollection)).docs.find(doc => doc.id === user.uid);

		// Create new user's group doc if not found
		if (!boardDoc) {
			const templateGroup: Group = {
				name: 'New group',
				open: true,
				tiles: [],
			};

			const docData = {
				groups: [templateGroup],
			};

			await setDoc(doc(firebaseCollection, user.uid), docData);
			boardDoc = (await getDocs(firebaseCollection)).docs.find(doc => doc.id === user.uid);
		}

		return boardDoc as QueryDocumentSnapshot<DocumentData>;
	};

	// Collect group data from database
	const pull = async (user: User) => {
		const boardDoc = await getBoardDoc(user);

		setGroups(() => boardDoc.data().groups);
	};

	// Upload data to server
	const push = async (user: User) => {
		const boardDoc = await getBoardDoc(user);

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
		pull(user);

		// Listen for mouse click for exiting tiles' edit mode
		const cb = (e: MouseEvent) => setMouseEvent(e);
		document.addEventListener('mouseup', cb);

		return () => {
			document.removeEventListener('mouseup', cb);
		};
	}, [user]);

	// Upload groups every time it changes
	useUpdateEffect(() => {
		if (!user) return;

		push(user);
	}, [groups]);

	// add new empty editable group
	const addGroup = async () => {
		/// Upload first then pull so Firebase generates id on its own

		// Empty group template
		const groupTemplate: Group = {
			name: '',
			open: true,
			tiles: [],
		};

		setGroups(groups => [...groups, groupTemplate]);
	};

	/**
	 * Set or add tile record
	 * @param groupIndex - index of the group object from groups list
	 * @param tileIndex - index of tile from the selected group
	 * @param tileData - title and link of the tile
	 */
	const setTileData = (groupIndex: number, tileIndex: number, tileData: TileData) => {
		setGroups(groups => {
			const t = [...groups];

			t[groupIndex].tiles[tileIndex] = {
				...t[groupIndex].tiles[tileIndex],
				...tileData,
			};

			return t;
		});
	};

	/**
	 * Delete tile record
	 * @param groupIndex - key of the group object from groups list
	 * @param tileIndex - index of tile from the selected group
	 */
	const deleteTile = (groupIndex: number, tileIndex: number) => {
		setGroups(groups => {
			let t = [...groups];
			delete t[groupIndex].tiles[tileIndex];
			// t[groupIndex].tiles.splice(tileIndex, 1);
			return t;
		});
	};

	/**
	 * Update board's data in the groups object
	 * @param groupIndex - key of the group object from groups list
	 * @param data - group's modified keys
	 */
	const setGroupData = (groupIndex: number, data: Group) => {
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
	 * @param groupIndex - key of the group object from groups list
	 */
	const deleteGroup = (groupIndex: number) => {
		setGroups(groups => {
			const t = [...groups];
			t.splice(groupIndex, 1);
			return t;
		});
	};

	if (!user) {
		if (expectSignIn()) return <Loading centered />;
		else
			return (
				<div className="centered d-flex flex-column align-items-center">
					<h3>You are not signed in. To use your board, sign in first.</h3>
					<LogIn />
				</div>
			);
	}

	return (
		<MDBContainer className="board">
			{groups.map(({ name, open, tiles }, groupIndex) => (
				<BoardGroup
					key={groupIndex}
					open={open}
					name={name}
					setData={data => setGroupData(groupIndex, data as Group)}
					deleteGroup={() => deleteGroup(groupIndex)}
				>
					{tiles &&
						tiles.map(({ title, link, icon }, tileIndex) => (
							<Tile
								key={tileIndex}
								title={title}
								link={link}
								icon={icon}
								mouseEvent={mouseEvent}
								addTileBtn={addTileBtn}
								setTileData={tileData =>
									setTileData(groupIndex, tileIndex, tileData)
								}
								deleteTileData={() => deleteTile(groupIndex, tileIndex)}
							/>
						))}

					{/* new tile button */}
					<MDBBtn
						ref={addTileBtn}
						className="board__add-tile-btn"
						size="sm"
						outline
						onClick={() =>
							setTileData(groupIndex, tiles ? tiles.length : 0, {
								title: '',
								link: '',
								icon: 'align-left',
							})
						}
					>
						<i className="fas fa-plus"></i>
					</MDBBtn>
				</BoardGroup>
			))}

			{/* new board button */}
			<MDBBtn className="board__add-group" size="sm" block outline onClick={addGroup}>
				<i className="fas fa-plus"></i>
			</MDBBtn>
		</MDBContainer>
	);
}
