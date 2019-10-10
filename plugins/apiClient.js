import axios from 'axios'

class ApiClient {
    constructor ({ store }) {
        this.store = store;
        this.axios = axios.create({
                baseURL: process.env.API_URL,
                headers: { 
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }
        )
    }

    async post (path, params = {}) {
        params.idToken = this.store.getters['user/idToken']
        params.email = this.store.getters['user/email']
        const { data } = await this.axios.post(path, params)
        return data
    }
}

export default ({ store }, inject) => {
    const apiClient = new ApiClient({ store })
    inject('apiClient', apiClient)
}