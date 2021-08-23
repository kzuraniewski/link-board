import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import Logo from './Logo';
// import badBookmarks from '../images/bad-bookmarks.png';
// import goodBookmarks from '../images/good-bookmarks.png';

export default function Intro() {
    return (
        <>
            <MDBContainer className='p-5 mt-5'>
                <MDBRow className='flex-wrap-reverse'>
                    <MDBCol size='md' className='d-flex flex-column justify-content-center'>
                        <h1 className='text-dark'>
                            Too many bookmarks? <Logo /> is for you!
                        </h1>
                        <p>
                            Clean up your bookmarks bar by moving them to <Logo small />.
                        </p>
                        {/* <a href="#/getstarted" className="btn btn-primary">Get started</a> */}
                        <MDBBtn href='#/getstarted' className='mt-3 ms-0 me-auto'>
                            Get started
                        </MDBBtn>
                    </MDBCol>
                    <MDBCol
                        size='md'
                        className='d-flex flex-column align-items-center justify-content-center'
                    >
                        <img src={'badBookmarks'} alt='Bad bookmarks' className='img-fluid' />
                        <h3>
                            <i className='fas fa-long-arrow-alt-down mt-3 mb-3'></i>
                        </h3>
                        <img src={'goodBookmarks'} alt='Good bookmarks' className='img-fluid' />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <div className='p-5  bg-primary text-light'>
                <MDBContainer>
                    <MDBRow className='text-light'>
                        <MDBCol size='md' className='d-flex flex-column justify-content-center'>
                            <img src='asd' alt='Board preview' className='img-fluid' />
                        </MDBCol>
                        <MDBCol
                            size='md'
                            className='d-flex flex-column justify-content-center align-items-stretch'
                        >
                            <h1 className='text-light'>Store your links in one place</h1>
                            <p>Gain access to your bookmarks from any browser or device.</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </>
    );
}
