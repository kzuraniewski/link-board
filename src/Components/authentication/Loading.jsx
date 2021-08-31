import React from 'react';

export default function Loading({ centered = false }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%);',
    };

    return (
        // @ts-ignore
        <div className={`loadingio-spinner-spin-rwso9u3vig`} style={centered ? style : {}}>
            <div className='ldio-a5jewfb2ixi'>
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
