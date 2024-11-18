import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../components/elements/InputField';
import Button from '../components/elements/Button';
import Loader from '../components/structure/Loader';
import LoginImage from '../images/gallery/7.jpg';
import { useTranslation } from 'react-i18next';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/request-password-reset`, { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(t('forgotPasswordError'));
        } finally {
            setLoading(false);
        }
    };

    return (
<div className="container max-w-7xl mx-auto h-screen flex flex-wrap flex-col justify-center md:justify-start md:flex-row px-4 pb-32">
<div className="z-10 w-full md:w-2/5 flex self-center flex-col px-4 md:px-4 p-6 md:py-8 bg-white dark:bg-zinc-900 rounded">
    <h1 className="mb-4 text-5xl font-extrabold text-zinc-900 dark:text-white md:text-6xl">
        <span className="text-transparent dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">
            {t('forgotPassword')}
        </span>
    </h1>
    <form onSubmit={handleForgotPassword}>
                <InputField
                    label={t('email')}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    label={t('submit')}
                    type="submit"
                    variant="primary"
                />
                {loading && <Loader />}
                {message && <p className="text-green-500 mt-4">{message}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
</div>

{/* Background image */}
<div className="z-0 absolute top-0 left-0 right-0 md:block h-full w-full flex bg-black opacity-50">
    <img
        className="aspect-square object-cover h-full w-full transition-opacity duration-700"
        src={LoginImage}
        alt="login"
    />
</div>
</div>        
    );
};

export default ForgotPassword;
