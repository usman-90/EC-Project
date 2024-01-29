import axios from "axios";
const API_URL_OLD = 'https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app'
const API_URL_NEW = 'https://realestatebackend-woad.vercel.app'

export function updatePassword(data) {
  console.log("update password data", data);  
  return axios.post(
    `${API_URL_NEW}/users/update-password`,data
  );
}



export function editProfile(data) {
  console.log("Edit profile data", data);
  return axios.post(
    `${API_URL_NEW}/users/edit-profile`,data
  );
}
