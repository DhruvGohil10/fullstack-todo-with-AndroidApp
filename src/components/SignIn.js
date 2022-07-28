import { signInWithGoogle } from '../firebase';
import './../styles/signIn.css';

function SignIn () {
	return (
		<div className='signInContainer'>
			<div className='box'>
				<h1 className='h1'>Simple Todo List</h1>
				<button onClick={signInWithGoogle} className='button-8'>
					Sign in with Google
				</button>
			</div>
		</div>
	);
}

export default SignIn;
