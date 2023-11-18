import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, FormEvent } from 'react';

export default function SignUp() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [displayName, setDisplayName] = useState<string>('');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
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

						<Form.Group className="mb-3" controlId="formDisplayName">
							<Form.Label>display name</Form.Label>
							<Form.Control
								type="text"
								onChange={e => setDisplayName(e.target.value)}
								value={displayName}
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
