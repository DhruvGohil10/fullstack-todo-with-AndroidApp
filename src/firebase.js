// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBqF8iVI4bqnG_OdTk3rzhKQQE7zCPg8_I',
	authDomain: 'todo-eb7ef.firebaseapp.com',
	projectId: 'todo-eb7ef',
	storageBucket: 'todo-eb7ef.appspot.com',
	messagingSenderId: '485330444742',
	appId: '1:485330444742:web:3478e145cd2ca7203152c7',
	measurementId: 'G-74Z8JZHN50'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// cloud firestore
export const db = getFirestore(app);

export const signInWithGoogle = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			// after user signs in
		})
		.catch((error) => {
			console.log(error);
		});
};
