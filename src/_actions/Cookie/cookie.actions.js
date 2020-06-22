import Cookies from 'universal-cookie';

export const cookieAction = {
    setCookie,
    getCookie,
    removeCookie,
    updateCookie
};

function setCookie(cookieName, cookieValue) {
    const cookies = new Cookies();
    let expDate = new Date();
    expDate.setTime(expDate.getTime() + (30 * 60 * 1000));
    cookies.set(cookieName, cookieValue, { path: "/", expires: expDate });
}

function updateCookie(cookieName) {
    const cookies = new Cookies();
    let cuurentCookieValue = getCookie(cookieName);
    let expDate = new Date();
    expDate.setTime(expDate.getTime() + (30 * 60 * 1000));
    cookies.set(cookieName, cuurentCookieValue, { path: "/", expires: expDate });
}

function getCookie(cookieName) {
    const cookies = new Cookies();
    return cookies.get(cookieName);
}

function removeCookie(cookieName) {
    const cookies = new Cookies();
    cookies.set(cookieName, null, { expires: 0 });
}


