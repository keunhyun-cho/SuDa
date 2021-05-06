/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartPage from './src/screens/StartScreen';
import SignPage from './src/screens/SignAlert';
import SignOAuthPage from './src/screens/SignOAuth';
import SignOAuthMainPage from './src/screens/SignOAuthMain';
import SudaMainPage  from './src/screens/SudaMain';
import SudaAddChatPage  from './src/screens/SudaAddChat';
import SudaDetailChatPage  from './src/screens/SudaDetailChat';


const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="StartPage" screenOptions={{headerShown: false}} >
        <Stack.Screen name="StartPage" component={StartPage}/>
        <Stack.Screen name="SignPage" component={SignPage} />
        <Stack.Screen name="SignOAuthPage" component={SignOAuthPage} />
        <Stack.Screen name="SignOAuthMainPage" component={SignOAuthMainPage} />
        <Stack.Screen name="SudaMainPage" component={SudaMainPage} />
        <Stack.Screen name="SudaAddChatPage" component={SudaAddChatPage} />
        <Stack.Screen name="SudaDetailChatPage" component={SudaDetailChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
