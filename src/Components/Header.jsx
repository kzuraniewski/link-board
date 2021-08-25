import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import Logo from './Logo';

export default function Header() {
    const [showBasic, setShowBasic] = useState(false);

    return (
        <MDBNavbar expand='lg' dark className='header'>
            <MDBContainer className='header__navbar-container'>
                <MDBNavbarBrand href='#'>
                    <Logo />
                </MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='header__nav'>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#/board' onClick={() => setShowBasic(false)}>
                                Your board
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink href='#/getstarted' onClick={() => setShowBasic(false)}>
                                Get started
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink href='#/info' onClick={() => setShowBasic(false)}>
                                About
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}
