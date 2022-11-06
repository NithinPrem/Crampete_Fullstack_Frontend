import React from "react";
import styles from "./searchBar.module.css";

const SearchBar = ({
	icon,
	header,
	pdata,
	search,
	setSearch,
	handleSubmit,
}) => {
	return (
		<>
			<div className={styles.topContainer}>
				{icon}
				<h1 className={styles.header}>{header}</h1>
				<br />
				<p className={styles.para}>{pdata}</p>
				<form
					className={styles.form}
					onSubmit={handleSubmit}>
					<input
						type="search"
						className={styles.search}
						value={search}
						autoFocus
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						required
					/>
					<div className={styles.btnContainer}>
						<button
							type="submit"
							className={styles.searchButton}>
							Search
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default SearchBar;
