import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const respondseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(respondseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(respondseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(respondseBody),
    delete: (url: string) => axios.delete(url).then(respondseBody)
}

const Activities = {
    list: () => requests.get('/activities')
};

const agent = {
    Activities
}

export default agent;