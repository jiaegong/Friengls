import axios from 'axios';
import { getCookie } from '../shared/Cookie';

const token = getCookie('token');

const instance = axios.create({
  baseURL: 'https://hjg521.link/',
});

export default instance;
