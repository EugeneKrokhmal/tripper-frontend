import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
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
                `${API_BASE_URL}/api/trips/${tripId}/upload-image`, // Backend route
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setUploading(false);
            onImageUploadSuccess(response.data.imageUrl);
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

            {/* Show image preview */}
            {previewUrl && (
                <div>
                    <img
                        src={previewUrl}
                        alt="Image preview"
                        className="bg-white w-full h-full object-cover absolute top-0 end-0 bottom-0 start-0"
                    />
                    <div className="absolute top-4 end-4 flex gap-2">
                        <a
                            className="cursor-pointer text-xs block bg-white rounded py-2 px-2"
                            onClick={handleUpload}
                        >
                            {t('save')}
                        </a>
                        <a
                            className="text-red-500 cursor-pointer text-xs block bg-white rounded py-2 px-2"
                            onClick={cancelUpload}
                        >
                            {t('cancel')}
                        </a>
                    </div>
                </div>
            )}

            {/* Show error if any */}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ImageUpload;
