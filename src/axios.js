import axios from "axios";

const Axios = axios.create({
	// baseURL: "https://random.vercel.app/api",
	baseURL: "http://localhost:5000/api",
});

export default Axios;
