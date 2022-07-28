import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './../styles/todoUserNameInput.css';

function TodoUserNameInput ({ docId }) {
	const [ input, setInput ] = useState('');

	const inputChange = (event) => setInput(event.target.value);

	const submit = async (event) => {
		event.preventDefault();

		const docRef = doc(db, 'users', docId);

		await updateDoc(docRef, { todoUserName: input });

		setInput('');
	};

	return (
		<div className='user-name-box'>
			<form onSubmit={submit}>
				<p className='only-visible-to-you'>This will be only visible to you ^_^</p>
				<div>
					<input
						type='text'
						placeholder='Your Display Name'
						value={input}
						onChange={inputChange}
						className='user-name-input'
					/>
					<input type='submit' value='Add Your Name' className='user-name-submit' />
				</div>
			</form>
		</div>
	);
}

export default TodoUserNameInput;
