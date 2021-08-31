import React, { useEffect } from 'react';
import {
    MDBDropdownItem,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdown,
    MDBDropdownHeader,
    MDBDropdownLink,
} from 'mdb-react-ui-kit';
import { auth, expectSignIn } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LogIn from '../authentication/LogIn';
import Loading from '../authentication/Loading';

export default function UserInfo() {
    const [user] = useAuthState(auth);

    if (!user) {
        if (expectSignIn()) return <Loading />;
        else return <LogIn />;
    }

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
