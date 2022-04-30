import React from 'react';

export default function Loading({ centered = false }) {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	};

	return (
		<div
			className={`loadingio-spinner-spin-rwso9u3vig`}
			// @ts-ignore
			style={centered ? style : {}}
		>
			<div className="ldio-a5jewfb2ixi">
				<div>
					<div></div>
				</div>
				<div>
					<div></div>
				</div>
				<div>
					<div></div>
				</div>
				<div>
					<div></div>
				</div>
				<div>
					<div></div>
				</div>
				<div>
					<div></div>
				</div>
				<div>
					<div></div>
				</div>
				<div>
					<div></div>
				</div>
			</div>
		</div>
	);
}
