import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./components/Main"
import Map from "./components/Map"
import Home from "./components/Home"


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#FF5722',
              minHeight: 200,
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',

            },
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#FF5722',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',

            },
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            title: 'Map',
            headerStyle: {
              backgroundColor: '#FF5722',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF'
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
