import React from 'react';

export default function Button({ block = false, onClick, className = null, children }) {
	return (
		<button
			className={`button ${block ? ' block' : ''}${className ? '' + className : ''}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
