/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartPage from './src/screens/StartScreen';
import SignPage from './src/screens/SignAlert';
import SignOAuthPage from './src/screens/SignOAuth';
import SignOAuthMainPage from './src/screens/SignOAuthMain';
import SudaMainPage  from './src/screens/SudaMain';
import SudaAddChatPage  from './src/screens/SudaAddChat';
import SudaDetailChatPage  from './src/screens/SudaDetailChat';
import SudaUpdateChatPage  from './src/screens/SudaUpdateChat';
import SudaTabHomePage  from './src/screens/screens_bottom/SudaTabHome';


const Stack = createStackNavigator();

export default function App() {
    useEffect(() => {
      fcmService.registerAppWithFCM();
      fcmService.register(onRegister, onNotification, onOpenNotification);
      localNotificationService.configure(onOpenNotification);
    },[])

  
    const onRegister = (token) =>{
      console.log('[App] onRegister : token :', token);
    }

    const onNotification = (notify) => {
      console.log('[App] onNotification : notify :', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    const onOpenNotification = async (notify) =>{
      console.log('[App] onOpenNotification : notify :', notify);
      alert('Open Notification : notify.body :' + notify.body);
    }
    // return () => {
    //   console.log('[App] unRegister');
    //   fcmService.unRegister();
    //   localNotificationService.unregister();
    // };
  
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="StartPage" screenOptions={{headerShown:false}} >
        <Stack.Screen name="StartPage" component={StartPage}/>
        <Stack.Screen name="SignPage" component={SignPage} />
        <Stack.Screen name="SignOAuthPage" component={SignOAuthPage} />
        <Stack.Screen name="SignOAuthMainPage" component={SignOAuthMainPage} />
        <Stack.Screen name="SudaMainPage" component={SudaMainPage} />
        <Stack.Screen name="SudaAddChatPage" component={SudaAddChatPage} />
        <Stack.Screen name="SudaDetailChatPage" component={SudaDetailChatPage} />
        <Stack.Screen name="SudaUpdateChatPage" component={SudaUpdateChatPage} />
        <Stack.Screen name="SudaTabHomePage" component={SudaTabHomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
