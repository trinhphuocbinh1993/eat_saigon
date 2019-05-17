const userService = {
   
    isAuthenticated,
    requireAuth
    };

function isAuthenticated() {
    return localStorage.getItem('user') ? true : false;
}

function requireAuth(nextState, replace) {
    if (!isAuthenticated()) {
        replace({ pathname: '/' });
    }
}

export default userService