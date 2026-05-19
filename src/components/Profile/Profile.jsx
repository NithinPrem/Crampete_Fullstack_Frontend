import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import {
	Link,
	Outlet,
	useLocation,
} from "react-router-dom";
import styles from "./profile.module.css";

const Profile = () => {
	const location = useLocation();
	const state = useSelector((state) => state.user);

	return (
		<>
			{location.pathname === "/dashBoard/profile" ? (
				<div className={styles.container}>
					<div className={styles.top}>
						<h1 className={styles.H1top}>
							Profile & Account Settings
						</h1>
					</div>
					<div className={styles.imgContainer}>
						<div>
							<Avatar
								name={state.user.firstName}
								size={150}
								round="25px"
							/>
						</div>
					</div>

					<div className={styles.formMainContainer}>
						<form className={styles.formContainer}>
							<div className={styles.rowOne}>
								<div className={styles.colOne}>
									<p>First Name</p>
									<input
										type="text"
										name="firstName"
										className={styles.input}
										readOnly={true}
										placeholder={state?.user?.firstName}
										style={{ textTransform: "uppercase" }}
									/>
								</div>
								<div className={styles.colTwo}>
									<p>Last Name</p>
									<input
										type="text"
										name="lastName"
										className={styles.input}
										readOnly={true}
										placeholder={state?.user?.lastName}
										style={{ textTransform: "uppercase" }}
									/>
								</div>
							</div>
							<div className={styles.rowTwo}>
								<div className={styles.colOne}>
									<p>Email Address</p>
									<input
										type="text"
										name="emailAddress"
										className={styles.input}
										readOnly={true}
										placeholder={state?.user?.email}
									/>
								</div>
							</div>
						</form>
					</div>

					<div className={styles.updateContainer}>
						<div className={styles.dbLeft}>
							<p>Update / Change your Password</p>
							<p>
								If you're logged out of your account and
								can't remember your password, you can
								request to reset it.
							</p>
						</div>
						<div className={styles.dbRight}>
							<Link to="/dashBoard/profile/update">
								<button>Update</button>
							</Link>
						</div>
					</div>
					<div className={styles.deactivateContainer}>
						<div className={styles.dbLeft}>
							<p>Delete Your Account</p>
							<p>
								When you delete your account, your profile &
								all Personal information will be permanently
								removed.
							</p>
						</div>
						<div className={styles.dbRight}>
							<Link to="/dashBoard/profile/delete">
								<button type="submit">Delete</button>
							</Link>
						</div>
					</div>
				</div>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default Profile;
