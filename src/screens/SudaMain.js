import React, {Component} from 'react';
import {View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SudaTabAlert from './screens_bottom/SudaTabAlert';
import SudaTabHome from './screens_bottom/SudaTabHome';
import SudaTabInfo from './screens_bottom/SudaTabInfo';
import SudaTabSet from './screens_bottom/SudaTabSet';
import { createAppContainer } from 'react-navigation';


// BottomTabNavigator생성
const bottomNav = createBottomTabNavigator(
    {
        First: {screen:SudaTabAlert}, 
        Second: {screen:SudaTabHome},
        Third: {screen:SudaTabInfo},
        four : {screen:SudaTabSet}
    }
);
 
// Navigator를 감싸는 AppContatiner 생성
const AppContatiner = createAppContainer(bottomNav);
 
export default class SudaMain extends Component{
    render(){
        return <AppContatiner></AppContatiner>
    }
}