import React from 'react';

export function AddTileBtn({ show, onClick }) {
    return (
        <button
            className={`board-group__btn-add${show ? '' : ' board-group__btn-add--hidden'}`}
            onClick={e => {
                if (show) {
                    e.stopPropagation();
                    onClick();
                }
            }}
        >
            <i className='far fa-plus-square'></i>
        </button>
    );
}
