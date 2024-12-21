//import {View, Text } from 'react-native'
//import React from 'react'
//import { Stack } from 'expo-router'
//
//export default function _layout() {
//return (
//      <Stack
//          screenOptions = {{
//                headerShown: false
//          }}
//          />
//)
//}


import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="home" />
    </Stack>
  );
}



//
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import LoginScreen from '.';
//import HomeScreen from './home';
//import RegisterScreen from './register';;
//
//const Stack = createNativeStackNavigator();
//
//export default function _layout() {
//  return (
//    <NavigationContainer>
//      <Stack.Navigator initialRouteName="Login">
//        <Stack.Screen
//          name="Login"
//          component={LoginScreen}
//          options={{ headerShown: false }}
//        />
//        <Stack.Screen
//          name="Home"
//          component={HomeScreen}
//          options={{ headerShown: false }}
//        />
//        <Stack.Screen
//          name="Register"
//          component={RegisterScreen}
//          options={{ headerShown: false }}
//        />
//      </Stack.Navigator>
//    </NavigationContainer>
//  );
//}