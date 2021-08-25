import React from 'react';

export function AddGroup({ onAdd }) {
    return (
        <button
            className='p-2 btn-blank d-flex align-items-center justify-content-center text-light bg-secondary add-group rounded w-100'
            onClick={onAdd}
        >
            <i className='fas fa-plus'></i>
        </button>
    );
}
