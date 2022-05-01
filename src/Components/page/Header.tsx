import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Logo from '../Logo';
import UserInfo from '../authentication/UserInfo';

export default function Header() {
	const [showBasic, setShowBasic] = useState(false);

	return (
		<Navbar expand="lg" bg="dark" variant="dark" className="header">
			<Container className="header__navbar-container">
				<Navbar.Brand href="#">
					<Logo />
				</Navbar.Brand>

				<Navbar.Toggle
					aria-controls="navbarSupportedContent"
					aria-expanded={showBasic}
					aria-label="Toggle navigation"
					onClick={() => setShowBasic(!showBasic)}
				>
					{/* <MDBIcon icon="bars" fas /> */}
					<i className="fas fa-bars" />
				</Navbar.Toggle>

				<Navbar.Collapse in={showBasic}>
					<Nav className="header__nav">
						<Nav.Link href="#/board" onClick={() => setShowBasic(false)}>
							Your board
						</Nav.Link>

						<Nav.Link href="#/info" onClick={() => setShowBasic(false)}>
							About
						</Nav.Link>
					</Nav>

					{/* user info */}
					<div className="flex-shrink-0">
						<UserInfo />
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
