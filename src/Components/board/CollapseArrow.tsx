import React from 'react';

export function CollapseArrow({ show }) {
	return (
		<i
			className={`fas fa-sort-down board-group__arrow${
				show ? '' : ' board-group__arrow--hidden'
			}`}
		></i>
	);
}
