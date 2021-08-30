import React from 'react';
import { signIn } from '../../firebase';

export default function LogIn() {
    return <button onClick={signIn}>Sign in</button>;
}
