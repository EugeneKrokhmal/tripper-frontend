import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputField from '../components/elements/InputField';
import Button from '../components/elements/Button';
import Loader from '../components/structure/Loader'; // Import Loader component
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import LoginImage from '../images/login.jpg';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Loading state for Loader
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { t } = useTranslation();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // Set loading to true at the start of the request

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                email,
                password,
            });

            const { token, userId, userName } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userName', userName);
            localStorage.setItem('user', email);

            dispatch(login({
                user: email,
                userName,
                userId,
                token,
            }));

            navigate(redirect);
        } catch (err) {
            setError(t('loginError'));
        } finally {
            setLoading(false); // Stop loading once the request is complete
        }
    };

    return (
        <div className="container max-w-7xl mx-auto h-screen flex flex-wrap flex-col justify-center md:justify-start md:flex-row px-4 pb-32">
            <div className="z-10 w-full md:w-2/5 flex self-center flex-col px-4 md:px-4 p-6 md:py-8 bg-white dark:bg-gray-900 rounded">
                <h1 className="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white md:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{t('login')}</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <InputField
                        label={t('email')}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        label={t('password')}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Remember Me Checkbox */}
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="remember" name="remember" className="text-red-500" />
                        <label htmlFor="remember" className="text-green-900 ml-2">{t('rememberMe')}</label>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="mb-6 text-blue-500">
                        <a href="#" className="hover:underline">{t('forgotPassword')}</a>
                    </div>

                    {/* Login Button */}
                    <Button
                        label={t('login')}
                        onClick={() => { }}
                        type="submit"
                        variant="primary"
                    />
                </form>

                {loading && <Loader />} {/* Display Loader while loading */}

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Sign up Link */}
                <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
                    {t('dontHaveAnAccount')} <Link to="/register" className="text-blue-600 hover:underline">{t('register')}</Link>
                </p>
            </div>

            <div className="z-0 absolute top-0 left-0 right-0 md:block h-full w-full flex bg-black opacity-50 ">
                <img
                    className={`aspect-square object-cover h-full w-full transition-opacity duration-700`}
                    src={LoginImage}
                    alt="step image"
                />
            </div>


        </div>
    );
};

export default LoginPage;
