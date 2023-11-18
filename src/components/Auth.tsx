import { auth, googleProvider } from '../firebase/config';
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	console.log(auth?.currentUser);

	const signUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unexpected error occurred during sign up.');
			}
		}
	};

	const signIn = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unexpected error occurred during sign up.');
			}
		}
	};

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.error(error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="Auth">
			<input
				type="email"
				placeholder="Email"
				onChange={e => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				onChange={e => setPassword(e.target.value)}
			/>
			<button onClick={signUp} className="btn btn-primary">
				Sign Up
			</button>
			<button onClick={signIn} className="btn btn-primary">
				Sign In With Email and Password
			</button>
			<button onClick={signInWithGoogle} className="btn btn-primary">
				Sign In with Google
			</button>
			<button onClick={logout} className="btn btn-primary">
				Logout
			</button>
		</div>
	);
}
