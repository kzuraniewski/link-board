import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import Logo from './Logo';
import badBookmarks from '../images/bad-bookmarks.png';
import goodBookmarks from '../images/good-bookmarks.png';

export default function GetStarted() {
    return (
        <>
            <article className='p-5'>
                <MDBRow>
                    <MDBCol
                        size='md'
                        className='d-flex flex-column justify-content-center align-items-stretch'
                    >
                        <h1 className='text-dark'>
                            Too many bookmarks? <Logo /> is for you!
                        </h1>
                        <p>
                            Clean up your bookmarks bar by moving them to <Logo small />.
                        </p>
                    </MDBCol>
                    <MDBCol size='md' className='d-flex flex-column align-items-center justify-content-center'>
                        <img src={badBookmarks} alt='Bad bookmarks' className='img-fluid' />
                        <h3>
                            <i className='fas fa-long-arrow-alt-down mt-3 mb-3'></i>
                        </h3>
                        <img src={goodBookmarks} alt='Good bookmarks' className='img-fluid' />
                    </MDBCol>
                </MDBRow>
            </article>
            <article className='p-5'>
                <MDBRow className='bg-light'>
                    <MDBCol size='md' className='d-flex flex-column align-items-center'>
                        <img src='asd' alt='Board preview' />
                    </MDBCol>
                    <MDBCol
                        size='md'
                        className='d-flex flex-column justify-content-center align-items-stretch'
                    >
                        <h1 className='text-dark'>Store your links in one place</h1>
                        <p>Manage your board by adding and grouping tiles.</p>
                    </MDBCol>
                </MDBRow>
            </article>
        </>
    );
}
