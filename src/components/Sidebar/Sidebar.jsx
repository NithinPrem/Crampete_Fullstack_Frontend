import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

const Sidebar = ({ isVisible, sidebarHandler, logOut }) => {
	const location = useLocation();

	return (
		<>
			<div
				className={
					isVisible
						? `${styles.isActive}`
						: `${styles.isClosed}`
				}>
				<AiOutlineCloseCircle
					className={styles.SidebarClose}
					onClick={sidebarHandler}
				/>

				<nav className={styles.navContainer}>
					<ul className={styles.ul}>
						<Link
							to="/dashBoard"
							className={`${styles.li} ${
								location.pathname === "/dashBoard"
									? styles.active
									: ""
							}`}>
							Home
						</Link>
						<Link
							to="/dashBoard/news"
							className={`${styles.li} ${
								location.pathname === "/dashBoard/news"
									? styles.active
									: ""
							}`}>
							NEWS
						</Link>
						<Link
							to="/dashBoard/movies"
							className={`${styles.li} ${
								location.pathname === "/dashBoard/movies"
									? styles.active
									: ""
							}`}>
							MOVIES
						</Link>

						<Link
							to="/dashBoard/youtube"
							className={`${styles.li} ${
								location.pathname === "/dashBoard/youtube"
									? styles.active
									: ""
							}`}>
							YOUTUBE
						</Link>
						<Link
							to="/dashBoard/profile"
							className={`${styles.li} ${
								location.pathname ===
									"/dashBoard/profile" ||
								location.pathname ===
									"/dashBoard/profile/update" ||
								location.pathname ===
									"/dashBoard/profile/delete"
									? styles.active
									: ""
							}`}>
							PROFILE
						</Link>
						<Link
							to="/"
							className={styles.navbarRight}
							onClick={logOut}>
							LOGOUT
						</Link>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Sidebar;
