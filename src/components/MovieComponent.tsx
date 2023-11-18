import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Trash } from 'react-bootstrap-icons';

import { Link } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

type Movie = {
	title: string;
	receivedAnOscar: boolean;
	releaseDate: number;
	id: string;
};

type MovieListProps = {
	movie: Movie[];
};

const handleDelete = async (id: string) => {
	console.log('delete movie id: ' + id);
	const movie = doc(db, 'movies', id);
	await deleteDoc(movie);
	console.log(id + ' deleted!');
};

export default function MovieComponent({ movie }: MovieListProps) {
	return (
		<Col key={movie.id} sm={6} lg={4} className={`movie-card-container mb-3`}>
			<Card className="Movie">
				<Card.Body>
					<Card.Title>{movie.title}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						{movie.releaseDate}
					</Card.Subtitle>
					<Card.Text>Oscar: {movie.receivedAnOscar ? 'yes' : 'no'}</Card.Text>

					<Card.Link as={Link} to={`/movies/${movie.id}`}>
						Edit
					</Card.Link>

					<Trash
						onClick={() => handleDelete(movie.id)}
						className="ms-2"
						color="red"
						cursor="pointer"
					/>
				</Card.Body>
			</Card>
		</Col>
	);
}
