import React from 'react';

/**
 * Collapse that adjusts its size to dynamically changing content
 * @param {object} props
 * @param {boolean} props.show - whether the collapse should be expanded
 * @param {*} [props.children]
 */
export default function DynamicCollapse({ show, children }) {
	return <div className={`dynamic-collapse${show ? ' show' : ''}`}>{children}</div>;
}
