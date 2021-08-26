import React, { useEffect, useState, useRef } from 'react';

/**
 * Shows group name or name input if in edit mode
 * @param {{name: string, setName: function}} props
 */
export function GroupName({ name, setName }) {
    const [inputValue, setInputValue] = useState(name);
    const [editMode, setEditMode] = useState(name.length ? false : true);

    const nameInput = useRef(null);

    const maxDigits = 20;
    const defaultName = 'New group';

    useEffect(() => {
        // focus input on edit mode or pass the name up to Group element
        if (editMode) nameInput.current.focus();
        else {
            // set group name
            if (!inputValue.length) setName(defaultName);
            else if (inputValue !== name) setName(inputValue);
        }
    }, [editMode]);

    if (editMode)
        return (
            <input
                ref={nameInput}
                type='text'
                placeholder='Name'
                className='board-group__name-input'
                value={inputValue}
                onChange={e => {
                    const val = e.target.value;
                    if (val.length <= maxDigits) setInputValue(val);
                }}
                onClick={e => {
                    // TODO adding tiles
                    e.stopPropagation();
                }}
                onBlur={() => {
                    setEditMode(false);
                }}
                onKeyDown={e => {
                    if (e.key === 'Enter') setEditMode(false);
                }}
            />
        );

    return <h6 className='board-group__name'>{name}</h6>;
}
