import { createContext, useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
//components
import Profile from './Profile';
import AddTodo from './AddTodo';
import Todos from './Todos';
import DropDown from './DropDown';
import './../styles/home.css';

let themeContext = createContext();

function Home ({ renderSignIn, user, docId }) {
	let colors = ['#fadaff', '#bde0fe', '#93f5eb', '#fdffb6', '#ffd6a5', '#ffadad', '#a0c4ff', '#f2ceff'];
	let [ darkTheme, setDarkTheme ] = useState(false);
	let [backgroundColor, setBackgroundColor] = useState('');

	let toggleTheme = async () => {
		let docRef = doc(db, 'users', docId);

		await updateDoc(docRef, { darkTheme: !darkTheme });
	};

	useEffect(() => {
		const unsubscribe = onSnapshot(doc(db, 'users', docId), (doc) => {
			setDarkTheme(doc.data().darkTheme);
		});

		return () => unsubscribe();
	}, []);

	 // chosses a random color for background 
	useEffect(() => {
		var randomColor = colors[Math.floor(Math.random()*colors.length)];
		setBackgroundColor(randomColor)
	}, [])


	return (
		<div
			className={darkTheme ? 'homeBackground homeBackground-dark' : 'homeBackground'}
			// style={{ backgroundColor: backgroundColor }}
			style={darkTheme ? {} : { backgroundColor: backgroundColor }}
		>
			<div className={darkTheme ? 'card card-dark' : 'card'}>
				<themeContext.Provider value={{ darkTheme, toggleTheme }}>
					<div className='homeContainer'>
						<div className='top-section'>
							<DropDown renderSignIn={renderSignIn} docId={docId} />
							<Profile docId={docId} />
						</div>
						<AddTodo user={user} />
					</div>
					<Todos user={user} />
				</themeContext.Provider>
			</div>
		</div>
	);
}

export { Home, themeContext };
