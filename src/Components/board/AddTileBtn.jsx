import React from 'react';

export function AddTileBtn({ onClick }) {
    return (
        <button
            className={`board-group__btn-add`}
            onClick={onClick}
        >
            <i className='far fa-plus-square'></i>
        </button>
    );
}
