import { LoginForm } from "../components/LoginPageForms/LoginForm";
import { RegistrationForm } from "../components/LoginPageForms/RegisterForm";


function Login() {
    return (
        <div className="login-form" >
            <RegistrationForm />

            <LoginForm />

        </div>
    )
}
export default Login;