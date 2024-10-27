import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
// import { router } from "../router/Router";
import { Customer } from "../models/Customer";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'https://localhost:7077/api/';
// axios.defaults.withCredentials = true;

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {

    if (!error.response) {
        toast.error(error.message);
        return Promise.reject(error.message);
    }

    //console.log(error.response);
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            toast.error(data.errorMessage);
            break;
        case 401:
            toast.error(data.errorMessage);
            break;
        case 500:
            //router.navigate('/server-error', { state: { error: data } });
            toast.error(data.errorMessage);
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),

}

const customer = {
    list: () => requests.get('customer'),
    details: (id: number) => requests.get(`customer/id?id=${id}`),
    post: (customer: Customer) => requests.post('customer', customer),
    put: (id: number, customer: Customer) => requests.put(`customer?id=${id}`, customer),
    delete: (id: number) => requests.delete(`customer?id=${id}`)
}

const agent = {
    customer
}

export default agent;