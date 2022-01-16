// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartPage from './app/StartPage'
import Home from './app/Home'
import CountryList from './app/CountryList'
import CountryDetail from './app/CountryDetail'
import Menu from './app/Menu'
import Impressum from './app/Impressum'


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="StartPage" component={StartPage}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="Menu" component={Menu}/>
                <Stack.Screen name="Impressum" component={Impressum}/>
                <Stack.Screen name="CountryList" component={CountryList}/>
                <Stack.Screen name="Country" component={CountryDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
