import axios from "axios";

const API_URL_OLD = 'https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app'
const API_URL_NEW = 'https://realestatebackend-woad.vercel.app'

export function register(data) {
  return axios.post(
    `${API_URL_NEW}/users/register`,
    data,
  );
}

export function login(data) {
  return axios.post(
    `${API_URL_NEW}/users/login`,
    data,
  );
}

export function sendOTP(data) {
  console.log(data);
  return axios.get(
    `${API_URL_NEW}/users/verify-otp`,
    {
      params: data,
    },
  );
}
