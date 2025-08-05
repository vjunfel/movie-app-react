import { useState } from "react";
import Axios from "../api"; // Your axios instance
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
	// const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();

		// if (password !== confirmPassword) {
		// 	return toast.error("Passwords do not match.");
		// }

		try {
			const response = await Axios.post("/users/register", {
				// name,
				email,
				password,
			});
      console.log(response);
      
      if (response.status !== 201) {
				throw new Error("Registration failed");
			}
      
			toast.success("Registration successful!");
			navigate("/login"); // Redirect after success
		} catch (error) {
			console.error("Registration error:", error.response?.data || error.message);
			toast.error(error.response?.data?.message || "Registration failed.");
		}
	};

	return (
		<div className="container" style={{ maxWidth: "500px" }}>
			<h2 className="mt-5 pt-5 pb-4 text-center">Register</h2>
			<form onSubmit={handleRegister}>
				{/* <div className="mb-3">
					<label>Name:</label>
					<input
						type="text"
						className="form-control"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div> */}

				<div className="mb-3">
					<label>Email:</label>
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label>Password:</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				{/* <div className="mb-3">
					<label>Confirm Password:</label>
					<input
						type="password"
						className="form-control"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div> */}

				<button type="submit" className="btn btn-primary w-100">
					Register
				</button>
        
        <p className="my-5 text-center">Already have an account? <Link to="/login">Login</Link></p>
			</form>
		</div>
	);
};

export default Register;
