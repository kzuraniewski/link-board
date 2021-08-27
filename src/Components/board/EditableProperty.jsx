import React, { useState, useEffect, useRef } from 'react';

/**
 * Returns an input which allows to be editable when in edit mode
 * @param {object} props
 * @param {boolean} props.editMode - whether the input should be editable or not
 * @param {function} [props.onPropertySet] - called after entering input ended
 * @param {string} [props.className = null] - optional class
 * @param {string} [props.value = ''] - initial value
 * @param {string} [props.defaultValue] - value used instead of empty string
 * @param {boolean} [props.focus] - whether the property should be focused and selected on edit mode
 * @param {boolean} [props.exitOnBlur] - whether to call onPropertySet on blur
 * @param {number} [props.maxDigits] - maximal length of input value
 */
export function EditableProperty({
    editMode,
    value = '',
    defaultValue = '',
    className = null,
    focus = false,
    exitOnBlur = false,
    onPropertySet = null,
    maxDigits = 999,
}) {
    const [propertyValue, setPropertyValue] = useState(value);
    const element = useRef(null);

    // clear all text selection
    const clearSelection = () => {
        if (window.getSelection()) window.getSelection().removeAllRanges();
    };

    // call onPropertySet if given and use default value if specified
    const exit = () => {
        onPropertySet?.(propertyValue.length ? propertyValue : defaultValue);
    };

    // focus on input if in edit mode, otherwise clear selection
    useEffect(() => {
        if (!editMode) return;

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
                    exit();
                }
            }}
            onBlur={() => {
                if (exitOnBlur) exit();
            }}
        />
    );
}
