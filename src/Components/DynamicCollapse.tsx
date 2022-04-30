import React from 'react';

export interface DynamicCollapseProps {
	/**
	 * Whether the collapse should be expanded
	 */
	show: boolean;

	children: React.ReactNode;
}

/**
 * Collapse that adjusts its size to dynamically changing content
 */
export default function DynamicCollapse({ show, children }: DynamicCollapseProps) {
	return <div className={`dynamic-collapse${show ? ' show' : ''}`}>{children}</div>;
}
