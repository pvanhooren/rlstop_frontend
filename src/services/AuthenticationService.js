class AuthenticationService{
    logOut(history){
        localStorage.clear();
        history.push("/me/login")
    }

    isLoggedIn() {
        return !!(localStorage.getItem('token') != null & localStorage.getItem('token') !== "");
    }

    headers = {
        headers: {
            withCredentials: true,
            authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }

    baseUrl= "http://localhost:8080/"
}

export default new AuthenticationService();