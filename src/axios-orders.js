import axios from "axios";

const instance = axios.create({
  // bondooloi kids eccomerce firebase database url:
  baseURL: "https://ann-yum-zarya-default-rtdb.firebaseio.com/",
});

export default instance;
