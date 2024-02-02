import axios from "axios";

const API_URL_OLD = 'https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app'
const API_URL_NEW = 'https://realestatebackend-woad.vercel.app'
const Local_Host_URL = 'http://10.0.2.2:4000';

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
  console.log("OTP sent", data);
  return axios.get(
    `${API_URL_NEW}/users/verify-otp`,
    {
      params: data,
    },
  );
}

export function resetPassword(data) {
  console.log("reset password data", data, `${API_URL_NEW}/users/reset-password`);
  return axios.post(
    `${API_URL_NEW}/users/reset-password`,
    data
  );
}

export function updateResetPassword(data) {
  console.log("reset password data", data, `${API_URL_NEW}/users/reset-password`);
  return axios.put(
    `${API_URL_NEW}/users/reset-password`,
    data
  );
}
