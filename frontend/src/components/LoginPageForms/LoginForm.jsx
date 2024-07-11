import React, { useState } from 'react';
import ky from 'ky';
import { SettingStore } from '../../State/useState';
import { useCookies } from 'react-cookie';
import { compareSync } from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const url_log = "http://localhost:3000/login";

function LoginForm() {

    const changeAuth = SettingStore((state) => state.changeAuth);
    const [cookies] = useCookies(["user"]);
    const user = cookies.user;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user!==undefined && formData.username === user.username && compareSync(formData.password, user.password)) {
            changeAuth();
            navigate('/account');
            return;
        }
        try {
            await ky.post(url_log, { json: { username: formData.username, password: formData.password }, credentials: 'include' });
            changeAuth();
            navigate('/account');
            return;
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // Логика для входа через Google
            console.log('Успешный вход через Google');
        } catch (error) {
            console.error('Ошибка входа через Google:', error);
        }
    };

    return (
        <div>
            <h3 className="about-h">Login</h3>
            <form onSubmit={handleSubmit}>
                <input className="login-input" type="text" name="username" placeholder="Username" required onChange={handleChange} />
                <input className="login-input" type="password" name="password" placeholder="Password" required onChange={handleChange} />
                <button className="login-button" type="submit">Login</button>
            </form>
            <p className="about-p" style={{ textAlign: "center" }}>or</p>
            <button className="login-button" onClick={handleGoogleLogin}><i className='fa fa-google'></i>  Login with Google</button>
        </div>
    );
}

export { LoginForm };