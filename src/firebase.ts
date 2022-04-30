import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDqr9o4MaHyxPPwsAl2TRwKbua7cnIIO9M',
	authDomain: 'linkboard-6f81c.firebaseapp.com',
	projectId: 'linkboard-6f81c',
	storageBucket: 'linkboard-6f81c.appspot.com',
	messagingSenderId: '624060620235',
	appId: '1:624060620235:web:e552a3f9f20610f3e3aa4e',
	measurementId: 'G-XV093TGGR6',
	databaseURL: 'https://LinkBoard.europe-central2.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const database = firebase.firestore();
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

let expectSignIn = () => localStorage.getItem('expectSignIn') === 'true';

// Expect sign in on reload
auth.onAuthStateChanged(user => {
	if (user) {
		localStorage.setItem('expectSignIn', 'true');
	} else {
		localStorage.removeItem('expectSignIn');
	}
});

const signIn = () => {
	signInWithPopup(auth, provider);
	// .then(result => {
	// 	// This gives you a Google Access Token. You can use it to access the Google API.
	// 	const credential = GoogleAuthProvider.credentialFromResult(result);
	// 	const token = credential.accessToken;
	// 	// The signed-in user info.
	// 	const user = result.user;
	// })
	// .catch(error => {
	// 	// Handle Errors here.
	// 	const errorCode = error.code;
	// 	const errorMessage = error.message;
	// 	// The email of the user's account used.
	// 	const email = error.email;
	// 	// The AuthCredential type that was used.
	// 	const credential = GoogleAuthProvider.credentialFromError(error);
	// });
};

const handleSignOut = () => {
	signOut(auth).catch(error => {
		console.log(error);
	});
};

// Get a reference to the database service
const database = getFirestore(app);

export { auth, database, signIn, expectSignIn, handleSignOut };
export default database;
