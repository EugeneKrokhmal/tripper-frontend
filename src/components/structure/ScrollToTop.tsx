import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const scroller = document.querySelector('.scroller');

        if (scroller) {
            scroller.scrollTop = 0;
        }

    }, [pathname]);

    return null;
};

export default ScrollToTop;
