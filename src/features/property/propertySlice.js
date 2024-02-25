import { createSlice } from "@reduxjs/toolkit";

const propertyPayload = {
  // _id: "",
  typesAndPurpose: {
    category: "commercial",
    subCategory: "",
    purpose: "",
  },
  locationAndAddress: {
    location: "",
    longitude: 0,
    latitude: 0,
    address: "",
  },
  propertyDetails: {
    refNo: "",
    title: "",
    titleArabic: "",
    description: "",
    descriptionArabic: "",
    areaSquare: 0,
    InclusivePrice: 0,
    PermitNumber: 0,
    ownerShipStatus: "",
    bedRooms: 1,
    bathRooms: 1,
  },
  rentalDetails: {
    rent: "500",
    rentFrequency: "monthly",
    minimumContractPeriod: "1",
    noticePeriod: "1",
    maintainanceFee: "200",
    paidBy: "tenant",
  },
  contactDetails: {
    ListingOwner: "",
    contactPerson: "",
    email: "",
    phone: "",
  },
  amenities: [],
  upload: {
    images: [],
    videos: [],
  },
  isLoading: false,
  isError: false,
  featuredProperties: [],
  ownerId: "",
};

export const propertySlice = createSlice({
  name: "property",
  initialState: {
    data: propertyPayload,
  },
  reducers: {
    setPropertyData: (state, action) => {
      console.log("Data provided to store", action.payload);
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    resetPropertyData: (state, action) => {
      console.log("Data provided to store", action.payload);
      state.data = {
        ...propertyPayload,
        ownerId: action.payload.ownerId,
        contactDetails: action.payload.contactDetails
      };
    }
  },
});

export const { setPropertyData, resetPropertyData } = propertySlice.actions;

export default propertySlice.reducer;
