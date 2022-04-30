import React from 'react';

export interface LogoProps {
	/**
	 * Whether to use the smaller version of logo
	 */
	small?: boolean;
}

export default function Logo({ small = false }) {
	return (
		<>
			{small ? (
				<>
					<span className="logo logo--link">L</span>
					<span className="logo">B</span>
				</>
			) : (
				<>
					<span className="logo logo--link">Link</span>
					<span className="logo">Board</span>
				</>
			)}
		</>
	);
}
