import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setProfilePhoto, updateUser } from '../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/structure/Breadcrumbs';
import Button from '../components/elements/Button';
import InputField from '../components/elements/InputField';
import UploadIcon from '../images/icons/upload.svg';
import { uploadProfilePhoto, updateUserDetails } from '../api/userApi';

const SettingsPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [userNameInput, setUserNameInput] = useState<string>('');
    const [userEmailInput, setUserEmailInput] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const profilePhoto = useSelector((state: RootState) => state.auth.profilePhoto);
    const userName = useSelector((state: RootState) => state.auth.userName);
    const userEmail = useSelector((state: RootState) => state.auth.user);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setUploadStatus('Please select a valid image file.');
                return;
            }
            setSelectedFile(file);
            setUploadStatus('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file first.');
            return;
        }

        try {
            const response = await uploadProfilePhoto(selectedFile, token || '');
            if (response.status === 200) {
                setUploadStatus('Upload successful!');
                const newProfilePhoto = response.data.profilePhoto;

                // Update profile photo in Redux
                dispatch(setProfilePhoto(newProfilePhoto));
            } else {
                setUploadStatus('Upload failed. Please try again.');
            }
        } catch (error: any) {
            console.error('Error uploading file:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setUploadStatus(`Error: ${error.response.data.error}`);
            } else {
                setUploadStatus('An error occurred during the upload. Please try again later.');
            }
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await updateUserDetails(userNameInput, userEmailInput, token || '');
            if (response.status === 200) {
                dispatch(updateUser({ userName: userNameInput, userEmail: userEmailInput }));
                setUploadStatus('Profile updated successfully!');
            } else {
                setUploadStatus('Update failed. Please try again.');
            }
        } catch (error: any) {
            console.error('Error updating profile:', error);
            setUploadStatus('An error occurred during the update. Please try again later.');
        }
    };

    return (
        <div className="container max-w-7xl mx-auto mt-8">
            <Breadcrumbs breadcrumbs={[{ label: t('home'), href: '#/' }, { label: t('Settings'), href: '' }]} />

            <div className="px-4 py-16">
                <div className="relative w-full max-w-screen-xl mx-auto">
                    <h1 className="mb-4 text-3xl font-extrabold text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-gradient">{t('Settings')}</span>
                    </h1>

                    <div className="flex w-full gap-8 items-start flex-col md:flex-row justify-between">
                        <div className="w-full md:w-1/4 items-start flex-col gap-4 items-center">
                            <div className="relative flex rounded-full w-32 h-32 overflow-hidden mb-2">
                                <img className="w-full h-full object-cover" src={`${API_BASE_URL}/${profilePhoto}` || ''} />
                                <label className="absolute grid content-center justify-center left-0 top-0 right-0 bottom-0 opacity-70 bg-white cursor-pointer">
                                    <input className="sr-only" type="file" accept="image/*" onChange={handleFileChange} />
                                    <img src={UploadIcon} alt="upload" className="w-16 h-16" />
                                </label>
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-zinc-800 dark:text-zinc-100">{userName}</h4>
                                <p className="font-bold mb-2 text-zinc-800 dark:text-zinc-100">{userEmail}</p>
                                <div className="upload-section">
                                    {uploadStatus && <p>{uploadStatus}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/4">
                            <h3 className="font-bold text-xl text-gradient mb-2">{t('Profile data')}</h3>
                            <div>
                                <InputField
                                    label={t('name')}
                                    onChange={(e) => setUserNameInput(e.target.value)}
                                    type={'text'}
                                    value={userNameInput || userName || ''}
                                />
                                <InputField
                                    label={t('email')}
                                    onChange={(e) => setUserEmailInput(e.target.value)}
                                    type={'text'}
                                    value={userEmailInput || userEmail || ''}
                                />
                                <InputField label={t('password')} onChange={() => { }} type={'password'} value={''} />
                                <InputField label={t('Confirm password')} onChange={() => { }} type={'password'} value={''} />
                            </div>
                            <div className="flex justify-between gap-2">
                                <Button variant="primary" onClick={handleSaveChanges} label={t('Save')} />
                                <Button variant="secondary" onClick={() => { alert('think twice!') }} label={t('Delete profile')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
