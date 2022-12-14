import { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import ReactPlayer from "react-player";
import Axios from "../../axios";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./youtube.module.css";

import Paginate from "../Pagination/Paginate";

const Youtube = () => {
	const [youtubeSearch, setYoutubeSearch] = useState([]);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(10);

	const lastIndex = currentPage * postsPerPage;
	const firstIndex = lastIndex - postsPerPage;

	const youtubeAbort = new AbortController();

	const currentPost = youtubeSearch.slice(
		firstIndex,
		lastIndex
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		Axios.get(
			"/youtubeSearch",
			{
				params: { search },
			},
			{
				signal: youtubeAbort.signal,
			}
		).then((res) => {
			setYoutubeSearch(res.data.items);
		});

		setSearch("");
	};
	return (
		<>
			<SearchBar
				icon={
					<FaYoutube
						style={{ color: "#FF0000" }}
						size="5rem"
					/>
				}
				pdata="Find the latest & greatest videos and music you love from the
						world."
				header="YOUTUBE"
				search={search}
				setSearch={setSearch}
				handleSubmit={handleSubmit}
			/>

			<div className={styles.mainContainer}>
				<div className={styles.youtubeDataOutput}>
					{currentPost.map((item) => {
						return (
							<div
								className={styles.youTubeContainer}
								key={item.etag}>
								<div className={styles.header}>
									<h3>{item.snippet.title}</h3>
								</div>
								<ReactPlayer
									url={`https://www.youtube.com/watch?v=${item.id.videoId}`}
									controls
									className={styles.player}
									width="100"
								/>
								<div className={styles.content}>
									<p>
										<span className={styles.desc}>
											Description :{" "}
										</span>{" "}
										{item.snippet.description}
									</p>
								</div>
								<p className={styles.snippetTitle}>
									Channel : {item.snippet.channelTitle}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			<Paginate
				totalPosts={youtubeSearch.length}
				postsPerPage={postsPerPage}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
			/>
		</>
	);
};

export default Youtube;
