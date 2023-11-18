import { useState, FormEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Create() {
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>('');
	const [oscar, setOscar] = useState<boolean>(false);
	const [releaseDate, setReleaseDate] = useState<number | undefined>(0);
	const [isPending, setIsPending] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	// POST - store - create new item
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			//console.log('Submitted');
			await addDoc(collection(db, 'movies'), {
				title: title,
				releaseDate: releaseDate,
				receivedAnOscar: oscar,
			});
			navigate('/');
		} catch (error) {
			if (error instanceof Error) {
				setIsPending(false);
				setError('Could not find movie');
				console.error(error.message);
			} else {
				console.error('An unexpected error occurred.');
			}
		}
	};

	// GET - new - show the create form
	return (
		<Container
			style={{
				maxWidth: '600px',
			}}
			className="my-4 FormContainer"
		>
			<h1>Create Movie</h1>
			{error && <p className="danger">{error}</p>}
			{isPending && <p className="loading">Loading...</p>}
			<Card className="CreateMovie">
				<Card.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formTitle">
							<Form.Label>Movie Title:</Form.Label>
							<Form.Control
								type="text"
								onChange={e => setTitle(e.target.value)}
								value={title}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formReleaseDate">
							<Form.Label>Release Date:</Form.Label>
							<Form.Control
								type="number"
								onChange={e => setReleaseDate(Number(e.target.value))}
								value={releaseDate}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formOscar">
							<Form.Check // prettier-ignore
								type="checkbox"
								onChange={e => setOscar(e.target.checked)}
								id="checkbox"
								label="Got an oscar?"
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>
						<Link to="/" className="ms-4">
							Go back
						</Link>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}
