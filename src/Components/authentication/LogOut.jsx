import React from 'react';
import { auth } from '../../firebase';

export default function LogOut() {
    return auth.currentUser && <button onClick={() => auth.signOut()}>Sign out</button>;
}
