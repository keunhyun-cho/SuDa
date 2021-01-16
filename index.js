/**
 *g
 * @format
 */
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import StartScreen from './src/screens/StartScreen.js';
import AppScreen from './App.js';

AppRegistry.registerComponent(appName, () => AppScreen);
