import cookie from 'js-cookie';

export const authenticate = (res, next) => {
    cookie.set('token', res.data.token, {expires: 1});
    localStorage.setItem('user', JSON.stringify(res.data.user.id))
    next();
}

// id => _id
export const googleAuth = (res, next) => {
    cookie.set('token', res.data.token, {expires: 1});
    localStorage.setItem('user', JSON.stringify(res.data.user._id))
    next();
}

export const isAuth = () => {
    const token = cookie.get('token');
    const loggedUser = localStorage.getItem('user');
    if(token && loggedUser){
        return JSON.parse(loggedUser);
    } else {
        return false;
    }
}

export const signout = next => {
    cookie.remove('token', {expires: 1});
    localStorage.removeItem('user');
    next();
}