import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../axios";
import styles from "./createAccount.module.css";

const CreateAccount = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [status, setStatus] = useState(false);
	const [inValidMsg, setInValidMsg] = useState("");
	const [invalidStatus, setInvalidStatus] = useState(false);

	const navigate = useNavigate();

	const signUpHandler = async (e) => {
		e.preventDefault();

		try {
			const result = await Axios.post("/signup", {
				firstName,
				lastName,
				userName,
				email,
				password,
			});
			const validResponse = result.data.msg;
			const validStatus = result.status;

			setMsg(validResponse);
			setStatus(validStatus);

			setFirstName("");
			setLastName("");
			setUserName("");
			setEmail("");
			setPassword("");
			setInValidMsg("");
			setTimeout(() => {
				navigate("/");
			}, 3000);
		} catch (err) {
			const errorMessage = err.response.data.msg;
			const invalidStatus = err.request.status;

			setInValidMsg(errorMessage);
			setInvalidStatus(invalidStatus);
			setFirstName("");
			setLastName("");
			setUserName("");
			setEmail("");
			setPassword("");
			setMsg("");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.signUpCard}>
				<div className={styles.mainSignUp}>
					<h2>CREATE YOUR ACCOUNT</h2>
					<h4 className={styles.h4}>NEW HERE ?</h4>
					<h4 className={styles.h4}>
						SIGN UP & DISCOVER THE GREAT AMOUNT OF
						RANDOMNESS.
					</h4>
				</div>
				<div className={styles.signInForm}>
					<form onSubmit={signUpHandler}>
						<div className={styles.nameContainer}>
							<input
								type="text"
								name="firstName"
								id="firstName"
								placeholder="Enter your First Name"
								required
								autoFocus
								className={styles.input}
								autoComplete="off"
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
							/>
							<input
								type="text"
								name="lastName"
								id="lastName"
								placeholder="Enter your Last Name"
								required
								className={styles.input}
								autoComplete="off"
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
								}}
							/>
						</div>

						<div className={styles.emailContainer}>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Enter your Email Address"
								required
								autoComplete="off"
								className={styles.input}
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>

						<div className={styles.passwordContainer}>
							<input
								type="password"
								name="password"
								id="password"
								className={styles.input}
								autoComplete="off"
								placeholder="Enter your Password"
								required
								minLength="8"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>

						<div className={styles.buttonContainer}>
							<button
								type="submit"
								className={styles.signUp}>
								SIGN UP
							</button>
						</div>
					</form>
				</div>

				<div className={styles.outputContainer}>
					{status === 200 && (
						<div className={styles.outputSuccess}>
							{msg}
						</div>
					)}

					{invalidStatus !== 200 && (
						<div className={styles.outputFailure}>
							{inValidMsg}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CreateAccount;
