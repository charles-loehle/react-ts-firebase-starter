import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, FormEvent } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SignUp() {
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
			await createUserWithEmailAndPassword(auth, email, password);
			Swal.fire({
				timer: 1500,
				showConfirmButton: false,
				willOpen: () => {
					Swal.showLoading();
				},
				willClose: () => {
					Swal.fire({
						icon: 'success',
						title: 'Successfully registered and logged in!',
						showConfirmButton: false,
						timer: 1500,
					});
				},
			});
			navigate('/');
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
				if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
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
								text: 'That email is already in use',
								showConfirmButton: true,
							});
						},
					});
				} else {
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
								text: 'An error occurred. Please try signing up again',
								showConfirmButton: true,
							});
						},
					});
				}
			}
		}
	};

	return (
		<Container
			style={{
				maxWidth: '600px',
			}}
			className="Signup my-4"
		>
			<h1>Sign Up</h1>
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
