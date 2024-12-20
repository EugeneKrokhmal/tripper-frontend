import React from 'react';
import AdminIcon from '../../images/icons/admin.png';

interface UserIconProps {
    userName: string;
    isAdmin?: boolean;
    userId?: string;
    profilePhoto?: string;
    size?: string;
    border?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ userName, userId, size, profilePhoto, border, isAdmin }) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    let className;

    switch (size) {
        case 'xs':
            className = 'w-6 min-w-6 h-6 md:w-8 md:h-8 md:min-w-8'
            break;

        case 'sm':
            className = 'w-8 min-w-8 h-8 md:w-10 md:h-10 md:min-w-10'
            break;

        case 'md':
            className = 'w-10 min-w-10 h-10 md:w-12 md:h-12 md:min-w-12'
            break;

        default:
            break;
    }
    return (
        <div className="relative">
            <img
                key={userId}
                className={`${className} ${border} transition-all rounded-full object-cover`}
                src={(profilePhoto || profilePhoto === 'undefined') ? `${API_BASE_URL}/${profilePhoto}` : `https://ui-avatars.com/api/?name=${userName}&background=random`}
                alt={userName}
            />
            {isAdmin && (
                <img className="absolute bottom-0 -right-1 w-2/5" src={AdminIcon}/>
            )}
        </div>
    );
};

export default UserIcon;
