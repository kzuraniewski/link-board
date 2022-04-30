import React, { useState, useEffect, useRef } from 'react';
import { useUpdateEffect } from '../../hooks';
import { EditableLabel } from '../EditableLabel';
import { Collapse } from 'react-bootstrap';

export interface TileData {
	/**
	 * tile's title. If an empty string is passed, then the default value of 'New tile' will
	 * be set after exitting edit mode.
	 */
	title?: string;

	/**
	 * tile's url
	 */
	link?: string;

	/**
	 * tile's background as a Font Awesome icon name
	 */
	icon?: string;
}

export interface TileProps extends TileData {
	/**
	 * mouse down event to detect if user clicked outside of tile
	 */
	mouseEvent?: MouseEvent;

	/**
	 * callback to update changed properties in parent element
	 */
	setTileData: (data: TileData) => any;

	/**
	 * callback to delete the tile from tiles list
	 */
	deleteTileData: () => any;

	/**
	 * only exception to clicking outside so the tile stays in edit mode after added
	 */
	addTileBtn: React.RefObject<HTMLElement>;
}

/**
 * Editable tile containing its title, link and preview
 */
export function Tile({
	title = '',
	link = '',
	icon = '',
	mouseEvent,
	setTileData,
	deleteTileData,
}: TileProps) {
	const titleDefaultValue = 'New tile';
	const mobileBreakpoint = 768;

	const thisTile = useRef<HTMLAnchorElement>(null);
	const iconContainer = useRef<HTMLDivElement>(null);
	const iconBtn = useRef<HTMLButtonElement>(null);

	// Edit mode on when title empty
	const [editMode, setEditMode] = useState(title.length === 0);
	const [showEditBtn, setShowEditBtn] = useState(false);
	const [showIconSelect, setShowIconSelect] = useState(false);

	// Label values
	const [titleValue, setTitleValue] = useState(title);
	const [linkValue, setLinkValue] = useState(link);

	// Update data after closing edit mode
	useUpdateEffect(() => {
		if (!editMode) {
			const data: TileData = {
				title: titleValue,
				link: linkValue,
			};

			// Use default title when empty
			if (!titleValue.length) {
				data.title = titleDefaultValue;
				setTitleValue(titleDefaultValue);
			}

			setTileData(data);

			setShowIconSelect(false);
		}
	}, [editMode]);

	useUpdateEffect(() => {
		if (!mouseEvent) return;

		const target = mouseEvent.target as Node;
		if (target && editMode) {
			// Clicked outside of tile
			if (!thisTile.current?.contains(target)) {
				setEditMode(false);
			}
			// Clicked inside the tile but outside of icon container
			else if (
				!iconContainer.current?.contains(target) &&
				!iconBtn.current?.contains(target)
			) {
				setShowIconSelect(false);
			}
		}
	}, [mouseEvent]);

	// Enter edit mode if mounted and labels not set
	useEffect(() => {
		if (!title.length) setEditMode(true);
	}, []);

	return (
		<a
			ref={thisTile}
			className="tile"
			href={link}
			target="_blank"
			onMouseEnter={() => setShowEditBtn(true)}
			onMouseLeave={() => setShowEditBtn(false)}
			onClick={e => {
				// disable link when in edit mode
				if (editMode) e.preventDefault();
			}}
		>
			{/* background */}
			<div className="tile__background">
				<i className={`fas fa-${icon}`}></i>
			</div>

			<div className="tile__mask">
				<div className={`tile__icon-select${editMode ? ' show' : ''}`}>
					{/* icon select button */}
					<button
						ref={iconBtn}
						onClick={() => setShowIconSelect(showIconSelect => !showIconSelect)}
						disabled={!editMode}
					>
						<i className="fas fa-ellipsis-v"></i>
					</button>

					{/* icon collapse */}
					<Collapse in={showIconSelect}>
						<div ref={iconContainer} className="tile__icon-container">
							{['align-left', 'star', 'music', 'shopping-basket'].map(
								(iconName, index) => (
									<button
										key={index}
										onClick={() => {
											setTileData({ icon: iconName });
											setShowIconSelect(false);
										}}
									>
										<i className={`fas fa-${iconName}`}></i>
									</button>
								)
							)}
						</div>
					</Collapse>
				</div>

				<div className="tile__btn-container">
					{/* Delete button */}
					<button
						className={`tile__btn${editMode ? ' show' : ''}`}
						disabled={!editMode}
						onClick={() => deleteTileData()}
					>
						<i className="fas fa-trash-alt"></i>
					</button>

					{/* Edit mode button */}
					<button
						className={`tile__btn${
							editMode || showEditBtn || window.innerWidth <= mobileBreakpoint
								? ' show'
								: ''
						}`}
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();

							setEditMode(editMode => !editMode);
						}}
					>
						{editMode ? (
							<i className="fas fa-check"></i>
						) : (
							<i className="fas fa-pen"></i>
						)}
					</button>
				</div>

				{/* name preview */}
				<EditableLabel
					className="tile__title"
					focus
					value={titleValue}
					setValue={setTitleValue}
					editMode={editMode}
					setEditMode={setEditMode}
				/>

				{/* link path */}
				<EditableLabel
					className="tile__link"
					value={linkValue}
					setValue={setLinkValue}
					placeholder="No link specified"
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			</div>
		</a>
	);
}
