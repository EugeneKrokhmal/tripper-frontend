import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Upload Profile Photo
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
        return response.data;
    } catch (error: any) {
        console.error('Error uploading profile photo:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to upload profile photo');
        }
        throw new Error('An unexpected error occurred');
    }
};

// Update User Details
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
        return response.data;
    } catch (error: any) {
        console.error('Error updating user details:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to update user details');
        }
        throw new Error('An unexpected error occurred');
    }
};

// Fetch Profile Photo
export const getProfilePhoto = async (token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.profilePhoto;
    } catch (error: any) {
        console.error('Error fetching profile photo:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to fetch profile photo');
        }
        throw new Error('An unexpected error occurred');
    }
};
