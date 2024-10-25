import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../components/elements/InputField';
import Button from '../components/elements/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginImage from '../images/login.jpg';
import { useTranslation } from 'react-i18next';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post(`${API_BASE_URL}/api/auth/register`, {
                name,
                email,
                password
            });

            // Redirect to the page they intended to go after registration
            const redirectTo = new URLSearchParams(location.search).get('redirectTo') || '/dashboard';
            navigate(redirectTo);
        } catch (err) {
            setError(t('registerError'));
        }
    };

    return (
        <div className="container max-w-7xl h-full mx-auto px-4 flex flex-col-reverse md:flex-row justify-center py-32">
            {/* Left: Image */}
            <div className="hidden md:block h-full h-full w-full md:w-1/2 flex">
                <img className="aspect-square object-cover h-full w-full" src={LoginImage} alt="backpack" />
            </div>

            {/* Right: Register Form */}
            <div className="w-full md:w-1/2 flex flex-col md:justify-center md:px-16 py-32">
                <h1 className="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white md:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{t('register')}</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label={t('name')}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputField
                        label={t('email')}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password Input */}
                    <div className="mb-6">
                        <InputField
                            label={t('password')}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Register Button */}
                    <Button
                        label={t('register')}
                        onClick={() => { }}
                        type="submit"
                        variant="primary"
                    />
                </form>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Login Link */}
                <p className="text-center text-gray-600 dark:text-gray-300  mt-6">
                    {t('alreadyHaveAnAccount')} <a href="/login" className="text-blue-600 hover:underline">{t('login')}</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
