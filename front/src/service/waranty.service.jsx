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
    return AxiosClient.delete(`/warranty/${warrantyId}`);
  }

const editWarranty = (data) => {
    return AxiosClient.put('/warranty/edit', data);
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