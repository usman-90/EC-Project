import axios from "axios";
export function updatePassword(data) {
  return axios.post(
    `https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app/users/update-password`,data
  );
}



export function editProfile(data) {
  console.log("Edit profile data", data);
  return axios.post(
    `https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app/users/edit-profile`,data
  );
}
