import axios from "axios";

const Axios = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "https://randombackend.onrender.com/api",
	headers: {
		Accept: "application/json",
	},
});

export default Axios;
