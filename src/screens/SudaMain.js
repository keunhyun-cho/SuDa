import React, {Component} from 'react';
import {View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SudaTabAlert from './screens_bottom/SudaTabAlert';
import SudaTabHome from './screens_bottom/SudaTabHome';
import SudaTabInfo from './screens_bottom/SudaTabInfo';
import SudaTabSet from './screens_bottom/SudaTabSet';
import { createAppContainer } from 'react-navigation';
import ActionButton from 'react-native-action-button';



// BottomTabNavigator생성
const bottomNav = createBottomTabNavigator(
    {
        "HomeTab": {screen:SudaTabHome}, 
        "AlertTab": {screen:SudaTabAlert},
        "InfoTab": {screen:SudaTabInfo},
        "SetTab" : {screen:SudaTabSet}
    }
);
 
// Navigator를 감싸는 AppContatiner 생성
const AppContainer = createAppContainer(bottomNav);
 
export default class SudaMain extends Component{
    render() {
        const { navigation } = this.props;
        return (
            
            <View style={{flex:1}}>
                <AppContainer/>
                <ActionButton style={{marginBottom:30}} buttonColor="#50bcdf" onPress={() => navigation.navigate('SudaAddChatPage')} />
            </View> 
        );
    }
}