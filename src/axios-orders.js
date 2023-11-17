import axios from "axios";

const instance = axios.create({
  baseURL: "https://kutto-51d46-default-rtdb.firebaseio.com/"
});

export default instance;
