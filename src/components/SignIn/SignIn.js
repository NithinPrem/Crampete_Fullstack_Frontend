import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../app/features/userSlice";
import Axios from "../../axios";
import styles from "./signIn.module.css";

const SignIn = () => {
	const [internalEmail, setInternalEmail] = useState("");
	const [internalPassword, setInternalPassword] =
		useState("");
	const [status, setStatus] = useState(false);
	const [inValidMsg, setInValidMsg] = useState("");
	const [invalidStatus, setInvalidStatus] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const signInHandler = async (e) => {
		e.preventDefault();
		try {
			const result = await Axios.post("/login", {
				email: internalEmail,
				password: internalPassword,
			});

			const userDetails = result.data.user;
			const validStatus = result.data.status;
			const validResponse = result.data.msg;

			dispatch(login(userDetails));

			setStatus(validStatus);

			setInternalEmail("");
			setInternalPassword("");
			setInValidMsg("");

			toast.success(validResponse);

			setTimeout(() => {
				navigate("/dashBoard");
			}, 3000);
		} catch (err) {
			const errorMessage = err.response.data.msg;
			const invalidStatus = err.request.status;

			setInValidMsg(errorMessage);
			setInvalidStatus(invalidStatus);

			setInternalEmail("");
			setInternalPassword("");
		}
	};
	return (
		<>
			<ToastContainer
				limit={1}
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				closeButton={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
				theme="dark"
			/>

			<div className={styles.container}>
				<div className={styles.signInCard}>
					<div className={styles.mainSignIn}>
						<h2>SIGN IN</h2>
						<h4>Login Using Your Username and Password.</h4>
					</div>
					<div className={styles.signInForm}>
						<form onSubmit={signInHandler}>
							<div className={styles.emailContainer}>
								<input
									type="email"
									name="email"
									id="email"
									className={styles.input}
									placeholder="Enter your email"
									required
									autoComplete="off"
									autoFocus
									value={internalEmail}
									onChange={(e) => {
										setInternalEmail(e.target.value);
									}}
								/>
							</div>

							<div className={styles.passwordContainer}>
								<input
									type="password"
									name="password"
									id="password"
									className={styles.input}
									placeholder="Enter your Password"
									required
									autoComplete="off"
									minLength="8"
									value={internalPassword}
									onChange={(e) => {
										setInternalPassword(e.target.value);
									}}
								/>
							</div>

							<div className={styles.rememberMeContainer}>
								<input
									type="checkbox"
									name=""
									id="rememberMe"
								/>

								<label
									htmlFor="rememberMe"
									className={styles.rememberMe}>
									<span>Remember me</span>
								</label>
							</div>
							<div className={styles.buttonContainer}>
								<button className={styles.signIn}>
									SIGN IN
								</button>
							</div>

							<div className={styles.miscContainer}>
								<span>Not registered ?</span>

								<span>
									<Link
										to="/signUp"
										className={styles.createAccountLink}>
										Create Account
									</Link>
								</span>
							</div>
						</form>
						<div className={styles.outputContainer}>
							{invalidStatus !== 200 && (
								<div className={styles.outputFailure}>
									{inValidMsg}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignIn;
