import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {SafeAreaView, StyleSheet,Platform,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/AppNavigator';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from './src/app/store'
import {persistor } from './src/app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import FilterContext from './src/context/FilterContext'



export default function App() {
const filters = useState({
	 category:"all",
	subCategory:"all",
	priceMin:"",
	priceMax:"",
	areaMin:"",
	areaMax:"",
	bathrooms:"",
	bedrooms:"",
	purpose:"forSale"
})
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

  return (
	  <FilterContext.Provider value ={filters} >
	    <Provider store={store}>
	   <PersistGate loading={null} persistor={persistor}>
	  <QueryClientProvider client={queryClient}>
	  	<SafeAreaView style={styles.container}>
      			<NavigationContainer>
      				<RootStack />
      			</NavigationContainer>
	   		<Toast />
	  	</ SafeAreaView>
	  </QueryClientProvider>
	  </PersistGate >
	  </Provider>
	  </FilterContext.Provider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
