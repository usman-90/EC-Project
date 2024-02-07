import React from 'react';
import CreateProperty from '../screens/CreateProperty';
import CameraScreen from '../screens/CameraScreen';
import { createStackNavigator } from '@react-navigation/stack';

const CreatePropertyNavigation = createStackNavigator();

export default function CreatePropertyStack() {
    return (
        <CreatePropertyNavigation.Navigator>
            <CreatePropertyNavigation.Screen
                name="CreatePropertyCameraScreen"
                component={CameraScreen}
                options={{ headerShown: false }}
            />
            <CreatePropertyNavigation.Screen
                name="CreatePropertyScreen"
                component={CreateProperty}
                options={{ headerShown: false }}
            />
        </CreatePropertyNavigation.Navigator>
    )
}
