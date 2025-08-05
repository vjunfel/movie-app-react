import { useEffect, useState } from "react";
import Axios from "../api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const AdminDashboard = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);

	const [title, setTitle] = useState("");
	const [director, setDirector] = useState("");
	const [year, setYear] = useState("");
	const [description, setDescription] = useState("");
	const [genre, setGenre] = useState("");

	const { user } = useAuth();

	const handleAddMovie = async (e) => {
		e.preventDefault();
		try {
			await Axios.post("/movies/addMovie", {
				title,
				director,
				year,
				description,
				genre,
			});
			toast.success("Movie updated successfully!");
			setShowForm(false);
			setTitle("");
			setDirector("");
			setYear("");
			setDescription("");
			setGenre("");
      fetchMovies();
		} catch (err) {
			console.error(err);
			toast.error("Failed to add movie.");
		}
	};

	const fetchMovies = () => {
		setLoading(true);
		Axios.get("/movies/getMovies")
			.then((res) => {
				setLoading(false);
				const sortedMovies = res.data.movies.sort((a, b) => {
					return b._id.localeCompare(a._id);
				});
				return setMovies(sortedMovies);
			})
			.catch((err) => {
				console.error("Error fetching movies:", err);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	if (loading)
		return (
			<div className="text-center my-5 py-5">
				<div className="spinner-border m-3"></div>
				<p>Loading...</p>
			</div>
		);

	return (
		<div className="p-6">
			<div className="d-flex justify-content-between align-items-center">
				<h2 className="text-2xl font-bold my-4">
					Admin Dashboard - All Movies
				</h2>
				{user.isAdmin && (
					<button
						id="addMovie"
						className="btn btn-primary"
						onClick={() => setShowForm(true)}
						// onClick={handleAddMovie}
					>
						Add movie
					</button>
				)}
			</div>

			<table className="w-full border border-collapse mb-5">
				<thead>
					<tr className="bg-gray-100">
						<th className="border px-4 py-2">Title</th>
						<th className="border px-4 py-2">Description</th>
						<th className="border px-4 py-2">Genre</th>
						<th className="border px-4 py-2">Director</th>
						<th className="border px-4 py-2">Release Year</th>
					</tr>
				</thead>
				<tbody>
					{movies.length > 0 ? (
						movies.map((movie) => (
							<tr key={movie._id}>
								<td className="border px-4 py-2">{movie.title}</td>
								<td className="border px-4 py-2">
									{movie.description}
								</td>
								<td className="border px-4 py-2">{movie.genre}</td>
								<td className="border px-4 py-2">{movie.director}</td>
								<td className="border px-4 py-2">{movie.year}</td>
							</tr>
						))
					) : (
						<tr>
							<td
								className="border px-4 py-2"
								colSpan="3"
							>
								No movies found.
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* ADD FORM */}
			{showForm && (
				<div
					className="modal fade show"
					style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
					tabIndex="-1"
					role="dialog"
					onClick={() => setShowForm(false)}
				>
					<div
						className="modal-dialog modal-lg modal-dialog-centered"
						role="document"
						onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
					>
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Add New Movie</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowForm(false)}
								></button>
							</div>
							<div className="modal-body">
								<form onSubmit={handleAddMovie}>
									<div className="mb-3">
										<label>Title:</label>
										<input
											type="text"
											className="form-control"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											required
										/>
									</div>

									<div className="mb-3">
										<label>Director:</label>
										<input
											type="text"
											className="form-control"
											value={director}
											onChange={(e) => setDirector(e.target.value)}
											required
										/>
									</div>

									<div className="mb-3">
										<label>Year:</label>
										<input
											type="number"
											className="form-control"
											value={year}
											onChange={(e) => setYear(e.target.value)}
											required
											min="1800"
											max={new Date().getFullYear()}
										/>
									</div>

									<div className="mb-3">
										<label>Genre:</label>
										<input
											type="text"
											className="form-control"
											value={genre}
											onChange={(e) => setGenre(e.target.value)}
											required
										/>
									</div>

									<div className="mb-3">
										<label>Description:</label>
										<textarea
											className="form-control"
											value={description}
											onChange={(e) =>
												setDescription(e.target.value)
											}
											required
										/>
									</div>

									<div className="d-flex justify-content-end gap-2">
										<button
											type="submit"
											className="btn btn-success"
										>
											Save
										</button>
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => setShowForm(false)}
										>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminDashboard;
