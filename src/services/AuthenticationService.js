class AuthenticationService{
    logOut(history){
        localStorage.clear();
        history.push("/me/login")
    }

    isLoggedIn() {
        return !!(localStorage.getItem('token') != null & localStorage.getItem('token') !== "");
    }
}

export default new AuthenticationService();