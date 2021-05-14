import React, {Component} from "react";
import {View} from "react-native";
import SudaTabAlert from "./screens_bottom/SudaTabAlert";
import SudaTabHome from "./screens_bottom/SudaTabHome";
import SudaTabInfo from "./screens_bottom/SudaTabInfo";
import SudaTabSet from "./screens_bottom/SudaTabSet";
import SudaDetailChat from "./SudaDetailChat";
import SudaUpdateChat from "./SudaUpdateChat";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";


class SudaMain extends Component {
  constructor(props) {
    console.log("SudaMain constructor");

    super(props);
  }

  componentDidMount() {
      console.log("SudaMain componentDidMount");
  }

  componentDidUpdate() {
      console.log("SudaMain componentDidUpdate");
  }

  componentWillUnmount() {
      console.log("SudaMain componentWillUnmount");
  }

  render() {
    // 1. BottomTabNavigator 생성
    const BottomTabNavigator = createBottomTabNavigator({
      "SudaTabHomeTab":{
        screen :SudaTabHome, 
        navigationOptions:{
          tabBarIcon:({focused, tintColor}) => <Icon name="ios-home" size={20} style={{color: tintColor}}/>
        }
      }, 
      "SudaTabAlertTab":{
        screen:SudaTabAlert, 
        navigationOptions:{
          tabBarIcon:({focused, tintColor}) => <Icon name="ios-notifications-sharp" size={20} style={{color: tintColor}} />
        }
      },
      "SudaTabInfoTab":{
        screen:SudaTabInfo, 
        navigationOptions:{
          tabBarIcon:({focused, tintColor}) => <Icon name="ios-person" size={20} style={{color: tintColor}} />
        }
      },
      "SudaTabSetTab":{
        screen:SudaTabSet, 
        navigationOptions:{
          tabBarIcon:({focused, tintColor}) => <Icon name="ios-settings" size={20} style={{color: tintColor}} />
        }
      },
      "SudaDetailChatTab":{
        screen:SudaDetailChat // @TODO BottomTabNavigator 내부끼리의 navigation을 위해 선언된 Tab으로 숨겨야 함.
      },
      "SudaUpdateChatTab" :{
        screen:SudaUpdateChat // @TODO BottomTabNavigator 내부끼리의 navigation을 위해 선언된 Tab으로 숨겨야 함.
      }
    }, {
      animationEnabled:true,
      swipeEnabled:true,
      tabBarPosition:"bottom",
      tabBarOptions:{
        style:{
          backgroundColor:"white"
        },
        iconStyle:{ 
          ...Platform.select({
            ios:{
              height:35,
              marginBottom:20
            }
          }) 
        },
        activeTintColor:"#00a4ff",
        inactiveTintColor:"#d1cece",
        upperCaseLabel:false,
        showLabel:false,
        showIcon:true,
      },
      // defaultNavigationOptions:{
      //   header:null
      // }
    });
    
    // 2. BottomTabNavigator를 감싸는 AppContatiner 생성
    const AppContainer = createAppContainer(BottomTabNavigator);

    return (
        <View style={{flex:1}}>
            <AppContainer/>
            {/* <ActionButton style={{marginBottom:30}} buttonColor="#50bcdf" onPress={() => this.props.navigation.navigate("SudaAddChatPage")} /> */}
        </View> 
    );
  }
}

export default SudaMain;