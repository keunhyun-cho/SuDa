/**
 *g
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App.js';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
});
function HeadlessCheck({isHeadless}) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <App />;
  }
//AppRegistry.registerComponent(appName, () => AppScreen);
AppRegistry.registerComponent(appName, () => HeadlessCheck);
