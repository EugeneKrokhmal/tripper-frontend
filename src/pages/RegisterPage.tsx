import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../components/elements/InputField';
import Button from '../components/elements/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginImage from '../images/gallery/11.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const redirect = new URLSearchParams(location.search).get('redirect') || '/dahboard';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post(`${API_BASE_URL}/api/auth/register`, {
                name,
                email,
                password
            });

            navigate(`/login?redirect=${redirect}`);

        } catch (err) {
            setError(t('registerError'));
        }
    };

    return (
        <div className="container max-w-7xl mx-auto h-full flex flex-wrap flex-col justify-center h-[50vh] md:justify-start md:flex-row md:px-4">
            <div className="z-10 w-full md:w-2/5 flex self-center flex-col px-4 md:px-4 p-6 md:py-8 bg-white dark:bg-zinc-800 rounded">
                <h1 className="mb-4 text-5xl font-extrabold text-zinc-900 dark:text-white md:text-6xl">
                    <span className="text-gradient">{t('register')}</span>
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
                <p className="text-center text-zinc-600 dark:text-zinc-300  mt-6">
                    {t('alreadyHaveAnAccount')} <Link to={redirect ? `/login?redirect=${redirect}` : `/login`} className="text-zinc-950 dark:text-zinc-100 hover:underline">{t('login')}</Link>
                </p>
            </div>

            <div className="z-0 absolute bottom-0 md:top-0 left-0 right-0 h-48 md:block md:h-full w-full bg-black">
                <img
                    className={`aspect-square object-cover h-full w-full transition-opacity duration-700`}
                    src={LoginImage}
                    alt="step image"
                />
            </div>
        </div>
    );

};

export default RegisterPage;
