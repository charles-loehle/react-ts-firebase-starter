import MovieList from '../components/MovieList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query } from 'firebase/firestore';

type Movie = {
	id: string;
	title: string;
	receivedAnOscar: boolean;
	releaseDate: number;
};

export default function Home() {
	const [movieList, setMovieList] = useState<Movie[]>([]);

	// With snapshot - refer to React/ReactAndFirebase/CodeCommerce/react-ts-firebase-todo-app
	// FB Docs - https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection
	useEffect(() => {
		const q = query(collection(db, 'movies'));
		const unsub = onSnapshot(q, querySnapshot => {
			const moviesArr: Movie[] = [];
			querySnapshot.forEach(doc =>
				moviesArr.push({ ...doc.data(), id: doc.id } as Movie)
			);
			setMovieList(moviesArr);
		});
		return () => unsub();
	}, []);

	return (
		<Container className="home mt-4">
			<h1>Movie List</h1>
			<Row className="movie-list">
				<MovieList movies={movieList} />
			</Row>
		</Container>
	);
}
