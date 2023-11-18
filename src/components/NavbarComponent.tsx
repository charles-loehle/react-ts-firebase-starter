import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from './SearchBar';
import { Button } from 'react-bootstrap';
import { auth } from '../firebase/config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function NavbarComponent() {
	const navigate = useNavigate();

	const [userEmail, setUserEmail] = useState<string | undefined | null>('');
	//console.log(auth.currentUser?.email);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			//console.log(user?.email);
			setUserEmail(user?.email);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const logout = async () => {
		try {
			await signOut(auth);
			navigate('/login');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
			<Container>
				<Navbar.Brand>
					<Nav.Link as={NavLink} to="/">
						Movie List
					</Nav.Link>
				</Navbar.Brand>

				<Nav className="d-flex flex-row align-items-center flex-wrap">
					{!userEmail && (
						<>
							<Nav.Link className="ms-3" as={NavLink} to="/login">
								Login
							</Nav.Link>
							<Nav.Link className="ms-3 me-3" as={NavLink} to="/signup">
								Signup
							</Nav.Link>
						</>
					)}

					{userEmail && (
						<>
							<Nav.Link as={NavLink} to="/">
								Home
							</Nav.Link>
							<p className="my-0 ms-3 text-secondary">Hello, {userEmail}</p>
							<Button className="ms-2" onClick={logout}>
								Logout
							</Button>
							<Nav.Link className="ms-2 me-3" as={NavLink} to="/create">
								Create
							</Nav.Link>
						</>
					)}
					<SearchBar />
				</Nav>
			</Container>
		</Navbar>
	);
}
