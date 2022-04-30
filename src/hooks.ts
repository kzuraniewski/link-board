import React, { useEffect, useRef } from 'react';

// useEffect but does not trigger on mount
export const useUpdateEffect = (
	effect: React.EffectCallback,
	deps: React.DependencyList | undefined
) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) return effect();
		else didMount.current = true;
	}, deps);
};
