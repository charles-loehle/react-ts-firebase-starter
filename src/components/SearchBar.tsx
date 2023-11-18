import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SearchBar() {
	const [term, setTerm] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		navigate(`/search?q=${term}`);
	};

	return (
		<div className="searchbar">
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col xs="auto">
						<Form.Control
							type="text"
							placeholder="Search"
							className=" mr-sm-2"
							onChange={e => setTerm(e.target.value)}
						/>
					</Col>
				</Row>
			</Form>
		</div>
	);
}
