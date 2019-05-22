const Auth = {
    Logout: ()  => {
        localStorage.clear()
        window.location.href = '/'
    }
}

export default Auth