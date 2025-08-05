import { useAuth } from "../contexts/AuthContext";
import Axios from "../api";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const poster = "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg";

const MovieCard = ({ movie, onDelete, onUpdate }) => {
	const { user } = useAuth();
  const navigate = useNavigate();

	const [title, setTitle] = useState(movie.title);
	const [description, setDescription] = useState(movie.description);
	const [year, setYear] = useState(movie.year || "");
	const [director, setDirector] = useState(movie.director || "");
	const [genre, setGenre] = useState(movie.genre || "");

	const modalRef = useRef(null);
	let modalInstance = null;

	// Show modal using Bootstrap JS
	const showModal = () => {
		const bootstrap = window.bootstrap;
		modalInstance = bootstrap.Modal.getOrCreateInstance(modalRef.current);
		modalInstance.show();
	};

	const hideModal = () => {
		const bootstrap = window.bootstrap;
		modalInstance = bootstrap.Modal.getInstance(modalRef.current);
		modalInstance.hide();
	};

  const showDetails = async () => {
      navigate(`/movie-details/${movie._id}`)
  }
  
	const handleDelete = async () => {
		try {
			await Axios.delete(`/movies/deleteMovie/${movie._id}`);
			toast.success("Movie deleted successfully!");
			if (onDelete) onDelete(movie._id);
		} catch (err) {
			toast.error("Something went wrong");
			console.error("Delete failed:", err);
		}
	};

	const handleUpdateSubmit = async (e) => {
		e.preventDefault();
		try {
			const updatedMovie = { title, description, year, director, genre };
			const res = await Axios.patch(`/movies/updateMovie/${movie._id}`, updatedMovie);
			toast.success("Movie updated successfully!");
			hideModal();
			if (onUpdate) onUpdate(res.data.updatedMovie || updatedMovie);
		} catch (err) {
			toast.error("Update failed");
			console.error(err);
		}
	};

	return (
		<>
			<div className="card h-100 shadow-sm border-1 movie-card">
				<img
          onClick={showDetails}
					src={poster}
					className="card-img-top"
					alt={movie.title}
					style={{ height: "350px", objectFit: "cover" }}
				/>
				<div className="card-body d-flex flex-column">
					<h5 onClick={showDetails} className="card-title">{movie.title}</h5>
					<p className="card-text text-secondary movie-description">
						{movie.description}
					</p>

					{user?.isAdmin && (
						<div className="mt-auto d-flex gap-2">
							<button
								onClick={showModal}
								className="btn btn-sm btn-outline-primary w-100"
							>
								Update
							</button>
							<button
								onClick={handleDelete}
								className="btn btn-sm btn-outline-danger w-100"
							>
								Delete
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Bootstrap Modal */}
			<div ref={modalRef} className="modal fade" tabIndex="-1">
				<div className="modal-dialog">
					<div className="modal-content">
						<form onSubmit={handleUpdateSubmit}>
							<div className="modal-header">
								<h5 className="modal-title">Update Movie</h5>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body">
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
									<label>Description:</label>
									<textarea
										className="form-control"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
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
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
									Close
								</button>
								<button type="submit" className="btn btn-primary">
									Save Changes
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default MovieCard;
