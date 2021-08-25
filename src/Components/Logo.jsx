import React from 'react';

export default function Logo({ small = false }) {
    return (
        <>
            {small ? (
                <>
                    <span className='text-white logo-link'>L</span>
                    <span className='text-dark'>B</span>
                </>
            ) : (
                <>
                    <span className='text-light'>
                        <span className='text-white logo-link'>Link</span>
                        Board
                    </span>
                </>
            )}
        </>
    );
}
