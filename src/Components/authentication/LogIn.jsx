import React from 'react';
import Button from '../Button';
import { signIn } from '../../firebase';

export default function LogIn() {
	return <Button onClick={signIn}>Sign in</Button>;
}
