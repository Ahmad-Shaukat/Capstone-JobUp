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
	const [validations, setValidations] = useState({})
	
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		function checkErrors () {
			const allErrors = {}
			if (username.length<4) {
					allErrors['minUsername'] = 'Username must be longer then 4 character'
			}
			if (username.length>10) {
					allErrors['maxUsername'] = "Username can't be more then 10 character long"
			}
			if (password !== confirmPassword) {
				allErrors['password'] = "Confirm Password field must be the same as the Password field"
			}
			if (Object.values(allErrors).length>0) {
				setValidations(allErrors)
				return true
			} else {
				return false
			}

		}
		if (checkErrors() === false) {
			await dispatch(signUp(username, email, password))
			closeModal()
		} else {
			return
		}
	};

	return (
		<>
		<main className="sign-up-form-cont">
		<div className="sign-up-head">
			
			<p>JobSphere</p>
		</div>
			<form onSubmit={handleSubmit} className="sign-up-form">
				
				<div className="sign-up-err-cont">
					{validations && validations['minUsername'] && <p>{validations['minUsername']}</p>}
					{validations && validations['maxUsername'] && <p>{validations['maxUsername']}</p>}
					{validations && validations['password'] && <p>{validations['password']}</p>}
				</div>
				
					<input
						placeholder="Email"
						type="email"
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
				<button type="submit" className="sign-up-sub-btn">Sign Up</button>
				<button onClick={() => closeModal()} className="sign-up-can-btn">Cancel</button>

					</div>
			</form>
		</main>
		</>
	);
}

export default SignupFormModal;