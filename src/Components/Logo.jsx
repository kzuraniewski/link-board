import React from 'react';

export default function Logo({ small = false }) {
    return (
        <>
            {small ? (
                <>
                    <span className='text-primary logo-link'>L</span>
                    <span className='text-dark'>B</span>
                </>
            ) : (
                <>
                    <span className='text-dark'>
                        <span className='text-primary logo-link'>Link</span>
                        <span className='text-dark'>Board</span>
                    </span>
                </>
            )}
        </>
    );
}
