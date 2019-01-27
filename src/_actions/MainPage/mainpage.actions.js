import { mainpageContants } from '../../_contants';

export const mainpageActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: mainpageContants.SUCCESS, message };
}

function error(message) {
    return { type: mainpageContants.ERROR, message };
}

function clear() {
    return { type: mainpageContants.CLEAR };
}