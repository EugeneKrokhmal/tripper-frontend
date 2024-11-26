import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { setProfilePhoto, updateUser, fetchProfilePhoto } from '../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/structure/Breadcrumbs';
import Button from '../components/elements/Button';
import InputField from '../components/elements/InputField';
import UploadIcon from '../images/icons/upload.svg';
import { uploadProfilePhoto, updateUserDetails } from '../api/userApi';
import Modal from '../components/elements/Modal';
import FAQ from './FAQ';

const SettingsPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [userNameInput, setUserNameInput] = useState<string>('');
    const [userEmailInput, setUserEmailInput] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const profilePhoto = useSelector((state: RootState) => state.auth.profilePhoto);
    const userName = useSelector((state: RootState) => state.auth.userName);
    const userEmail = useSelector((state: RootState) => state.auth.userEmail);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        setUserNameInput(userName || '');
        setUserEmailInput(userEmail || '');
    }, [userName, userEmail]);

    useEffect(() => {
        if (token) {
            dispatch(fetchProfilePhoto(token));
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewURL(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [selectedFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (!file.type.startsWith('image/')) {
                setUploadStatus('Please select a valid image file.');
                return;
            }
            setSelectedFile(file);
            setUploadStatus('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !token) {
            setUploadStatus('Please select a file first.');
            return;
        }

        try {
            const response = await uploadProfilePhoto(selectedFile, token);
            if (response) {
                dispatch(setProfilePhoto(response.profilePhoto));
                dispatch(fetchProfilePhoto(token));
                setUploadStatus('Upload successful!');
                setSelectedFile(null);
                setPreviewURL(null);
            } else {
                setUploadStatus('Upload failed.');
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            setUploadStatus('An error occurred during upload.');
        }
    };

    const handleSaveChanges = async () => {
        if (!token) return;

        try {
            const response = await updateUserDetails(userNameInput, userEmailInput, token);
            if (response) {
                dispatch(updateUser({ userName: userNameInput, userEmail: userEmailInput }));
                setUploadStatus('Profile updated successfully!');
                closeModal();
            } else {
                setUploadStatus('Update failed.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setUploadStatus('An error occurred while updating profile.');
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="container mx-auto mt-8 max-w-7xl">
            <Breadcrumbs breadcrumbs={[{ label: t('home'), href: '#/' }, { label: t('Settings'), href: '' }]} />

            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative min-w-24 w-24 h-24 mb-4">
                        <img
                            className="w-full h-full object-cover rounded-full"
                            src={previewURL || (profilePhoto ? `${API_BASE_URL}/${profilePhoto}` : UploadIcon)}
                            alt="Profile"
                        />
                        <span className="bottom-0 right-0 absolute w-8 h-8 bg-zinc-100 border-2 border-white dark:border-gray-800 rounded-full p-2 cursor-pointer">
                            <img src={UploadIcon} alt="upload" />
                            <label className="absolute inset-0 flex items-center justify-center bg-opacity-50 cursor-pointer">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                            </label>
                        </span>
                    </div>
                    <div>
                        <div className="flex justify-center gap-2">
                            <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">{userName}</h2>
                            <span
                                onClick={() => setModalVisible(true)}
                                className="self-center bg-zinc-100 text-zinc-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-zinc-900 dark:text-zinc-300">{t('edit')}</span>
                        </div>
                        <div className="flex justify-center gap-2">
                            <p className="text-gray-500 dark:text-gray-400">{userEmail}</p>
                            <span
                                onClick={() => setModalVisible(true)}
                                className="self-center bg-zinc-100 text-zinc-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-zinc-900 dark:text-zinc-300">{t('edit')}</span>
                        </div>
                    </div>
                </div>

                <div className="justify-center flex pt-4">
                    {previewURL && (
                        <Button variant={'primary'} onClick={handleUpload} label={t('Save Photo')} />
                    )}
                </div>

                {uploadStatus && <p className="py-2 text-sm">{uploadStatus}</p>}

                {modalVisible && (
                    <Modal onClose={() => { setModalVisible(false); }}>
                        <h3 className="mb-2 text-4xl font-extrabold text-zinc-900 dark:text-white md:text-3xl md:mt-4">
                            <span className="text-gradient">
                                {t('edit')}
                            </span>
                        </h3>
                        <InputField type={'text'} label={t('name')} value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
                        <InputField type={'text'} label={t('email')} value={userEmailInput} onChange={(e) => setUserEmailInput(e.target.value)} />

                        <div className="flex gap-2 mt-4">
                            <Button label={t('save')} onClick={handleSaveChanges} variant="primary" />
                            <Button label={t('cancel')} onClick={closeModal} variant="secondary" />
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;
