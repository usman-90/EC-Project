import axios from "axios";

const API_URL_OLD =
  "https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app";
const API_URL_NEW = "https://realestatebackend-woad.vercel.app";

export function fetchSubCategories({ queryKey }) {
  const category = queryKey[1];

  return axios.get(`${API_URL_NEW}/lov/sub-category/${category}`);
}

export function fetchAllProperties() {
  return axios.get(`${API_URL_NEW}/property/get-property`, {
    params: {
      category: "all",
    },
  });
}

export function fetchProperties({ queryKey }) {
  const data = queryKey[1];

  let params = {
    purpose: data?.purpose,
    category: data?.category,
    area: `${
      data?.areaMin && data?.areaMax ? data?.areaMin | data?.areaMax : ""
    }`,
    bedRooms: data?.bedrooms,
    price: `${
      data?.priceMin && data?.priceMax ? data?.priceMin | data?.priceMax : ""
    }`,
    subCategory: data?.subCategory,
    category: data?.category,
    bathrooms: data?.bathrooms,
  };

  let rs = {};

  for (let p in params) {
    if (
      params[p] !== "" &&
      params[p] !== "|" &&
      params[p] !== undefined &&
      params[p] !== "undefined|undefined"
    ) {
      rs[p] = params[p];
    }
  }

  console.log(rs, "dataaaa");

  return axios.get(
    `https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app/property/get-property`,
    {
      params: rs,
    },
  );
}

export function searchProperties(query) {
  return axios.post(
    "https://realestatebackend-woad.vercel.app/property/serach-property-by-searchbar",
    {
      value: query,
    },
  );
}
