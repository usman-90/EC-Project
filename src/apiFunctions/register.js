import axios from "axios";

export function register(data) {
  return axios.post(
    "https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app/users/register",
    data,
  );
}

export function login(data) {
  return axios.post(
    "https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app/users/login",
    data,
  );
}

export function sendOTP(data) {
  console.log(data);
  return axios.get(
    `https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app/users/verify-otp`,
    {
      params: data,
    },
  );
}
