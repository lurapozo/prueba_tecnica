import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProductosComponent from './src/screens/ProductosScreen.tsx';
import ProductosDetails from "./src/screens/ProductoDetallesScreen.tsx";
import LoginComponent from './src/screens/LoginScreen.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {RootStackParamList} from "./src/routes.ts";
import store from "./src/context/store.ts";
import { Provider } from 'react-redux';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginComponent}/>
                    <Stack.Screen name="Productos" component={ProductosComponent} />
                    <Stack.Screen name="Detalles" component={ProductosDetails}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;
