import AxiosClient from "./caller.service";

// Pour les appels génériques dont tu n’as pas encore défini le shape
type Payload = Record<string, unknown>;

const register = (data: Payload) => {
  return AxiosClient.post("/register", data);
};

const login = (data: Payload) => {
  return AxiosClient.put("/login", data);
};

const getUserById = (userId: string) => {
  return AxiosClient.get(`/user/${userId}`);
};

const deletePicture = (data: Payload) => {
  return AxiosClient.put("/picture/delete", data);
};


const uploadPicture = (data: FormData) => {
  return AxiosClient.post("/upload", data);
};

const editUsername = (data: Payload) => {
  return AxiosClient.put("/edit/username", data);
};

const editEmail = (data: Payload) => {
  return AxiosClient.put("/edit/email", data);
};

const editPassword = (data: Payload) => {
  return AxiosClient.put("/edit/password", data);
};

const getAllPicturesByUserId = (userId: string) => {
  return AxiosClient.get(`/pictures/${userId}`);
};

const resetPassword = (data: Payload) => {
  return AxiosClient.post("/forgot-password", data);
};

const resetPasswordFinalize = (data: Payload) => {
  return AxiosClient.post("/reset-password", data);
};

export const UserService = {
  register,
  login,
  getUserById,
  deletePicture,
  uploadPicture,
  editUsername,
  editEmail,
  editPassword,
  getAllPicturesByUserId,
  resetPassword,
  resetPasswordFinalize,
};