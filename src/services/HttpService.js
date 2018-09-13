import axios from 'axios';
import Noty from 'noty';
import translations from '../setup/translations';

export class HttpService {

    constructor(projectId, apiBaseUrl, apiAccessToken) {
        let service = axios.create({});
        service.interceptors.request.use((config) => {
            config.headers.common['Authorization'] = 'Bearer ' + apiAccessToken;
            config.headers.common['Project'] = projectId;
            config.baseURL = apiBaseUrl;
            return config;
        });
        this.service = service;
    };

    get(path) {
        return this.service.get(path);
    };

    patch(path, payload) {
        return this.service.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload
        });
    };

    put(path, payload) {
        return this.service.request({
            method: 'PUT',
            url: path,
            responseType: 'json',
            data: payload
        });
    };

    post(path, payload) {
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        })
    };

    delete(path, payload) {
        return this.service.request({
            method: 'DELETE',
            url: path,
            responseType: 'json',
            data: payload
        })
    };

    /**
     * Handle errors
     * @param response
     */
    handleError(response) {
        switch (response.status) {
            case 400:
                new Noty({text: translations[sessionStorage.getItem('locale')].errorBadRequest, type: "error", timeout: 3000}).show();
                break;
            case 401:
                new Noty({text: translations[sessionStorage.getItem('locale')].errorNotAuthenticated, type: "error", timeout: 3000}).show();
                break;
            case 403:
                new Noty({text: translations[sessionStorage.getItem('locale')].errorForbidden, type: "error", timeout: 3000}).show();
                break;
            case 404:
                new Noty({text: translations[sessionStorage.getItem('locale')].errorNotFound, type: "error", timeout: 3000}).show();
                break;
            default:
                new Noty({text: translations[sessionStorage.getItem('locale')].errorSomethingWrong, type: "error", timeout: 3000}).show();
        }
    };
}
