import service from './index';

export default {
    login(params) {
        return service({
            url: '/user/login',
            method: 'post',
            data: params
        })
    },
    register(params) {
        return service({
            url: '/user/register',
            method: 'post',
            params
        })
    }
}