import axios from "axios";

const instance = axios.create({
  // mika eccomerce firebase database url:
  baseURL: "https://oirhon-user-default-rtdb.firebaseio.com/",
});

export default instance;
