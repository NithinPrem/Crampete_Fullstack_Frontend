import styles from "./error404.module.css";
const Error404 = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.error}>404</h1>
			<p className={styles.p}>Page Not Found.</p>
		</div>
	);
};

export default Error404;
