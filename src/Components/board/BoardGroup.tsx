import React, { useEffect, useState } from 'react';
import { CollapseArrow } from './CollapseArrow';
import { EditableLabel } from '../EditableLabel';
import DynamicCollapse from '../DynamicCollapse';

export interface BoardGroupData {
	name?: string;
	open?: boolean;
}

export interface BoardGroupProps extends BoardGroupData {
	setData: (data: BoardGroupData) => any;
	deleteGroup: Function;
	children?: React.ReactNode;
}

/**
 * Hideable and editable board group containing its tiles
 */
export function BoardGroup({
	name = '',
	open = true,
	setData,
	deleteGroup,
	children = null,
}: BoardGroupProps) {
	const defaultName = 'New group';

	const [show, setShow] = useState(open);
	const [editMode, setEditMode] = useState(name.length ? false : true);
	const [showEditBtn, setShowEditBtn] = useState(false);

	// Use default group name if empty
	useEffect(() => {
		if (!editMode && !name.length) {
			setData({ name: defaultName });
		}
	}, [editMode]);

	return (
		<div className="board-group">
			{/* topbar */}
			<div
				className="board-group__topbar"
				onMouseDown={() => {
					// Lock board group toggling when in edit mode
					if (!editMode) {
						setShow(show => {
							setData({ open: !show });
							return !show;
						});
					}
				}}
				onMouseEnter={() => setShowEditBtn(true)}
				onMouseLeave={() => setShowEditBtn(false)}
			>
				{/* edit button */}
				<div className={`edit${!(show && showEditBtn) ? ' edit--hide' : ''}`}>
					<button
						className={`edit__btn`}
						disabled={!show}
						onMouseDown={e => {
							e.stopPropagation();
							setEditMode(editMode => !editMode);
						}}
					>
						<i className="fas fa-cog"></i>
					</button>
				</div>

				<div>
					{/* name label */}
					<EditableLabel
						editMode={editMode}
						setEditMode={setEditMode}
						value={name}
						setValue={name => setData({ name })}
						className="board-group__name"
						focus
						exitOnBlur
					/>

					{/* delete button */}
					<button
						className={`board-group__delete-btn${
							!editMode ? ' board-group__delete-btn--hide' : ''
						}`}
						disabled={!editMode}
						onMouseDown={e => {
							e.stopPropagation();

							deleteGroup();
						}}
					>
						<i className="fas fa-trash-alt"></i>
					</button>
				</div>

				<CollapseArrow show={show} />
			</div>

			{/* Group content */}
			<DynamicCollapse show={show}>
				{children ? (
					<div className="board-group__tiles-container">{children}</div>
				) : (
					// default text
					<div className="board-group__empty">This group has no links yet</div>
				)}
			</DynamicCollapse>
		</div>
	);
}
