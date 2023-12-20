import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "../features/user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, userSlicer);

export default store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
