import axios from 'axios';

const hussmannApi = import.meta.env.VITE_HUSSMANN_API_URL

export class BaseApi {
    #http;

    constructor() {
        this.#http = axios.create({
            baseURL: hussmannApi,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    get http() {
        return this.#http;
    }
}