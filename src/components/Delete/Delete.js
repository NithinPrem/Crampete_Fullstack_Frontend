import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistStore } from "redux-persist";
import { reset } from "../../app/features/userSlice";
import { store } from "../../app/store";
import Axios from "../../axios";
import styles from "./delete.module.css";

const Delete = () => {
	const navigate = useNavigate();

	const { token } = useSelector((state) => state.user.user);

	const [deleteMsg, setDeleteMsg] = useState("");
	const [deleteStatus, setDeleteStatus] = useState(false);

	const dispatch = useDispatch();

	const persistor = persistStore(store);

	const handleNavigate = () => {
		navigate("/dashBoard/profile");
	};

	const handleDelete = async () => {
		const result = await Axios.post("/deleteUser", {
			token,
		});
		const deletedMsg = result.data.msg;
		const deletedStatus = result.data.status;
		setDeleteMsg(deletedMsg);
		setDeleteStatus(deletedStatus);

		setTimeout(() => {
			dispatch(reset());
			persistor.purge();
			window.onpopstate = () => {
				navigate("/");
			};
		}, 3000);
	};

	return (
		<>
			<div className={styles.content}>
				<p>
					When you delete your account, your Profile will be
					permanently removed. After your account has been
					deleted, you can sign up again with the same
					username as long as it hasn't been taken by a new
					person on RaNdOm. Bear in mind that if your
					account has been removed for violating Usage
					Guidelines, you may not be able to sign up again
					with the same username.
				</p>
				<br />
				<p>
					For security reasons, we can't delete an account
					for you. You'll need to be able to log in to your
					account to request deletion. After your account
					has been deleted, you will not have access to
					RaNdOm's Data.
				</p>
			</div>
			<div className={styles.updateMainContainer}>
				<h2 className={styles.alert}>
					Are You Sure You Want To Delete Your Account?
				</h2>

				<div>
					<div className={styles.btnContainer}>
						<button
							className={styles.button}
							type="submit"
							onClick={handleNavigate}>
							NO
						</button>

						<button
							className={styles.button}
							type="submit"
							onClick={handleDelete}>
							YES
						</button>
					</div>
				</div>
			</div>
			{deleteStatus ? (
				<div className={styles.deleteOutput}>
					{deleteMsg} Thank You for Using RaNdOm.
				</div>
			) : null}
		</>
	);
};

export default Delete;
