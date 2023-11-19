import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Trash } from 'react-bootstrap-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

type Movie = {
	title: string;
	receivedAnOscar: boolean;
	releaseDate: number;
	id: string;
};

type MovieListProps = {
	movies: Movie[];
};

// DELETE - destroy - delete an item by id
const handleDelete = (id: string) => {
	Swal.fire({
		icon: 'warning',
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'No, cancel!',
	}).then(result => {
		if (result.isConfirmed) {
			const movie = doc(db, 'movies', id);
			deleteDoc(movie);

			Swal.fire({
				icon: 'success',
				title: 'Deleted!',
				text: 'Data has been deleted.',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	});
};

// GET - index - show all items
export default function MovieList({ movies }: MovieListProps) {
	return (
		<>
			{movies.map(movie => (
				<Col
					key={movie.id}
					sm={6}
					lg={4}
					className={`movie-card-container mb-3`}
				>
					<Card className="Movie">
						<Card.Body>
							<Card.Title>{movie.title}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{movie.releaseDate}
							</Card.Subtitle>
							<Card.Text>
								Oscar: {movie.receivedAnOscar ? 'yes' : 'no'}
							</Card.Text>

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
			))}
		</>
	);
}
