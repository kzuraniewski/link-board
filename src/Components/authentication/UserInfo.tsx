import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { auth, expectSignIn } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LogIn from './LogIn';
import Loading from './Loading';
import { handleSignOut } from '../../firebase';

export default function UserInfo() {
	const [user] = useAuthState(auth);

	if (!user) {
		if (expectSignIn()) return <Loading />;
		else return <LogIn />;
	}

	return (
		<Dropdown className="user-info">
			<Dropdown.Toggle as="a" className="user-info__toggle">
				<img
					src={user.photoURL as string | undefined}
					alt="User photo"
					className="user-info__photo"
				/>
			</Dropdown.Toggle>
			<Dropdown.Menu className="user-info__dropdown">
				<Dropdown.Header>{user.displayName}</Dropdown.Header>
				<Dropdown.Item onClick={handleSignOut} className="user-info__link">
					Log out
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
