import axios from 'axios'

export axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
})