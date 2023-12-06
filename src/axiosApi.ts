import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://alan-noruzbaev-js-20-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;