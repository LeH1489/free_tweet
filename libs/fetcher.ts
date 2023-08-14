import axios from "axios";
import exp from "constants";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
