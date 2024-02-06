import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        data: {
            filter: {
                areaMax: 5000,
                areaMin: 0,
                bathrooms: "",
                bedrooms: "",
                category: "all",
                priceMax: 5000,
                priceMin: 0,
                subCategory: ""
            },
            lastSearched: [],
        },
    },
    reducers: {
        setSearchData: (state, action) => {
            console.log("Data provided to store", action.payload);
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
    },
});

export const { setSearchData } = searchSlice.actions;

export default searchSlice.reducer;
