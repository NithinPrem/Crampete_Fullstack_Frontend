import { Link } from "react-router-dom";
import styles from "./accessDenied.module.css";

const AccessDenied = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.error}>Access Denied</h1>
			<p className={styles.p}>
				You are not authorized to access this page.
			</p>
			<Link to="/signIn" className={styles.signIn}>
				SIGN IN
			</Link>
		</div>
	);
};

export default AccessDenied;
