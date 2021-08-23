import React from 'react';
import Tile from './Tile';

export default function Board() {
    return (
        <div className='bg-dark-50'>
            <Tile size='s' title='Lorem ipsum' link='https://google.com' />
        </div>
    );
}
