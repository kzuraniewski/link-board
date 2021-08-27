import React, { useState, useEffect, useRef } from 'react';

/**
 * Returns an input which allows to be editable when in edit mode
 * @param {object} props
 * @param {boolean} props.editMode - whether the input should be editable or not
 * @param {function} props.onPropertySet - called after entering input ended
 * @param {string} [props.className = null] - optional class
 * @param {string} [props.value = ''] - initial value
 * @param {boolean} [props.focus] - whether the property should be focused and selected on edit mode
 */
export function EditableProperty({
    className = null,
    value = '',
    editMode,
    onPropertySet,
    focus = false,
}) {
    const [propertyValue, setPropertyValue] = useState(value);
    const element = useRef(null);

    const maxDigits = 12;

    const clearSelection = () => {
        if (window.getSelection()) window.getSelection().removeAllRanges();
    };

    useEffect(() => {
        if (!editMode) return;

        if (focus) {
            element.current.focus();
            element.current.select();
            console.log('focus');
        } else {
            clearSelection();
        }
    }, [editMode]);

    return (
        <input
            ref={element}
            type='text'
            spellCheck='false'
            className={className}
            value={propertyValue}
            disabled={!editMode}
            onChange={e => {
                const value = e.target.value;
                if (value.length <= maxDigits) setPropertyValue(value);
            }}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    // @ts-ignore
                    e.target.blur();
                    onPropertySet(propertyValue);
                }
            }}
        />
    );
}
