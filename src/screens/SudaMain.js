import React, {Component} from 'react';
import {View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SudaTabAlert from './screens_bottom/SudaTabAlert';
import SudaTabHome from './screens_bottom/SudaTabHome';
import SudaTabInfo from './screens_bottom/SudaTabInfo';
import SudaTabSet from './screens_bottom/SudaTabSet';
import SudaDetailChat from './SudaDetailChat';
import { createAppContainer } from 'react-navigation';
import ActionButton from 'react-native-action-button';
// import { Icon } from 'native-base'; 
import Icon from 'react-native-vector-icons/Ionicons';


// BottomTabNavigator생성
const bottomNav = createBottomTabNavigator(
    {
        "HomeTab": {screen:SudaTabHome, navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-home' size={20} style={{ color: tintColor }}/>
          }}, 
        "AlertTab": {screen:SudaTabAlert, navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-notifications-sharp' size={20} style={{ color: tintColor }} />
          }},
        "InfoTab": {screen:SudaTabInfo, navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-person' size={20} style={{ color: tintColor }} />
          }},
        "SetTab" : {screen:SudaTabSet, navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-settings' size={20} style={{ color: tintColor }} />
          }},
        "DetailTab" : {screen:SudaDetailChat, navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => <Icon name='ios-settings' size={20} style={{ color: tintColor }} />
        }},
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
          activeTintColor: '#00a4ff',
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
        return (
            <View style={{flex:1}}>
                <AppContainer/>
                <ActionButton style={{marginBottom:30}} buttonColor="#50bcdf" onPress={() => this.props.navigation.navigate("SudaAddChatPage")} />
            </View> 
        );
    }
}