import axios from "axios";

const Axios = axios.create({
	baseURL: "https://randombackend.vercel.app/api",
	header: {
		Accept: "application/json",
	},
});

export default Axios;
