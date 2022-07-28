import {
	collection,
	onSnapshot,
	query,
	where,
	deleteDoc,
	doc,
	updateDoc
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import './../styles/todos.css';
import deleteIcon from './delete.png';
import { themeContext } from './Home';

function Todos ({ user }) {
	const { darkTheme } = useContext(themeContext);
	let [ todos, setTodos ] = useState([]);

	useEffect(() => {
		const uid = user.uid;
		const q = query(collection(db, 'todos'), where('uid', '==', uid));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			let parssedTodos = [];

			snapshot.forEach((doc) => {
				let obj = {
					todo: doc.data().todo,
					completed: doc.data().completed,
					todoId: doc.id
				};

				parssedTodos.push(obj);
			});

			setTodos(parssedTodos);
		});

		return () => unsubscribe();
	}, []);

	const toggleCheckbox = async (todoId, completed) => {
		const docRef = doc(db, 'todos', todoId);

		await updateDoc(docRef, { completed: !completed });
	};

	// let renderTodos2 = todos.map((t, index) => {
	// 	return (
	// 		<div className='todo' key={index}>
	// 			<input
	// 				type='checkbox'
	// 				id={index}
	// 				checked={t.completed}
	// 				onClick={() => toggleCheckbox(t.todoId, t.completed)}
	// 				readOnly
	// 			/>
	// 			<label htmlFor={index}>
	// 				<span className={darkTheme ? 'span-dark' : ''} />
	// 				{t.todo}
	// 			</label>
	// 			<div
	// 				className='deleteIconContainer'
	// 				onClick={() => {
	// 					deleteDoc(doc(db, 'todos', t.todoId));
	// 				}}
	// 			>
	// 				<img className='deleteIcon' src={deleteIcon} alt='todo delete buttons' />
	// 			</div>
	// 		</div>
	// 	);
	// });

	let renderTodos = todos.map((t, index) => {
		return (
			<span className='input-group' key={index}>
				<div>
					<input
						name='checkboxes'
						type='checkbox'
						id={index}
						checked={t.checked}
						onClick={() => toggleCheckbox(t.todoId, t.completed)}
						readOnly
					/>
					<label htmlFor={index}>{t.todo}</label>
				</div>
				<div
					className='deleteIconContainer'
					onClick={() => {
						deleteDoc(doc(db, 'todos', t.todoId));
					}}
				>
					<img className={darkTheme ? 'deleteIcon deleteIcon-dark' : 'deleteIcon'} src={deleteIcon} alt='todo delete buttons' />
				</div>
			</span>
		);
	});

	return <div className='container'>{renderTodos}</div>;
}

export default Todos;
