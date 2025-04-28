import AxiosClient from "./caller.service";

const resgister = (data) => {
    return AxiosClient.post('/register', data);
       
}

const login = (data) => {
    return AxiosClient.put('/login', data);
       
}

const getUserById = (userId) => {
    return AxiosClient.get(`/user/${userId}`);
}

const deletePicture = (data) => {
    return AxiosClient.put(`/picture/delete`, data);
}

const uploadPicture = (data) => {
    return AxiosClient.post('/upload', data);
}

const editUsername = (data) => {
    return AxiosClient.put('/edit/username', data);
}

const editEmail = (data) => {
    return AxiosClient.put('/edit/email', data);
}

const editPassword = (data) => {
    return AxiosClient.put('/edit/password', data);
}

const getAllPicturesbyUserId = (userId) => {
    return AxiosClient.get(`/pictures/${userId}`);
}

const resetPassword = (data) => {
    return AxiosClient.post('/forgot-password', data);
}

const resetPasswordFinalize = (data) => {
    return AxiosClient.post('/reset-password', data);
}


export const UserService = {
    resgister,
    login,
    getUserById,
    deletePicture,
    uploadPicture,
    editUsername,
    editEmail,
    editPassword,
    getAllPicturesbyUserId,
    resetPassword,
    resetPasswordFinalize,

}