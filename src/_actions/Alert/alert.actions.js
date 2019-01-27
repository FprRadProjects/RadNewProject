import { alertContants } from '../../_contants/index';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertContants.SUCCESS, message };
}

function error(message) {
    return { type: alertContants.ERROR, message };
}

function clear() {
    return { type: alertContants.CLEAR };
}