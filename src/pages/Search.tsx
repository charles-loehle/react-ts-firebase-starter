import { useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function Search() {
	const queryString = useLocation().search;
	const queryParams = new URLSearchParams(queryString);
	const query = queryParams.get('q');

	return (
		<Container className="search-page mt-4">
			<Row>
				<Col className="mb-3 d-flex flex-column align-content-center">
					<h2>Recipes Search Page</h2>
				</Col>
			</Row>
		</Container>
	);
}
