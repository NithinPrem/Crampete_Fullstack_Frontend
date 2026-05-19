import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AccessDenied from "./components/AccessDenied/AccessDenied";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import DashBoard from "./components/DashBoard/DashBoard";
import Delete from "./components/Delete/Delete";
import Error404 from "./components/Error404/Error404";
import Home from "./components/HomePage/Home";
import Movies from "./components/Movies/Movies";
import News from "./components/News/News";
import Profile from "./components/Profile/Profile";
import SignIn from "./components/SignIn/SignIn";
import Update from "./components/Update/Update";
import Youtube from "./components/YouTube/Youtube";

function App() {
	const state = useSelector((state) => state.user);

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="signIn" element={<SignIn />} />
				<Route path="/signUp" element={<CreateAccount />} />
				{state?.user?.status ? (
					<Route path="dashBoard" element={<DashBoard />}>
						<Route path="news" element={<News />} />
						<Route path="movies" element={<Movies />} />
						<Route path="youtube" element={<Youtube />} />
						<Route path="profile" element={<Profile />}>
							<Route path="update" element={<Update />} />
							<Route path="delete" element={<Delete />} />
						</Route>
					</Route>
				) : (
					<Route
						path="dashBoard/*"
						element={<AccessDenied />}
					/>
				)}
				<Route path="*" element={<Error404 />} />
			</Routes>
		</>
	);
}

export default App;
