import React, { useState, useEffect, useContext } from 'react';
import './App.css';
//firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase';
// components
import {Home} from './components/Home';
import SignIn from './components/SignIn';

function App() {
	const [ user, setUser ] = useState(null);
	const [docId, setDocId] = useState('');


	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				const uid = user.uid;
				const q = query(collection(db, 'users'), where('uid', '==', uid));

				getDocs(q).then((querySnapshot) => {

					if (!querySnapshot.docs.length) { // if there's no doc, add it
						addDoc(collection(db, 'users'), {
							uid: uid,
							todoUserName: "",
							darkTheme: false,
							existingUserName: user.displayName,
							email: user.email,
							phoneNumber: user.phoneNumber,
							photoUrl: user.photoURL
						}).then((data) => {
							setDocId(data.id)
						})
					}

					querySnapshot.forEach((doc) => {
						setDocId(doc.id)
					})
				});
			}
		});
		return () => unsubscribe();
	}, []);

	const renderSignIn = value => setUser(value);

	return (
		<div className='App'>
			{!user ? <SignIn /> : (
				!docId == '' && <Home renderSignIn={renderSignIn} user={user} docId={docId} />
			)}
		</div>
	);
}

export default App;
