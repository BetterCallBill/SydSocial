import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
import { toast } from 'react-toastify';
import { history } from '../..';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError<any>) => {
    const { data, status } = error.response!;

    switch (status) {
        case 400:
            if (data.errors) {
                const errorArray = [];
                console.log("data.errors: ", data.errors)
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        errorArray.push(data.errors[key]);
                    }
                }
                throw errorArray.flat();
            } else {
                toast.error(data.errors);
            }
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
        default:
            break;
    }

    return Promise.reject(error);
})

axios.defaults.baseURL = 'http://localhost:5000/api';

const respondseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(respondseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(respondseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(respondseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(respondseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`)
};

const agent = {
    Activities
}

export default agent;