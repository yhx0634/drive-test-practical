import axios from 'axios';

export function getQuesList(type, limit) {
    const API_HOST = `http://api/questions?type=${type}&&limit=${limit}`
    const data = axios.get(API_HOST)
        .then(function (response) {
            if(response.status === 200 && response.data.code === 0) {
                return {code:0, data:response.data.doc}
            } else {
                return {code:1, msg:'connect failed'}
            }
        })
        .catch(function (error) {
            return {code:1, msg:'connect failed'}
        });
    return data
}