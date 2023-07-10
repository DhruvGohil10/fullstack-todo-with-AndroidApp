import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';
import { Firestore } from 'firebase/firestore';
import './../styles/addTodo.css'

function AddTodo ({user}) {
   const [ input, setInput ] = useState('');

	const inputChange = (event) => setInput(event.target.value);

	// adds todo
	const submit = async (event) => {
		event.preventDefault();

		if(!input == ''){
			const docRef = await addDoc(collection(db, 'todos'), {
				todo: input,
				uid: user.uid,
				completed: false,
				todoId: '',
				Timestamp: serverTimestamp()
			});
		}

		setInput('');
	};

	return (
		<form onSubmit={submit} className='form'>
			<input
				type='text'
				placeholder='Task'
				value={input}
				onChange={inputChange}
				className='input'
			/>
			<input type='submit' value='Add Todo' className='add-todo-btn' />
		</form>
	);
}

export default AddTodo;