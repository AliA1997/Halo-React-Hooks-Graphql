import * as utils from '../utils';

//FOr each method it will contian accessToken, url, params, and formdata
export function get(url, params, formData, accessToken) {
    return new Promise((resolve, reject) => {
        return fetch(new Request(url,
                {
                    type: utils.defaultMediaType,
                    body: JSON>stringify(formData),
                    headers: {
                        'Authorization': "Bearer " + accessToken,
                        "Content Type": utils.defaultMediaType
                    },
                    mode: 'cors'
                }
            )
        )
        .then(function(response) {
            switch(response.status) {
                case utils.statusCodes.ok:
                    response.json().then(data => {
                        resolve(data);
                    });
                    break;

                case utils.statusCodes.noContent:
                    response.text().then(data => {
                        resolve('no content returned.')
                    });
                    break;

                case utils.statusCodes.badRequest:
                    reject('Bad Request');
                    break;

                case utils.statusCodes.serverError:
                    reject('Server Error');
                    break;

                default:
                    resolve();
                    break; 
            }
        })
    })
}

export function post(url, params, formData, accessToken) {
    return new Promise((resolve, reject) => {
        return fetch(new Request(url,
                {
                    credentials: 'include',
                    type: utils.defaultMediaType,
                    body: JSON.stringify(formData),
                    headers: {
                        'Content Type': utils.defaultMediaType,
                        'Authorization': 'Bearer ' + accessToken
                    }
                }
            )
        )
        .then(function(response) {
            switch(response.status) {
                case utils.statusCodes.ok:
                    response.json().then(data => {
                        resolve(data);
                    });
                    break;
    
                case utils.statusCodes.created:
                    response.text().then(data => {
                        resolve('data created');
                    });
                    break;
    
                case utils.statusCodes.noContent:
                    response.text().then(data => {
                        resolve('no content returned.')
                    });
                    break;
    
                case utils.statusCodes.badRequest:
                    reject('Bad Request');
                    break;
    
                case utils.statusCodes.serverError:
                    reject('Server Error');
                    break;
    
                default:
                    resolve();
                    break; 
            }
        });
    });
}

export function patch(url, params, formData, accessToken) {
    return new Promise((resolve, reject) => {
        return fetch(new Request(url,
                {
                    credentials: 'include',
                    type: utils.defaultMediaType,
                    body: JSON.stringify(formData),
                    headers: {
                        'Content Type': utils.defaultMediaType,
                        'Authorization': 'Bearer ' + accessToken
                    }
                }
            )
        )
        .then(function(response) {
            switch(response.status) {
                case utils.statusCodes.ok:
                    response.json().then(data => {
                        resolve(data);
                    });
                    break;
    
                case utils.statusCodes.created:
                    response.text().then(data => {
                        resolve('data created');
                    });
                    break;
    
                case utils.statusCodes.noContent:
                    response.text().then(data => {
                        resolve('no content returned.')
                    });
                    break;
    
                case utils.statusCodes.badRequest:
                    reject('Bad Request');
                    break;
    
                case utils.statusCodes.serverError:
                    reject('Server Error');
                    break;
    
                default:
                    resolve();
                    break; 
            }
        });
    });
}

export function deleteReq(url, params, formData, accessToken) {
    return new Promise((resolve, reject) => {
        return fetch(new Request(url,
                {
                    credentials: 'include',
                    type: utils.defaultMediaType,
                    body: JSON.stringify(formData),
                    headers: {
                        'Content Type': utils.defaultMediaType,
                        'Authorization': 'Bearer ' + accessToken
                    }
                }
            )
        )
        .then(function(response) {
            switch(response.status) {
                case utils.statusCodes.ok:
                    response.json().then(data => {
                        resolve(data);
                    });
                    break;
    
                case utils.statusCodes.created:
                    response.text().then(data => {
                        resolve('data created');
                    });
                    break;
    
                case utils.statusCodes.noContent:
                    response.text().then(data => {
                        resolve('no content returned.')
                    });
                    break;
    
                case utils.statusCodes.badRequest:
                    reject('Bad Request');
                    break;
    
                case utils.statusCodes.serverError:
                    reject('Server Error');
                    break;
    
                default:
                    resolve();
                    break; 
            }
        });
    });
}


