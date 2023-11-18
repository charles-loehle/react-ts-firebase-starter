import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';

import Search from './pages/Search';
import Home from './pages/Home';
import Create from './pages/Create';
import Movie from './pages/Movie';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
	return (
		<>
			<BrowserRouter>
				<NavbarComponent />
				<Routes>
					<Route index element={<Home />} />
					<Route path="/movies/:id" element={<Movie />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/search" element={<Search />} />
					<Route path="/create" element={<Create />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

