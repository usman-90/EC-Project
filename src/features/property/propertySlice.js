import { createSlice } from "@reduxjs/toolkit";

export const propertySlice = createSlice({
  name: "property",
  initialState: {
    data: {
      _id: "",
      typesAndPurpose: {
        category: "commercial",
        subCategory: "",
        purpose: "forRent",
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
        bedRooms: 0,
        bathRooms: 0,
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
    },
  },
  reducers: {
    setPropertyData: (state, action) => {
      console.log("Data provided to store", action.payload);
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { setPropertyData } = propertySlice.actions;

export default propertySlice.reducer;
