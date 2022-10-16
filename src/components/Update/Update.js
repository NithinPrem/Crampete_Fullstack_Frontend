import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../axios";
import styles from "./update.module.css";

const Update = () => {
	const [updatedPassword, setUpdatedPassword] =
		useState("");
	const [confirmPassword, setConfirmPassword] =
		useState("");

	const [updateMsg, setUpdateMsg] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [updateStatus, setUpdateStatus] = useState(false);

	const { token } = useSelector((state) => state.user.user);

	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate("/dashBoard/profile");
	};

	const handleUpdate = async () => {
		if (updatedPassword === "") {
			setErrorMsg("New Password Field Must Not Be Blank");
		} else if (confirmPassword === "") {
			setErrorMsg("Please Confirm Your New Password");
		} else if (
			updatedPassword === "" &&
			confirmPassword === ""
		) {
			setErrorMsg("Please enter a Valid Password");
		} else if (updatedPassword !== confirmPassword) {
			setErrorMsg("Passwords Entered Do Not Match");
		} else if (updatedPassword === confirmPassword) {
			const result = await Axios.post("/updatePassword", {
				updatedPassword,
				token,
			});
			const updatedMsg = result.data.msg;
			const updatedStatus = result.data.status;
			setUpdateMsg(updatedMsg);
			setUpdateStatus(updatedStatus);
			setErrorMsg("");
			setTimeout(() => {
				handleNavigate();
			}, 3000);
		}
		setUpdatedPassword("");
		setConfirmPassword("");
	};

	return (
		<>
			<div className={styles.updateMainContainer}>
				<h2 className={styles.h4}>
					Update / Change your Password
				</h2>

				<div className={styles.updateContainer}>
					<div className={styles.colOne}>
						<p>New Password</p>

						<input
							type="password"
							name=""
							className={styles.input}
							required
							autoFocus
							value={updatedPassword}
							onChange={(e) => {
								setUpdatedPassword(e.target.value);
							}}
						/>
					</div>
					<div className={styles.colTwo}>
						<p>Confirm New Password</p>
						<input
							type="password"
							name=""
							className={styles.input}
							required
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</div>
				</div>
				<div>
					<div className={styles.btnContainer}>
						<button
							className={styles.button}
							type="submit"
							onClick={handleUpdate}>
							SAVE CHANGES
						</button>
						<button
							className={styles.button}
							type="submit"
							onClick={handleNavigate}>
							CANCEL
						</button>
					</div>
				</div>
			</div>

			{updateStatus ? (
				<div className={styles.updateOutput}>
					{updateMsg}
				</div>
			) : null}

			{errorMsg ? (
				<div className={styles.outputFailure}>
					{errorMsg}
				</div>
			) : null}
		</>
	);
};

export default Update;
