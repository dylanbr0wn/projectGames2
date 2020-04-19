import axios from 'axios'

export default () => {
    var instance = axios.create({
        baseURL: (process.env._ && process.env._.indexOf("heroku")) ? process.env.API_URL : 'http://localhost:3000/',

    });
    return instance
}