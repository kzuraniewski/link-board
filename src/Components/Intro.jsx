import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import Logo from './Logo';
// import badBookmarks from '../images/bad-bookmarks.png';
// import goodBookmarks from '../images/good-bookmarks.png';

export default function Intro() {
    return (
        <article className='article'>
            <div className='article__group'>
                <MDBContainer>
                    <MDBRow className='article__row'>
                        <MDBCol size='md' className='article__content-container'>
                            <h1 className='article__big'>
                                Too many bookmarks? <Logo /> is for you!
                            </h1>
                            <p>
                                Clean up your bookmarks bar by moving them to <Logo small />.
                            </p>

                            <div className='btn-container'>
                                <MDBBtn href='#/getstarted' className='article__cta'>
                                    Get started
                                </MDBBtn>
                                <MDBBtn
                                    href='#/board'
                                    className='article__cta article__cta--alt'
                                >
                                    Your board
                                </MDBBtn>
                            </div>
                        </MDBCol>
                        <MDBCol
                            size='md'
                            className='article__content-container article__content-container--center'
                        >
                            <img
                                src={'badBookmarks'}
                                alt='Bad bookmarks'
                                className='article__image'
                            />

                            <i className='fas fa-long-arrow-alt-down article__arrow'></i>

                            <img
                                src={'goodBookmarks'}
                                alt='Good bookmarks'
                                className='article__image'
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>

            <div className='article__group'>
                <MDBContainer>
                    <MDBRow className='article__row'>
                        <MDBCol
                            size='md'
                            className='article__content-container article__content-container--center'
                        >
                            <img src='asd' alt='Board preview' className='article__image' />
                        </MDBCol>

                        <MDBCol size='md' className='article__content-container'>
                            <h1 className='article__big'>Store your links in one place</h1>
                            <p>Gain access to your bookmarks from any browser or device.</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </article>
    );
}
