import React from 'react';

export function AddTileBtn({ show }) {
    return (
        <button
            className={`board-group__btn-add${show ? '' : ' board-group__btn-add--hidden'}`}
            onClick={e => {
                if (show)
                    e.stopPropagation();
            }}
        >
            <i className='far fa-plus-square'></i>
        </button>
    );
}
