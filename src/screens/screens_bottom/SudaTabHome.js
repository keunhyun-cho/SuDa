import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { Icon } from 'native-base';
 
export default class SudaTabHome extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-home' style={{ color: tintColor }} />
        )
    }
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>SudaTabHome</Text>
            </View>
        );
    }
}
