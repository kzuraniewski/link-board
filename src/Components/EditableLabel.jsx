import React, { useEffect, useRef } from 'react';

/**
 * Returns an input which allows to be editable when in edit mode
 * @param {object} props
 * @param {boolean} props.editMode - whether the input should be editable or not
 * @param {function} props.setEditMode - function to set parent's edit mode state
 * @param {string} props.value - label value
 * @param {function} props.setValue - function to set label's value
 * @param {string} [props.className = null] - optional class
 * @param {string} [props.placeholder] - input field's placeholder
 * @param {boolean} [props.focus] - whether the property should be focused and selected on edit mode
 * @param {boolean} [props.exitOnBlur] - whether to exit when lost focus
 * @param {number} [props.maxDigits] - maximal length of input value
 */
export function EditableLabel({
	editMode,
	setEditMode,
	value,
	setValue,
	placeholder = '',
	className = null,
	focus = false,
	exitOnBlur = false,
	maxDigits = 999,
}) {
	const element = useRef(null);

	// clear all text selection
	const clearSelection = () => {
		if (window.getSelection()) window.getSelection().removeAllRanges();
	};

	// focus on input if in edit mode, otherwise clear selection
	useEffect(() => {
		if (focus) {
			element.current.focus();
			element.current.select();
		} else {
			clearSelection();
		}
	}, [editMode]);

	return (
		<input
			ref={element}
			type="text"
			spellCheck="false"
			className={className}
			placeholder={placeholder}
			disabled={!editMode}
			value={value}
			onChange={e => {
				const value = e.target.value;
				if (value.length <= maxDigits) setValue(value);
			}}
			onKeyDown={e => {
				if (e.key === 'Enter') {
					// @ts-ignore
					e.target.blur();
					setEditMode(false);
				}
			}}
			onBlur={() => {
				if (exitOnBlur) setEditMode(false);
			}}
		/>
	);
}
