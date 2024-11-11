import React from 'react';

interface UserIconProps {
    userName: string;
    userId?: string;
    profilePhoto?: string;
    size?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ userName, userId, size, profilePhoto }) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    let className;

    switch (size) {
        case 'xs':
            className = 'w-6 h-6 md:w-8 md:h-8'
            break;

        case 'sm':
            className = 'w-8 h-8 md:w-10 md:h-10'
            break;

        case 'md':
            className = 'w-10 h-10 md:w-12 md:h-12'
            break;

        default:
            break;
    }
    return (
        <img
            key={userId}
            className={`${className} transition-all border-2 border-white rounded-full dark:border-zinc-800 object-cover`}
            src={(profilePhoto || profilePhoto === 'undefined') ? `${API_BASE_URL}/${profilePhoto}` : `https://ui-avatars.com/api/?name=${userName}&background=random`}
            alt={userName}
        />
    );
};

export default UserIcon;
