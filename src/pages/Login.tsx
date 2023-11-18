import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
//import { useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = async (e: FormEvent) => {
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

	return (
		<Container
			style={{
				maxWidth: '600px',
			}}
			className="Login my-4"
		>
			<h1>Log In</h1>
			<Card className="Login">
				<Card.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label>email</Form.Label>
							<Form.Control
								type="email"
								onChange={e => setEmail(e.target.value)}
								value={email}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formPassword">
							<Form.Label>password</Form.Label>
							<Form.Control
								type="password"
								onChange={e => setPassword(e.target.value)}
								value={password}
							/>
						</Form.Group>

						<Button variant="outline-primary" type="submit">
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}
