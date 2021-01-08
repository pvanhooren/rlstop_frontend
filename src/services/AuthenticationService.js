class AuthenticationService{
    logOut(history){
        localStorage.clear();
        history.push("/me/login")
    }

    isLoggedIn() {
        if(localStorage.getItem('token') != null && localStorage.getItem('token') !== ""){
            return true
        } else {
            return false
        }
        // return !!(localStorage.getItem('token') != null & localStorage.getItem('token') !== "");
    }

    getHeaders() {
        return {
            withCredentials: true,
            authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }

    baseUrl= "http://localhost:8080/"
    adminCode = "Ballistic"
}

export default new AuthenticationService();