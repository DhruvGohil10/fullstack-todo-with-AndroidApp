import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import TodoUserNameInput from './TodoUserNameInput';
import './../styles/profile.css';

function Profile ({ docId }) {
	const [ todoUserName, setTodoUserName ] = useState('');
	const [ isTodoUserName, setIsTodoUserName ] = useState(false);
	// const [docId, setDocId] = useState('');

	// useEffect(() => {
	// 	const uid = user.uid;
	// 	const q = query(collection(db, 'users'), where('uid', '==', uid));

	// 	const unsubscribe = onSnapshot(q, (snapshot) => {
	// 		snapshot.forEach((doc) => {
	// 			let checkTodoUserName = doc.data().todoUserName;

	// 			setDocId(doc.id);
	// 			setTodoUserName(checkTodoUserName);

	// 			if (!checkTodoUserName == '') {
	// 				setIsTodoUserName(true);
	// 			}
	// 		});
	// 	});

	// 	return () => unsubscribe();
	// }, []);

	useEffect(() => {
		const unsubscribe = onSnapshot(doc(db, 'users', docId), (docSanpshot) => {
			let checkTodoUserName = docSanpshot.data().todoUserName;
			setTodoUserName(checkTodoUserName);

			if (!checkTodoUserName == '') {
				setIsTodoUserName(true);
			}

			if (checkTodoUserName == ''){
				setIsTodoUserName(false)
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<div>
			{isTodoUserName ? (
				<h1 className='todoUserName'>{todoUserName}</h1>
			) : (
				<TodoUserNameInput docId={docId} />
			)}
		</div>
	);
}

export default Profile;
