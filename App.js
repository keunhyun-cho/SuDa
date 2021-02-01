/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartPage from './src/screens/StartScreen';
import SignPage from './src/screens/SignAlert';
import SignOAuthPage from './src/screens/SignOAuth';
import SignOAuthPopupPage from './src/screens/SignOAuthPopup';
import SignOAuthMainPage from './src/screens/SignOAuthMain';


const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="SignPage" component={SignPage} />
        <Stack.Screen name="SignOAuthPage" component={SignOAuthPage} />
        <Stack.Screen name="SignOAuthPopupPage" component={SignOAuthPopupPage} />
        <Stack.Screen name="SignOAuthMainPage" component={SignOAuthMainPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
