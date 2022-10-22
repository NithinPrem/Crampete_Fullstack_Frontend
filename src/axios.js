import axios from "axios";

const Axios = axios.create({
	baseURL: "https://randombackend.onrender.com/api",
	headers: {
		Accept: "application/json",
	},
});

export default Axios;
