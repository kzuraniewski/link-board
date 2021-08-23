import { MDBCard, MDBCardImage, MDBCardOverlay, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import placeholder from '../images/placeholder.jpeg';

export default function Tile({ title, link, size }) {
    // return (
    //     <MDBCard background='dark' className='text-white'>
    //         <MDBCardImage overlay src={placeholder} alt='Tile preview' />
    //         <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>

    //         <MDBCardOverlay className='d-flex flex-column justify-content-end'>
    //             <MDBCardTitle>{title}</MDBCardTitle>
    //             <MDBCardText>{link}</MDBCardText>
    //         </MDBCardOverlay>
    //     </MDBCard>
    // );
    const style = {
        backgroundImage: `url(${placeholder})`,
        backgroundSize: 'cover',
    };

    return (
        <MDBCard className='text-white' style={style}>
            {/* <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div> */}
            <div className='mask bg-dark bg-gradient' style={{ opacity: 0.6 }}></div>

            <div style={{ zIndex: 2 }}>
                <MDBCardTitle>{title}</MDBCardTitle>
                <MDBCardText>{link}</MDBCardText>
            </div>
        </MDBCard>
    );
}
