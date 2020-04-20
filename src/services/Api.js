import axios from 'axios'

export default () => {
    var instance = axios.create({
        baseURL: (process.env.API_URL) ? process.env.API_URL : 'http://localhost:3000/',

    });
    return instance
}