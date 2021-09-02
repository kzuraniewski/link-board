import React from 'react';

export function EditBtn({ show, onClick }) {
    return (
        <div className={`edit${!show ? ' edit--hide' : ''}`}>
            <button className={`edit__btn`} disabled={!show} onClick={onClick}>
                <i className='fas fa-cog'></i>
            </button>
        </div>
    );
}
