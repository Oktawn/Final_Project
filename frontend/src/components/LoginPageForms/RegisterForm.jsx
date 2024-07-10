import React, { useState } from 'react';
import ky from 'ky';


const url_reg = "http://localhost:3000/register";

function RegistrationForm() {
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
            await ky.post(url_reg, { json: formData });
            console.log('Пользователь успешно зарегистрирован');
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