function Login() {
    return (
        <div>
            <h1>Login</h1>
            <label htmlFor="email">Email</label>
            <input type="email" />
            <label htmlFor="password">Password</label>
            <input type="password" />
            <button><i className='fa fa-google'></i> Google Sign In</button>
            <button> Register </button>
            <button> Login </button>
        </div>
    )
}
export default Login;