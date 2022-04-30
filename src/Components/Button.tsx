import React from 'react';

export interface ButtonProps {
	block?: boolean;
	onClick: React.MouseEventHandler;
	className?: string | null;
	children: React.ReactNode;
}

export default function Button({
	block = false,
	onClick,
	className = null,
	children,
}: ButtonProps) {
	return (
		<button
			className={`button ${block ? ' block' : ''}${className ? '' + className : ''}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
