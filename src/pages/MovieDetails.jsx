import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const poster = "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg";

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [comment, setComment] = useState("");
  
  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const res = await Axios.get(`/movies/getMovie/${id}`);
      setMovie(res.data);
      console.log("MOVIE ========================",res);
    } catch (err) {
      toast.error("Failed to fetch movie");
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await Axios.patch(`/movies/addComment/${id}`,
        { userId: user.id ,comment: comment }
      );
      console.log("COMMENT: ", res);
      
      if (res.status !== 200) {
				throw new Error("Failed to add comment!");
			}
      
      setMovie((prev) => ({
        ...prev,
        comments: res.data.updatedMovie.comments,
      }));
      
      setComment("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error("Failed to add comment.");
      console.error(err);
    }
  };

  if (!movie) return <p className="text-center mt-5">Loading movie...</p>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={poster}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p className="text-muted">{movie.description}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>

          <hr />
          <h5>Comments:</h5>
          {movie.comments?.length > 0 ? (
            <ul className="list-unstyled">
              {movie.comments.map((c, i) => (
                <li key={i} className="mb-2">
                  <strong>{"Anonymous"}:</strong> {c.comment}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No comments yet.</p>
          )}

          {user && (
            <div className="mt-3">
              <textarea
                className="form-control"
                rows="2"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className="btn btn-primary mt-2"
              >
                Submit Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
