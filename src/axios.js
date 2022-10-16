import axios from "axios";

const Axios = axios.create({
	baseURL: "https://randomnp.vercel.app/api",
});

export default Axios;
