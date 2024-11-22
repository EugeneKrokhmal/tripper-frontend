import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import placeHolderImg from '../../images/gallery/1.jpg';

interface BlogArticleProps {
    title: string;
    content: string;
    date: string;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ title, content, date }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <a
            key={title}
            className={`overflow-hidden h-full transition-all transition-500 justify-end mb-4 flex items-center bg-white border border-zinc-200 dark:border-zinc-900 rounded-lg shadow md:flex-col-reverse flex-col-reverse dark:border-zinc-700 dark:bg-zinc-800`}
        >
            <div className="w-full flex-col flex px-2 pb-4 md:px-4 leading-normal bg-white dark:bg-zinc-900 h-2/3">
                <h1 className="mb-2 mt-4 text-3xl font-extrabold text-zinc-900 dark:text-white md:text-3xl">
                    <span
                        className="text-gradient cursor-pointer">
                        {title}
                    </span>
                </h1>
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <p className="font-normal text-xs text-zinc-500 dark:text-zinc-300  dark:text-zinc-400">
                            {content.slice(0,150)}...
                        </p>
                        <p className="mb-4">
                            <span className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">{date}</span>
                        </p>
                    </div>
                    <div className="flex justify-between mt-auto items-end">

                        <div className="flex">
                            <Button
                                label={t('View')}
                                onClick={() => navigate(``)}
                                variant="primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <img
                className="object-cover rounded-t min-h-32 max-h-32 w-full"
                src={placeHolderImg}
            />
        </a>
    );
};

export default BlogArticle;

