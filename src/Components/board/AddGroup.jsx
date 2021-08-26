import { MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';

export function AddGroup({ onAdd }) {
    return (
        <MDBBtn
            className='add-group'
            size='sm'
            block
            outline
            onClick={onAdd}
        >
            <i className='fas fa-plus'></i>
        </MDBBtn>
    );
}
