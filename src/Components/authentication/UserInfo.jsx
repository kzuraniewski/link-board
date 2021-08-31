import React, { useEffect } from 'react';
import {
    MDBDropdownItem,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdown,
    MDBDropdownHeader,
    MDBDropdownLink,
} from 'mdb-react-ui-kit';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LogIn from '../authentication/LogIn';

export default function UserInfo() {
    const [user] = useAuthState(auth);

    useEffect(() => console.log(user));

    if (!user) return <LogIn />;

    return (
        <MDBDropdown className='user-info'>
            <MDBDropdownToggle tag='a' className='user-info__toggle'>
                {/* <i className='fas fa-user-circle'></i> */}
                <img className='user-info__photo' src={user.photoURL} alt='user photo' />
            </MDBDropdownToggle>
            <MDBDropdownMenu className='user-info__dropdown'>
                <MDBDropdownItem>
                    <MDBDropdownHeader>{user.displayName}</MDBDropdownHeader>
                </MDBDropdownItem>
                <MDBDropdownItem>
                    <MDBDropdownLink>Log out</MDBDropdownLink>
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
}
