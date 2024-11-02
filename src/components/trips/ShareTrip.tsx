import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../elements/Button';
import Modal from '../elements/Modal';
import ShareIcon from '../../images/icons/team.svg';

interface ShareTripProps {
    isOwner: boolean;
    joinLink: string | null;
    onGenerateJoinLink: () => void;
    loadingJoinLink: boolean;
    error: string | null;
}

const ShareTrip: React.FC<ShareTripProps> = ({
    isOwner,
    joinLink,
    onGenerateJoinLink,
    loadingJoinLink,
    error,
}) => {
    const [linkGenerated, setLinkGenerated] = useState<boolean>(!!joinLink);
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const [IsShareModalOpen, setIsShareModalOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (joinLink) {
            setLinkGenerated(true);
        }
    }, [joinLink]);

    const handleCopyLink = () => {
        if (joinLink) {
            navigator.clipboard.writeText(joinLink)
                .then(() => setCopySuccess(true))
                .catch(() => setCopySuccess(false));
        }
    };

    const shareViaWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(joinLink || '')}`;
        window.open(whatsappUrl, '_blank');
    };

    const shareViaTelegram = () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(joinLink || '')}`;
        window.open(telegramUrl, '_blank');
    };

    const shareViaSMS = () => {
        const smsUrl = `sms:?&body=${encodeURIComponent(joinLink || '')}`;
        window.open(smsUrl);
    };

    const openShareTripModal = () => {
        setIsShareModalOpen(true);
    };

    const closeShareTripModal = () => {
        setIsShareModalOpen(false);
    };

    return (
        <div className="z-10 absolute end-4 bottom-0 flex justify-end p-3">
            <button className="flex gap-2 w-32 justify-center bg-white rounded py-2 px-2" onClick={() => setIsShareModalOpen(true)} title={t('share')}>
                <img width="16" src={ShareIcon} alt="" />
                <span className="text-xs">{t('invite')}</span>
            </button>
            {isOwner && IsShareModalOpen && (
                <>
                    <Modal onClose={closeShareTripModal}>
                        {linkGenerated ? (
                            <>

                                <h3 className="mb-2 text-2xl font-extrabold text-zinc-900 dark:text-white md:text-2xl mt-4">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">{t('inviteFriends')}</span>
                                </h3>
                                <div className="relative w-full">
                                    <input
                                        id="share-trip-btn"
                                        type="text"
                                        className="pr-12 col-span-6 bg-gray-50 border border-zinc-300 text-zinc-500 dark:text-zinc-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-zinc-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={joinLink || ''}
                                        disabled
                                        readOnly
                                    />
                                    <button
                                        onClick={handleCopyLink}
                                        className="absolute end-2 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-300  dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                                    >
                                        {!copySuccess ? (
                                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                            </svg>
                                        )}
                                    </button>

                                    <div id="tooltip-copy-share-trip-btn" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-zinc-700">
                                        <span id="default-tooltip-message">
                                            {copySuccess ? 'Copied!' : 'Copy to clipboard'}
                                        </span>
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-4">
                                    {/* Telegram */}
                                    <button
                                        onClick={shareViaTelegram}
                                        className="text-blue-500 hover:text-blue-600 underline"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="Telegram" width="32" height="32" viewBox="0 0 512 512"><rect width="512" height="512" fill="#37aee2" rx="15%" /><path fill="#c8daea" d="M199 404c-11 0-10-4-13-14l-32-105 245-144" /><path fill="#a9c9dd" d="M199 404c7 0 11-4 16-8l45-43-56-34" /><path fill="#f6fbfe" d="m204 319 135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4" /></svg>
                                    </button>

                                    {/* WhatsApp */}
                                    <button
                                        onClick={shareViaWhatsApp}
                                        className="text-green-500 hover:text-green-600 underline"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp" width="32" height="32" viewBox="0 0 512 512"><rect width="512" height="512" fill="#25d366" rx="15%" /><path fill="#25d366" stroke="#fff" strokeWidth="26" d="m123 393 14-65a138 138 0 1 1 50 47z" /><path fill="#fff" d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18" /></svg>
                                    </button>

                                    {/* SMS */}
                                    <button
                                        onClick={shareViaSMS}
                                        className="text-zinc-500 dark:text-zinc-300  hover:text-zinc-600 dark:text-zinc-300  underline"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 52 52"><path d="M26 4C12.7 4 2.1 13.8 2.1 25.9c0 3.8 1.1 7.4 2.9 10.6.3.5.4 1.1.2 1.7l-3.1 8.5c-.3.8.5 1.5 1.3 1.3l8.6-3.3c.5-.2 1.1-.1 1.7.2 3.6 2 7.9 3.2 12.5 3.2C39.3 48 50 38.2 50 26.1 49.9 13.8 39.2 4 26 4zm-9.6 25.6c-.3.5-.6 1-1 1.3s-.9.6-1.5.8c-.5.2-1.1.2-1.7.2-.8 0-1.5-.1-2.2-.4-.7-.3-1.4-.7-1.9-1.3l-.2-.2c-.1-.1 0-.3.2-.5L9.7 28c.2-.2.4-.2.5-.1s.2.3.2.3c.2.3.5.5.8.7.5.3 1 .3 1.6.2.2 0 .3-.1.5-.2l.3-.3c.1-.1.1-.3.1-.4 0-.4-.1-.5-.2-.6-.2-.2-.5-.4-.9-.5s-.8-.3-1.3-.4c-.5-.2-1-.4-1.4-.6-.5-.3-.8-.7-1.1-1.1-.3-.5-.5-1.1-.5-1.9 0-.7.1-1.3.4-1.8.3-.5.6-.9 1.1-1.2.4-.3.9-.6 1.5-.7 1.2-.3 2.4-.3 3.6.1.6.2 1.2.6 1.5.8l.3.2c.2.1.1.4-.1.6l-1.5 1.5c-.2.2-.5.2-.7 0-.2-.1-.3-.3-.4-.3-.5-.3-1.2-.4-1.8-.3-.2 0-.3.1-.4.2l-.3.3c-.1.1-.1.2-.1.4 0 .3.1.4.2.5.2.2.5.3.9.5.4.1.8.3 1.3.4.5.2 1 .4 1.4.6.5.3.8.7 1.1 1.1.3.5.5 1.1.5 1.9 0 .6-.1 1.2-.4 1.7zM33 31c0 .6-.5 1-1.1 1h-1c-.6 0-.9-.4-.9-1v-5.9c0-.6-.8-.7-1-.2l-1.7 4.5c-.1.4-.5.6-.9.6h-.7c-.4 0-.8-.3-.9-.6L23 24.9c-.2-.5-1-.4-1 .2V31c0 .6-.5 1-1.1 1h-1c-.6 0-.9-.4-.9-1V20c0-.6.4-1 .9-1h2.6c.4 0 .8.3.9.6l2 5.2c.2.4.8.4.9 0l2-5.2c.1-.4.5-.6.9-.6h2.7c.6 0 1.1.4 1.1 1v11zm10.5-1.3c-.3.5-.6 1-1.1 1.3-.4.3-.9.6-1.5.8s-1.1.2-1.7.2c-.8 0-1.5-.1-2.2-.4-.7-.3-1.4-.7-1.9-1.3l-.2-.2c-.1-.1 0-.3.2-.5l1.6-1.5c.2-.2.4-.2.5-.1s.2.3.2.3c.2.3.5.5.8.7.5.3 1.1.3 1.6.2.2-.1.4-.1.5-.2l.3-.3c.1-.1.1-.3.1-.4 0-.4-.1-.5-.2-.6-.2-.2-.5-.4-.9-.5s-.8-.3-1.3-.4c-.5-.2-1-.4-1.4-.6-.5-.3-.9-.7-1.2-1.1-.3-.5-.5-1.1-.5-1.9 0-.7.1-1.3.4-1.8.3-.5.6-.9 1.1-1.2.4-.3 1-.6 1.5-.7 1.2-.3 2.4-.3 3.6.1.6.2 1.2.6 1.5.9l.3.3c.2.1.1.4-.1.6L42 22.9c-.2.2-.5.2-.7 0-.2-.1-.3-.3-.4-.3-.5-.3-1.2-.4-1.8-.3-.2 0-.3.1-.4.2l-.3.3c-.1.1-.1.3-.1.4 0 .3.1.4.2.5.2.2.5.3.9.5.4.1.8.3 1.3.4.5.2 1 .4 1.4.6.5.3.8.7 1.2 1.1.3.5.5 1.1.5 1.9.1.3 0 1-.3 1.5z" /></svg>
                                    </button>
                                </div>

                            </>
                        ) : (
                            <Button
                                label={loadingJoinLink ? "Generating Link..." : "Generate Join Link"}
                                onClick={onGenerateJoinLink}
                                variant="primary"
                                disabled={loadingJoinLink}
                            />
                        )}

                        {linkGenerated && (
                            <p className="text-xs text-zinc-500 dark:text-zinc-300  mt-2">
                                {t('ShareThisLinkToInviteOthersToThisTrip')}
                            </p>
                        )}
                    </Modal>
                </>
            )}

            {/* Error message if something goes wrong */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default ShareTrip;
