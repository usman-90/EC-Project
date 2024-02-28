import axios from "axios";

const isNumber = (n) => !isNaN(parseFloat(n));

const API_URL_OLD =
  "https://realestatebackend-m68pxvdwf-asadullahkhan19.vercel.app";
const API_URL_NEW = "https://realestatebackend-woad.vercel.app";
const Local_Host_URL = "http://192.168.100.13:4000";

export function fetchSubCategories({ queryKey }) {
  const category = queryKey[1];

  return axios.get(`${API_URL_NEW}/lov/sub-category/${category}`);
}

export function fetchAllProperties() {
  console.log("Call happened");
  return axios.get(`${API_URL_NEW}/property/get-property`, {
    params: {
      category: "all",
    },
  });
}

export function fetchProperties({ queryKey }) {
  const data = queryKey[1];
  console.log("fetchhhhhhhhhhh", data, "dasdasd");
  let params = {
    purpose: data?.purpose,
    category: data?.category,
    area: `${
      isNumber(data?.areaMax) && isNumber(data?.areaMax)
        ? data?.areaMin.toString() + "|" + data?.areaMax.toString()
        : ""
    }`,
    bedRooms: data?.bedrooms,
    price: `${
      isNumber(data?.priceMin) && isNumber(data?.priceMax)
        ? data?.priceMin.toString() + "|" + data?.priceMax.toString()
        : ""
    }`,
    subCategory: data?.subCategory,
    category: data?.category,
    bathrooms: data?.bathrooms,
  };

  let rs = {};
  console.log(params);
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
  console.log("api call for fetchProperties", rs, "requesting API", `${API_URL_NEW}/property/get-property`);
  return axios.get(
    `${API_URL_NEW}/property/get-property`,
    {
      params: rs,
    },
  );
}

export function searchProperties(query) {
  console.log("api call for searchProperties", query, "requesting API", `${API_URL_NEW}/property/serach-property-by-searchbar`);
  return axios.post(
    `${API_URL_NEW}/property/serach-property-by-searchbar`,
    {
      value: query,
    },
  );
}

export function saveProperty(data) {
  const { userId, propertyId } = data;
  // console.log("Data got", userId, propertyId, "Request going on", `${API_URL_NEW}/users/save-property/${userId}/${propertyId}`);
  return axios.post(
    `${API_URL_NEW}/users/save-property/${userId}/${propertyId}`,
  );
}

export function getOneSavedProperties({ queryKey }) {
  const { userId, propertyId } = queryKey[1];
  const endpoint = `${API_URL_NEW}/users/get-one-save-property/${userId}/${propertyId}`;
  return axios.get(endpoint);
}

export function getSavedProperties({ queryKey }) {
  const userId = queryKey[1];
  console.log(userId, "idddddddd");
  return axios.get(`${API_URL_NEW}/users/get-save-property/${userId}`);
}

export function createProperty(data) {
  // console.log("data for upload", data);
  return axios.post(`${API_URL_NEW}/property/upload`, data);
}

export function updateProperty(data) {
  // console.log("data for upload", data);
  return axios.post(`${API_URL_NEW}/property/update-property`, data);
}

export function deleteSavedProperties(saveId) {
  return axios.delete(`${API_URL_NEW}/users/delete-save-property/${saveId}`);
}

export function getLocationSuggestions(data) {
  console.log("Send the request", data);
  return axios.post(`${API_URL_NEW}/property/location-suggestions`, data);
}

export function getListings({ queryKey }) {
  const email = queryKey[1];
  const purpose = queryKey[2];
  const category = queryKey[3];
  return axios.get(`${API_URL_NEW}/property/property-list`, {
    params: {
      userEmail: email,
      purpose,
      category
    },
    timeout: 8000
  });
}

export function deleteProperty(propertyId) {
  console.log("Send the propId", propertyId);
  return axios.get(`${API_URL_NEW}/property/delete-property/${propertyId}`);
}

export function getPropertyByPropertyId(propertyId) {
  console.log("Send the propId", propertyId);
  return axios.get(`${API_URL_NEW}/property/property-detials/${propertyId}`);
}

export async function getPropertyCountForCategory({queryKey}) {
  // const category = queryKey[0];
  // const response = await axios.get(`${API_URL_NEW}/property/category-counts`, {timeout:5000});
  console.log("Get property count for", `${API_URL_NEW}/property/category-counts`);
  return axios.get(`${API_URL_NEW}/property/category-counts`);
  // return response;
}