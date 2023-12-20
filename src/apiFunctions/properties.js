import axios from "axios";

function getProperties(data) {}

export function fetchSubCategories({ queryKey }) {
  console.log(queryKey);

  const category = queryKey[1];

  return axios.get(
    `https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app/lov/sub-category/${category}`,
  );
}
