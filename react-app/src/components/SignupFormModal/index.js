import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
		<main className="sign-up-form-cont">
		<div className="sign-up-head">

			<p>jobSphere</p>
		</div>
			<form onSubmit={handleSubmit} className="sign-up-form">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				
					<input
						placeholder="Email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				
					<input
						placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				
				
					<input
					placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<input
					placeholder="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					<div className="sign-up-form-btns"> 
				<button type="submit">Sign Up</button>
				<button onClick={() => closeModal()}>Cancel</button>

					</div>
			</form>
		</main>
		</>
	);
}

export default SignupFormModal;