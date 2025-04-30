import AxiosClient from "./caller.service";


const addWarranty = (data) => {
    const token = localStorage.getItem('userToken');
    return AxiosClient.post(
      '/warranty/add',
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };
  

const getWarrantyByUserId = (userId) => {
    const token = localStorage.getItem('userToken');
    return AxiosClient.get(`/warranty/${userId}` ,{ headers: { Authorization: `Bearer ${token}` } });
  }

const deleteWarranty = (warrantyId) => {
    const token = localStorage.getItem('userToken');
    return AxiosClient.delete(`/warranty/delete/${warrantyId}`,{ headers: { Authorization: `Bearer ${token}` } });
  }

const editWarranty = (warantyId, data) => {
    const token = localStorage.getItem('userToken');
    return AxiosClient.put(`/warranty/edit/${warantyId}`, data , { headers: { Authorization: `Bearer ${token}` } });
  }

const getWarrantyById = (warrantyId) => {
    return AxiosClient.get(`/warranty/${warrantyId}`);
  }

export const WarrantyService = {
    addWarranty,
    getWarrantyByUserId,
    deleteWarranty,
    editWarranty,
    getWarrantyById
  };