import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import BlogArticle from '../components/elements/BlogArticle';
import Ad from '../components/structure/Ad';
import Breadcrumbs from '../components/structure/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import Loader from '../components/structure/Loader';
import { useNavigate } from 'react-router-dom';

const Blog: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [articles, setArticles] = useState<any[]>([]);
    const { t } = useTranslation();
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const breadcrumbs = [
        { label: t('home'), href: '#/' },
        { label: t('Blog'), href: '/Blog' },
    ];

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://dummyjson.com/posts').then(res => res.json())
                console.log(response);

                setArticles(response.posts);
            } catch (err) {
                setError('Failed to fetch blog articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchArticles();
        } else {
            navigate('/login');
        }
    }, [API_BASE_URL, token, isAuthenticated, navigate]);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="container max-w-7xl mx-auto mt-8">
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className="px-4 pt-16">
                <h1 className="mb-4 text-3xl font-extrabold text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-gradient">{t('Blog')}</span>
                </h1>
            </div>

            <div className="w-full content-start px-4">
                <div className="grid lg:grid-cols-3 gap-4">
                    {articles.length === 0 ? (
                        <p>{t('noBlogPosts')}</p>
                    ) : (
                        articles.map((article) => (
                            <BlogArticle
                                key={article._id}
                                title={article.title}
                                content={article.body}
                                date={article.createdAt}
                            />
                        ))
                    )}
                </div>

                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default Blog;
