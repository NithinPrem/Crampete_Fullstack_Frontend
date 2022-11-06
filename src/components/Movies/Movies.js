import { useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import Axios from "../../axios";
import logo from "../../images/TMDB.svg";
import Paginate from "../Pagination/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./movies.module.css";

const Movies = () => {
	const [movieData, setMovieData] = useState([]);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(10);

	const lastIndex = currentPage * postsPerPage;
	const firstIndex = lastIndex - postsPerPage;

	const currentPost = movieData.slice(
		firstIndex,
		lastIndex
	);

	const apiImageUrl = "https://image.tmdb.org/t/p/w500";

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.get("/movieSearch", {
			params: { search },
		}).then((res) => {
			setMovieData(res.data);
		});

		setSearch("");
	};
	return (
		<>
			<SearchBar
				icon={
					<BiMoviePlay
						style={{ color: "#6D0EC6" }}
						size="5rem"
					/>
				}
				pdata="Find the latest and greatest movies on RaNdOm.
						From award-winning hits to independent releases."
				header="MOVIES"
				search={search}
				setSearch={setSearch}
				handleSubmit={handleSubmit}
			/>

			<div className={styles.mainContainer}>
				<div className={styles.movieDataOutput}>
					{currentPost.map((movie) => {
						return (
							<div
								className={styles.movieContainer}
								key={movie.id}>
								<div className={styles.header}>
									<h3>{movie.title}</h3>
								</div>
								<div className={styles.content}>
									<a
										href={`https://www.google.com/search?q=${movie.title}`}
										target="_blank"
										rel="noreferrer">
										<img
											src={`${apiImageUrl}${movie.poster_path}`}
											alt={movie.Plot}
											className={styles.moviePoster}
										/>
									</a>
									<p className={styles.overview}>
										<span className={styles.synopsis}>
											Synopsis :{" "}
										</span>
										{movie.overview}
									</p>
									<p className={styles.date}>
										Release Date : {movie.release_date}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{movieData.length > 0 ? (
				<>
					<div className={styles.attrLogo}>
						<img src={logo} alt="TMDB LOGO" />
					</div>
					<div className={styles.attr}>
						<p>
							All film-related metadata used in RaNdOm,
							including actor, director and studio names,
							synopses, release dates, trailers and poster
							art is supplied by The Movie Database (TMDb).
							RaNdOm uses the TMDb API but is not endorsed
							or certified by TMDb.
						</p>
					</div>
				</>
			) : null}
			<Paginate
				totalPosts={movieData.length}
				postsPerPage={postsPerPage}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
			/>
		</>
	);
};

export default Movies;
