import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Activity, ActivityFormValues } from '../models/activity';
import { toast } from 'react-toastify';
import { history } from '../..';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    })
}

// add token to request header
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.commonStore.token;
    config.headers = config.headers ?? {};

    config.headers.Authorization = `Bearer ${token}`;

    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { status, headers } = error.response!
    switch (status) {
        case 400:
            toast.error('bad request');
            break
        case 401:
            if (
                status === 401 &&
                headers['www-authenticate']?.startsWith(
                    'Bearer error="invalid_token"'
                )
            ) {
                store.userStore.logout();
                toast.error('Session expired - please login again');
            }
            break
        case 404:
            history.push('/not-found');
            break
        case 500:
            toast.error('server error');
            break
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
    create: (activity: ActivityFormValues) => requests.post<void>('/activities', activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})
};

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Activities,
    Account
}

export default agent;