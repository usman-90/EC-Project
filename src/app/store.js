import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlicer from "../features/user/userSlice";
import propertySlicer from "../features/property/propertySlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import searchSlicer from "../features/app/searchSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userSlicer,
  search: searchSlicer,
  property: propertySlicer,
  // Other reducers (if any)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
