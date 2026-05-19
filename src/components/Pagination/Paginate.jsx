import styles from "./paginate.module.css";

const Paginate = ({
	totalPosts,
	postsPerPage,
	setCurrentPage,
	currentPage,
}) => {
	let pages = [];

	for (
		let i = 1;
		i <= Math.ceil(totalPosts / postsPerPage);
		i++
	) {
		pages.push(i);
	}
	return (
		<>
			<div className={styles.paginateContainer}>
				{pages.map((page, index) => {
					return (
						<div
							key={index}
							onClick={() => {
								setCurrentPage(page);
							}}
							className={`${styles.paginateButton} ${
								page === currentPage ? styles.active : ""
							}`}>
							{page}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Paginate;
