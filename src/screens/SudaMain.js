import React, {Component} from 'react';
import {View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SudaTabAlert from './screens_bottom/SudaTabAlert';
import SudaTabHome from './screens_bottom/SudaTabHome';
import SudaTabInfo from './screens_bottom/SudaTabInfo';
import SudaTabSet from './screens_bottom/SudaTabSet';
import { createAppContainer } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import { Icon } from 'native-base'; 


// BottomTabNavigator생성
const bottomNav = createBottomTabNavigator(
    {
        "Home Tab": {screen:SudaTabHome, navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-home' style={{ color: tintColor }} />
          } }, 
        "AlertTab": {screen:SudaTabAlert, navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-search' style={{ color: tintColor }} />
              } },
        "InfoTab": {screen:SudaTabInfo},
        "SetTab" : {screen:SudaTabSet}
    }, {
        // animationEnabled: true,
        // swipeEnabled: true,
        // tabBarPosition: "bottom",
        tabBarOptions: {
          style: {
            backgroundColor:'white'
          },
          iconStyle: { 
            ...Platform.select({
              ios:{
                height: 35,
                marginBottom: 20
              }
            }) 
          },
          activeTintColor: '#000',
          inactiveTintColor: '#d1cece',
          upperCaseLabel: false,
          showLabel: false,
          showIcon: true,
        },
        // defaultNavigationOptions: {
        //   header: null
        // }
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