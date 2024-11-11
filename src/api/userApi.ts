import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const uploadProfilePhoto = async (selectedFile: File, token: string) => {
    const formData = new FormData();
    formData.append('profilePhoto', selectedFile);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/user/upload-photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateUserDetails = async (userName: string, userEmail: string, token: string) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/user/update`,
            { userName, userEmail },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};
