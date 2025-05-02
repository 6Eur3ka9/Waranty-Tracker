// src/service/payment.service.js
import AxiosClient from './caller.service';

const createCheckoutSession = (data) => {
  const token = localStorage.getItem('userToken');
  return AxiosClient.post(`/payment/create-checkout-session` , data ,{ headers: { Authorization: `Bearer ${token}` } });
}

export const PaymentService = {
  createCheckoutSession,
};