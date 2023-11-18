import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, FormEvent } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

type Movie = {
	title: string;
	receivedAnOscar: boolean;
	releaseDate: number;
	id: string;
};

export default function Movie() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [title, setTitle] = useState<string>('');
	const [receivedAnOscar, setReceivedAnOscartOscar] = useState<boolean>(false);
	const [releaseDate, setReleaseDate] = useState<number | undefined>(0);
	const [isPending, setIsPending] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	// GET - show - show one item by id
	useEffect(() => {
		setIsPending(true);
		if (id) {
			const unsub = onSnapshot(doc(db, 'movies', id), doc => {
				try {
					setIsPending(false);
					const movieData = doc.data();

					setIsPending(false);

					// Set individual state values so we can populate the form
					setTitle(movieData?.title);
					setReceivedAnOscartOscar(movieData?.receivedAnOscar);
					setReleaseDate(movieData?.releaseDate);
				} catch (error) {
					setIsPending(false);
					setError('Could not find movie');
				}
			});
			return () => unsub();
		} else {
			setError('id is undefined');
		}
	}, [id]);

	// PUT - update - update movie
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!title || typeof receivedAnOscar !== 'boolean' || !releaseDate) {
			alert('All fields are required');
		}

		const movie = {
			id,
			title,
			receivedAnOscar,
			releaseDate,
		};

		try {
			if (id) {
				const movieRef = doc(db, 'movies', id);
				await updateDoc(movieRef, {
					...movie,
				});
			}
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	// GET - edit - show edit form of one item
	return (
		<Container
			style={{
				maxWidth: '600px',
			}}
			className="my-4 FormContainer"
		>
			<h1>Edit Movie</h1>
			{error && <p className="danger">{error}</p>}
			{isPending && <p className="loading">Loading...</p>}

			<Card className="Movie">
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

						<Form.Group className="mb-3" controlId="formReceivedAnOscar">
							<Form.Check
								type="checkbox"
								onChange={e => setReceivedAnOscartOscar(e.target.checked)}
								id="checkbox"
								label="Got an Oscar?"
								checked={receivedAnOscar}
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
