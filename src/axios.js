import axios from "axios";

const Axios = axios.create({
	baseURL: "https://randombackend.onrender.com/api",
	// baseURL: "http://localhost:5000/api",
	headers: {
		Accept: "application/json",
	},
});

export default Axios;
