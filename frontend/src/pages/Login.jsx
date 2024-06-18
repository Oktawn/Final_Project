function Login() {
    return (
        <div className="login-form" >
            <form action="" method="post" id="Register">
                <h3 className="about-h">Register</h3>
                <input className="login-input" type="text" name="username" placeholder="Username" required />
                <input className="login-input" type="email" name="email" placeholder="Email" required />
                <input className="login-input" type="password" name="password" placeholder="Password" required />
                <button className="login-button" type="submit">Register</button>
            </form>

            <form action="" method="post" id="Login" >
                <h3 className="about-h">Login</h3>
                <input className="login-input" type="email" name="email" placeholder="Email" required />
                <input className="login-input" type="password" name="password" placeholder="Password" required />
                <button className="login-button" type="submit">Login</button>
                <p className="about-p" style={{ textAlign: "center" }}>or</p>
                <button className="login-button"><i className='fa fa-google'></i> Log in with Google</button>
            </form>

        </div>
    )
}
export default Login;