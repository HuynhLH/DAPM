import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; 

const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export default { getProductById };
