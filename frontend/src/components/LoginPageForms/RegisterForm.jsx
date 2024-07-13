import React, { useState } from 'react';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';
import { SettingStore } from '../../State/useState';


const url_reg = "http://localhost:3000/register";
const url_log = "http://localhost:3000/login";

function RegistrationForm() {

    const navigate = useNavigate();
    const changeAuth = SettingStore((state) => state.changeAuth);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await ky.post(url_reg, { json: { username: formData.username, email: formData.email, password: formData.password } });
            await ky.post(url_log, { json: { username: formData.username, password: formData.password }, credentials: 'include' });
            
            console.log('Пользователь успешно зарегистрирован');
            changeAuth();
            navigate('/account');
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="about-h">Register</h3>
            <input className="login-input" type="text" name="username" placeholder="Username" required onChange={handleChange} />
            <input className="login-input" type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input className="login-input" type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <button className="login-button" type="submit">Register</button>
        </form>
    );
}

export { RegistrationForm };