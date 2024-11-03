import React from 'react';
import AdImage from '../../images/ad/donate.png';
import AdImage2 from '../../images/ad/ad2.png';


const Ad: React.FC = () => {

    return (
        <>
            <div className="mb-6 rounded overflow-hidden">
                <a href="https://war.ukraine.ua/donate/">
                    <img src={AdImage} alt="" />
                </a>
            </div>

            <div className="mb-6 rounded overflow-hidden">
                <a href="https://www.instagram.com/debtors_chaotic/">
                    <img src={AdImage2} alt="" />
                </a>
            </div>
        </>
    );
};

export default Ad;
