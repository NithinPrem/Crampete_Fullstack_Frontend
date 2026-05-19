import { useEffect, useState } from "react";
import styles from "./scrollBar.module.css";

const ScrollBar = () => {
	const [scrollTop, setScrollTop] = useState(0);

	const onScroll = () => {
		const winScroll = document.documentElement.scrollTop;
		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;

		const scrolled = (winScroll / height) * 100;

		setScrollTop(scrolled);
	};

	useEffect(() => {
		window.addEventListener("scroll", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div className={styles.ScrollBarWrapper}>
			<div
				className={styles.ScrollBarStyle}
				style={{ width: `${scrollTop}%` }}></div>
		</div>
	);
};

export default ScrollBar;
