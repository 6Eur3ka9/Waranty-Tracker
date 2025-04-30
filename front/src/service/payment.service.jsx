import AxiosClient from "./caller.service";


const createSubscription = (data) => {
    const token = localStorage.getItem('userToken');
    return AxiosClient.post(
      '/payment/create-subscription',
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  const createPaymentIntent = (data) => {
    const token = localStorage.getItem('userToken');
    return AxiosClient.post(
      '/payment/create-payment-intent',
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  


  export const PaymentService = {
    createSubscription,
    createPaymentIntent,
  };