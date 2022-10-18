import axios from "axios";

const Axios = axios.create({
	baseURL: "https://randombackend.vercel.app/api",
	headers: {
		Accept: "application/json",
	},
});

export default Axios;
