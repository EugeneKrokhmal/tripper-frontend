import React from 'react';
import AdImage from '../../images/ad/donate.png';


const Ad: React.FC = () => {

    return (
        <>
            <div className="mb-6 rounded overflow-hidden">
                <a href="https://war.ukraine.ua/donate/">
                    <img src={AdImage} alt="" />
                </a>
            </div>
        </>
    );
};

export default Ad;
