import { signOut, getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import './../styles/dropDown.css';
import { themeContext } from './Home';
import hamburgerIcon from './hamburger.png';

function DropDown ({ renderSignIn, docId }) {
	const { darkTheme, toggleTheme } = useContext(themeContext);
	const ref = useRef();
	const [ hamburgerOpen, setHamburgerOpen ] = useState(false);

	const hamburger = () => setHamburgerOpen((currentState) => !currentState);

	useEffect(
		() => {
			const checkIfClickedOutside = (e) => {
				// if the menu is open and the clicked target is not within the menu,
				// then close the menu
				if (hamburgerOpen && ref.current && !ref.current.contains(e.target)) {
					setHamburgerOpen(false);
				}
			};

			document.addEventListener('mousedown', checkIfClickedOutside);

			return () => {
				// cleanup the event listner
				document.removeEventListener('mousedown', checkIfClickedOutside);
			};
		},
		[ hamburgerOpen ]
	);

	const signOutMethod = () => {
		const auth = getAuth();

		signOut(auth)
			.then(() => {
				// when user logs out we wanna render back <signIn />
				renderSignIn(null);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const changeTheme = () => {
		toggleTheme();
		setHamburgerOpen(false);
	}

	const changeUserName = async () => {
		const docRef = doc(db, 'users', docId);

		await updateDoc(docRef, { todoUserName: '' });

		setHamburgerOpen(false);
	};

	return (
		<div className='dropdown-container'>
			<div ref={ref} className='hamburger-container'>
				<img src={hamburgerIcon} className='hamburgerImg' onClick={hamburger} />

				{hamburgerOpen && (
					<div className='menu'>
						<div onClick={signOutMethod}>Log out 👋</div>
						<div onClick={changeTheme}>
							{darkTheme ? 'Make it Light 🌤️' : 'Make it Dark 🌑'}
						</div>
						<div onClick={changeUserName}>Change Name 📛</div>
						<div>
							<a href='https://www.instagram.com/dhruv.g._/' target='_blank'>
								Developer 😎
							</a>
						</div>
						<div>
							<a href='https://docs.google.com/uc?export=download&id=12mP-pHZuOJQFeWcUgTKDvyiDIS8wti-R' target='_blank'>
								Android App 📱
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
// dark theme, changeUserName

export default DropDown;
