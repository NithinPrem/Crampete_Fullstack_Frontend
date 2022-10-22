import { useEffect, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import {
	FaGithub,
	FaQuoteLeft,
	FaQuoteRight,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { persistStore } from "redux-persist";
import { reset } from "../../app/features/userSlice";
import { store } from "../../app/store";
import Axios from "../../axios";
import ScrollBar from "../ScrollBar/ScrollBar";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./dashBoard.module.css";

const DashBoard = () => {
	const year = new Date().getFullYear();
	const apiImageUrl = "https://image.tmdb.org/t/p/w400";
	const location = useLocation();
	const navigate = useNavigate();
	const stateData = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const persistor = persistStore(store);

	const [isVisible, setIsVisible] = useState(false);

	const [newsData, setNewsData] = useState([]);
	const [movieData, setMovieData] = useState([]);
	const [randomQuote, setRandomQuote] = useState("");

	const logOut = () => {
		dispatch(reset());
		persistor.purge();
		window.onpopstate = () => {
			navigate("/");
		};
	};

	const sidebarHandler = () => {
		setIsVisible(!isVisible);
	};

	useEffect(() => {
		const fetchNews = async () => {
			const newsResponse = await Axios.get(`/newsRandom`);
			const fetchedNews = await newsResponse.data;
			setNewsData(fetchedNews);
		};

		const fetchRandomMovies = async () => {
			const moviesResponse = await Axios.post(
				`/moviesRandom`
			);
			const fetchedRandomMovies = await moviesResponse.data;
			setMovieData(fetchedRandomMovies);
		};

		fetchNews();
		fetchRandomMovies();

		const quoteData = setTimeout(() => {
			Axios.get("/quotes").then((res) => {
				setRandomQuote(res.data);
			});
		}, 10000);

		return () => {
			clearTimeout(quoteData);
		};
	}, [randomQuote]);

	return (
		<>
			<CgMenuGridR
				className={styles.menuGrid}
				onClick={sidebarHandler}
			/>
			<Sidebar
				isVisible={isVisible}
				sidebarHandler={sidebarHandler}
				logOut={logOut}
			/>

			<header className={styles.headerContainer}>
				RaNdOm
			</header>
			<div className={styles.navContainer}>
				<nav className={styles.navbarLeft}>
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
					</ul>
				</nav>

				<Link
					to="/"
					className={styles.navbarRight}
					onClick={logOut}>
					LOGOUT
				</Link>
			</div>
			<ScrollBar />
			{location.pathname === "/dashBoard" && (
				<>
					<div className={styles.contentContainer}>
						{randomQuote ? (
							<div className={styles.quotesContainer}>
								<div className={styles.quote}>
									<FaQuoteLeft />
									&nbsp;
									{randomQuote}
									&nbsp;
									<FaQuoteRight />
								</div>
							</div>
						) : (
							<>
								<div className={styles.quotesContainer}>
									<div className={styles.quote}>
										<FaQuoteLeft />
										&nbsp; The purpose of our lives is to be
										happy. &nbsp;
										<FaQuoteRight />
									</div>
								</div>
							</>
						)}
						<div className={styles.pContent}>
							<p>
								Welcome to RaNdOm &nbsp;
								<strong className={styles.strong}>
									{`${stateData?.user?.firstName} ${stateData?.user?.lastName}`}
								</strong>
							</p>
							<p>
								Random is a place where you van explore all
								things NEWS, FOOD & YOUTUBE.
							</p>
							<p>
								This Website is a personal space where you
								can indulge in your personal interests &
								find out more about the world.
							</p>
						</div>
					</div>
					<h2 className={styles.h2}>Latest News</h2>
					<div className={styles.homeContainer}>
						{newsData?.map((news, index) => {
							return (
								<div
									className={styles.newsContainer}
									key={index}>
									<div className={styles.header}>
										<h3>{news.title}</h3>
									</div>

									<div className={styles.content}>
										<p> Description : {news.description}</p>
										<br />
									</div>
									<a
										href={news.url}
										target="_blank"
										rel="noreferrer">
										<img
											src={news.urlToImage}
											alt={news.title}
										/>
									</a>
								</div>
							);
						})}
					</div>
					<h2 className={styles.h2}>Top Rated Movies</h2>
					<div className={styles.homeContainer}>
						{movieData.map((movie) => {
							return (
								<div
									className={styles.movieContainer}
									key={movie.id}>
									<h3>{movie.title}</h3>
									<div className={styles.content}>
										<img
											src={`${apiImageUrl}${movie.poster_path}`}
											alt={movie.Plot}
											className={styles.moviePoster}
										/>
										<br />
										<p className={styles.overview}>
											Synopsis : {movie.overview}
										</p>
										<br />
										<p className={styles.date}>
											Release Date : {movie.release_date}
										</p>
									</div>
								</div>
							);
						})}
					</div>
					);
				</>
			)}
			<Outlet />
			<footer className={styles.footer}>
				<span>Copyright &#169; {year}</span>
				<span className={styles.divider}></span>
				Created by&nbsp;
				<span>
					<a
						href="https://github.com/NithinPrem"
						className={styles.gitLink}
						target="_blank"
						rel="noreferrer">
						<FaGithub />
						&nbsp;NithinPrem
					</a>
				</span>
			</footer>
		</>
	);
};

export default DashBoard;
