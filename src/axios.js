import axios from "axios";

const Axios = axios.create({
	baseURL: "https://randombackend.vercel.app/api",
});

export default Axios;
