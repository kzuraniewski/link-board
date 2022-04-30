import React from 'react';

export interface CollapseArrowProps {
	show: boolean;
}

export function CollapseArrow({ show }: CollapseArrowProps) {
	return (
		<i
			className={`fas fa-sort-down board-group__arrow${
				show ? '' : ' board-group__arrow--hidden'
			}`}
		></i>
	);
}
