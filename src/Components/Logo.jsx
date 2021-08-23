import React from 'react';

export default function Logo({ small = false }) {
    return (
        <>
            {small ? (
                <>
                    <span className='text-primary'>B</span>
                    <span className='text-info'>B</span>
                </>
            ) : (
                <>
                    <span className='text-dark'>
                        <span className='text-primary'>B</span>
                        <span className='text-info'>Board</span>
                    </span>
                </>
            )}
        </>
    );
}
