import React, { useEffect, useRef } from 'react';

export interface EditableLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Whether the input should be editable or not
	 */
	editMode: boolean;

	/**
	 * Function to set parent's edit mode state
	 */
	setEditMode: (on: boolean) => void;

	/**
	 * Function to set label's value
	 */
	setValue: (value: string) => void;

	/**
	 * Input field's placeholder
	 */
	placeholder?: string;

	/**
	 * Whether the property should be focused and selected on edit mode
	 */
	focus?: boolean;

	/**
	 * Whether to exit when lost focus
	 */
	exitOnBlur?: boolean;

	/**
	 * Maximal length of input value
	 */
	maxDigits?: number;
}

/**
 * Returns an input which allows to be editable when in edit mode
 */
export function EditableLabel({
	editMode,
	setEditMode,
	value,
	setValue,
	placeholder = '',
	focus = false,
	exitOnBlur = false,
	maxDigits = 999,
	className,
	...other
}: EditableLabelProps) {
	const element = useRef<HTMLInputElement>(null);

	// clear all text selection
	const clearSelection = () => {
		window.getSelection()?.removeAllRanges();
	};

	// focus on input if in edit mode, otherwise clear selection
	useEffect(() => {
		if (element.current && focus) {
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
			{...other}
		/>
	);
}
