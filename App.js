import React, { useState } from 'react';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/AppNavigator';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from './src/app/store'
import { persistor } from './src/app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import FilterContext from './src/context/FilterContext'


export default function App() {
	const filters = useState({
		category: "all",
		subCategory: "",
		priceMin: 0,
		priceMax: "",
		areaMin: 0,
		areaMax: "",
		bathrooms: "",
		bedrooms: "",
		purpose: "forSale"
	});
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity,
				cacheTime: Infinity,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<FilterContext.Provider value={filters} >
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<SafeAreaView style={styles.container}>
							<StatusBar  barStyle={'dark-content'} backgroundColor={'#fff'} showHideTransition={true} />
							<NavigationContainer>
								<RootStack />
							</NavigationContainer>
							<Toast />
						</ SafeAreaView>
					</PersistGate >
				</Provider>
			</FilterContext.Provider >
		</QueryClientProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

