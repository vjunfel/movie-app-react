import { useEffect, useState } from "react";
import Axios from "../api";
import MovieCard from "../components/MovieCard";

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchMovies();
	}, []);

	const fetchMovies = () => {
		setLoading(true);
		Axios.get("/movies/getMovies")
			.then((res) => {
				setLoading(false);
				return setMovies(res.data.movies);
			})
			.catch((err) => console.error("Error fetching movies:", err));
	};

	// Remove deleted movie
	const handleDelete = (id) => {
		setMovies((prev) => prev.filter((movie) => movie._id !== id));
	};

	// Update movie in list
	const handleUpdate = (updatedMovie) => {
		setMovies((prev) =>
			prev.map((movie) =>
				movie._id === updatedMovie._id ? updatedMovie : movie
			)
		);
	};

	if (loading)
		return (
			<div className="text-center my-5 py-5">
				<div className="spinner-border m-3"></div>
				<p>Loading...</p>
			</div>
		);

	return (
		<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 my-5">
			{movies.map((movie) => (
				<div className="col" key={movie._id}>
					<MovieCard
						movie={movie}
						onDelete={handleDelete}
						onUpdate={handleUpdate}
					/>
				</div>
			))}
		</div>
	);
};

export default Home;
