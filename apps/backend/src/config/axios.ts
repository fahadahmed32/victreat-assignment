import axios from 'axios';
import constants from '../constants';
import config from './config';

const openLibraryAxiosInstance = axios.create({
    baseURL: constants.OPEN_LIBRARY_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

const googleBooksAxiosInstance = axios.create({
    baseURL: constants.GOOGLE_BOOKS_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export { openLibraryAxiosInstance, googleBooksAxiosInstance }
