import React, { useEffect, useState } from 'react';
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
import FilterContext from './src/context/FilterContext';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function App() {
	const filters = useState({
		category: "all",
		subCategory: "",
		priceMin: 0,
		priceMax: "",
		areaMin: 0,
		purpose: "",
		areaMax: "",
		bathrooms: "",
		bedrooms: "",
	});
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity,
				cacheTime: Infinity,
			},
		},
	});

	useEffect(() => {
		changeScreenOrientation();
	}, [])

	async function changeScreenOrientation() {
		await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
	}

	return (
		<QueryClientProvider client={queryClient}>
			<FilterContext.Provider value={filters} >
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<SafeAreaView style={styles.container}>
							<StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} showHideTransition={true} />
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

