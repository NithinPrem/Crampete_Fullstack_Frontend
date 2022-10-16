import { useState } from "react";
import Axios from "../../axios";
// import { Triangle } from "react-loader-spinner";
import { GiNewspaper } from "react-icons/gi";
import Paginate from "../Pagination/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./news.module.css";

const News = () => {
	const [newsSearch, setNewsSearch] = useState([]);
	const [search, setSearch] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(10);

	const lastIndex = currentPage * postsPerPage;
	const firstIndex = lastIndex - postsPerPage;

	const currentPost = newsSearch.slice(
		firstIndex,
		lastIndex
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.get("/newsSearch", {
			params: { search },
		}).then((res) => {
			setNewsSearch(res.data);
			setIsLoading(true);
		});

		setSearch("");
	};
	return (
		<>
			<SearchBar
				icon={
					<GiNewspaper
						style={{ color: "#004AFF" }}
						size="5rem"
					/>
				}
				pdata="Find the latest breaking news and information on
					the top stories, weather, business, entertainment,
					politics, and more."
				header="NEWS"
				search={search}
				setSearch={setSearch}
				handleSubmit={handleSubmit}
			/>

			<div className={styles.mainContainer}>
				<div className={styles.newsDataOutput}>
					{currentPost.map((news, index) => {
						return (
							<div
								className={styles.newsContainer}
								key={index}>
								<div className={styles.header}>
									<h3>{news.title}</h3>
								</div>

								<a
									href={news.url}
									target="_blank"
									rel="noreferrer">
									<img
										src={news.urlToImage}
										alt={news.title}
										className={styles.newsImg}
									/>
								</a>

								<div className={styles.content}>
									<p> Description : {news.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<Paginate
				totalPosts={newsSearch.length}
				postsPerPage={postsPerPage}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
			/>
		</>
	);
};

export default News;
