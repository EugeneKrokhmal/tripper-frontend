import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import UploadIcon from '../images/icons/upload.svg';

interface ImageUploadProps {
    tripId: string;
    onImageUploadSuccess: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ tripId, onImageUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            setUploading(true);
            setError(null);

            const response = await axios.post(
                `${API_BASE_URL}/api/trips/${tripId}/upload-image`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            // Call the parent handler with the new image URL
            onImageUploadSuccess(response.data.imageUrl);

            setUploading(false);
            setPreviewUrl(null);
            setSelectedFile(null);
        } catch (err) {
            setUploading(false);
            setError('Failed to upload image. Please try again.');
        }
    };

    const cancelUpload = () => {
        setPreviewUrl(null);
        setSelectedFile(null);
        setError(null);
    }

    return (
        <div className="bg-white rounded py-2 px-2">
            <label className="custom-file-upload">
                <img src={UploadIcon} alt="Upload cover" />
                <input
                    className="hidden"
                    id="tripImageUpdate"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </label>

            {/* Image preview and actions */}
            {previewUrl && (
                <div className="absolute left-0 top-0 bottom-0 right-0">
                    <img src={previewUrl} alt="Image preview" className="object-cover w-full h-full" />
                    <div className="z-10 absolute top-4 right-4 flex gap-2">
                        <button
                            className="cursor-pointer bg-white rounded py-2 px-2 text-xs"
                            onClick={handleUpload}
                        >
                            {t('save')}
                        </button>
                        <button
                            className="cursor-pointer bg-white rounded py-2 px-2 text-xs text-red-500"
                            onClick={cancelUpload}
                        >
                            {t('cancel')}
                        </button>
                    </div>
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ImageUpload;
