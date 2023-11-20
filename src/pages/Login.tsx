import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import OAuth from '../components/OAuth';
import { useState, FormEvent } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			return Swal.fire({
				icon: 'error',
				title: 'Error!',
				text: 'All fields are required.',
				showConfirmButton: true,
			});
		}

		try {
			await signInWithEmailAndPassword(auth, email, password);
			Swal.fire({
				timer: 1500,
				showConfirmButton: false,
				willOpen: () => {
					Swal.showLoading();
				},
				willClose: () => {
					Swal.fire({
						icon: 'success',
						title: 'Successfully logged in!',
						showConfirmButton: false,
						timer: 1500,
					});
				},
			});
			navigate('/');
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				Swal.fire({
					timer: 1500,
					showConfirmButton: false,
					willOpen: () => {
						Swal.showLoading();
					},
					willClose: () => {
						Swal.fire({
							icon: 'error',
							title: 'Error!',
							text: 'Incorrect email or password.',
							showConfirmButton: true,
						});
					},
				});
			} else {
				console.error('An unexpected error occurred during log in.');
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

						<div className="d-inline-flex gap-2 mb-5 align-items-center">
							<Button variant="outline-primary" type="submit">
								Submit
							</Button>
							<OAuth />
						</div>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}
