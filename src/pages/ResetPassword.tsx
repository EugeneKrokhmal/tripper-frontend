import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../components/elements/InputField';
import Button from '../components/elements/Button';
import Loader from '../components/structure/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginImage from '../images/gallery/8.jpg';

const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // Extract the token from the query parameters
    const token = new URLSearchParams(location.search).get('token');

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        if (!token) {
            setError(t('invalidTokenError'));
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
                token,
                newPassword,
            });

            setMessage(response.data.message);

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError(t('resetPasswordError'));
                }
            } else {
                setError(t('resetPasswordError'));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container max-w-7xl mx-auto h-full flex flex-wrap flex-col justify-center h-[50vh] md:justify-start md:flex-row md:px-4">
            <div className="z-10 w-full md:w-2/5 flex self-center flex-col px-4 md:px-4 p-6 md:py-8 bg-white dark:bg-zinc-800 rounded">
                <h1 className="mb-4 text-5xl font-extrabold text-zinc-900 dark:text-white md:text-6xl">
                    <span className="text-transparent dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">
                        {t('resetPassword')}
                    </span>
                </h1>

                <form onSubmit={handleResetPassword}>
                    <InputField
                        label={t('newPassword')}
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
            <div className="z-0 absolute top-0 left-0 right-0 md:block h-full w-full hidden bg-black opacity-50">
                <img
                    className="aspect-square object-cover h-full w-full transition-opacity duration-700"
                    src={LoginImage}
                    alt="login"
                />
            </div>
        </div>
    );
};

export default ResetPassword;
