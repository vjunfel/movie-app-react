import { useState } from "react";
import Axios from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
	const [email, setEmail] = useState("test99@mail.com");
	const [password, setPassword] = useState("asdf1234");

	const navigate = useNavigate();
  const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await Axios.post("/users/login", { email, password });
			console.log(res);

			if (res.status !== 200) {
				throw new Error("Login failed");
			}

			const token = res.data.access;
      
      login(token);
      
			navigate("/profile");
		} catch (err) {
			console.log(err || "Login failed");
		}
	};

	return (
		<form
			onSubmit={handleLogin}
			className="mx-auto d-flex flex-column justify-content-center align-items-center mt-5"
			style={{ maxWidth: "400px" }}
		>
			<h2 className='mt-5 pt-5 pb-4'>Login</h2>
			<div className="mb-3 w-100">
				<label>Email:</label>
				<input
					type="email"
					value={email}
					className="form-control"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div className="mb-3 w-100">
				<label>Password:</label>
				<input
					type="password"
					value={password}
					className="form-control"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<button className="btn btn-primary w-100">Login</button>
		</form>
	);
};

export default Login;
