import { Link } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
	return (
		<div className={styles.main}>
			<div className={styles.home}>
				<div className={styles.title}>
					<h1 className={styles.h1}>RaNdOm</h1>
					<Link to="/signIn" className={styles.signIn}>
						SIGN IN
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
