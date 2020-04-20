import axios from 'axios'

export default () => {
    var instance = axios.create({
        baseURL: process.env.VUE_APP_API_URL,

    });
    return instance
}