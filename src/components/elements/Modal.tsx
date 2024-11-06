import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Trigger show class on mount
        return () => setIsVisible(false); // Reset on unmount
    }, []);

    const handleOutsideClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            setIsVisible(false);
            setTimeout(onClose, 300); // Delay onClose to allow fade-out
        }
    };

    return ReactDOM.createPortal(
        <div
            className={`modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 ${
                isVisible ? 'show' : ''
            }`}
            onClick={handleOutsideClick}
        >
            <div
                className={`modal-content bg-white dark:bg-zinc-800 rounded-lg shadow-lg px-2 py-4 w-full max-w-lg relative ${
                    isVisible ? 'show' : ''
                }`}
            >
                <button
                    className="absolute top-6 right-4 text-zinc-500 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-white"
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement // Ensure a div with id 'modal-root' in your HTML
    );
};

export default Modal;
