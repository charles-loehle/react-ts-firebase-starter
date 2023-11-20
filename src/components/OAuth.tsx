import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function OAuth() {
	const navigate = useNavigate();

	const signInWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();

			await signInWithPopup(auth, provider);
			navigate('/');
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		}
	};

	return (
		<>
			<a href="#" onClick={signInWithGoogle} className="text-primary">
				Sign In With Google Instead
			</a>
		</>
	);
}
