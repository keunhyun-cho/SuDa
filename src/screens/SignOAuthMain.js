import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Modal, TouchableHighlight} from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import global from './Global.js';

class SignOAuthMain extends React.Component {

     
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidMount(){
        setTimeout(()=>{this.setModalVisible(true);},500);
    }

    render() {
        const { navigation } = this.props;
        const DongSuId = this.props.route.params.LoginId.slice(0,2) + '주민' + this.props.route.params.LoginId.split('_')[1];
        console.log(DongSuId);


        return (
            <View
                style = {{ flex: 1, }}
                
            >
                <Modal
                    animationType="slide"
                    transparent={true} // 배경 투명 하게 
                    visible={this.state.modalVisible}

                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.50)'
                        }}
                    >
                        <View style={{
                            width: 300,
                            height: 450,
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: 20
                        }}>
                            <Text style={{marginTop:30}}>
                             <Text
                                 style={{ fontSize: 22, 
                                    alignSelf:'flex-start',
                                    color:'#00a4ff'
                                    }}
                            >{global.MEMBERNM} </Text>
                            <Text
                                 style={{ fontSize: 18, 
                                    marginLeft : 10,
                                    }}
                            >환영합니다.</Text>

                            </Text>

                            <Text
                                style={{ fontSize: 18, flex: 5, marginTop:40}}
                            >
                                동네에 새로생긴 가게 소식부터,{"\n"}
                                일상의 소소한 잡담까지.{"\n"}{"\n"}
                                편하게 소통하며 더욱 즐거운 {"\n"}
                                동네 생활을 함께 만들어 가보세요.{"\n"}{"\n"}
                                회원번호는 가입 순서에 따라 부여{"\n"}
                                됩니다. 번호 유지에 주의해주세요.{"\n"}{"\n"}{"\n"}{"\n"}
                            </Text>
                            <Text
                                 style={{ fontSize: 22, 
                                    textAlign :'right',
                                    marginRight : 20,
                                    }}
                            >동수다 드림.</Text>


                            <View
                                style={{
                                    alignSelf: 'baseline',
                                    backgroundColor: '#32C5E6',
                                    width: 300,
                                    height : 40,
                                    borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                    flexDirection: 'row'
                                }}
                            >
            

                                <TouchableHighlight
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        setTimeout(()=>{navigation.navigate('SudaMainPage')},1000)
                                    }}>
                                    <Text
                                        style={{ color: 'white', fontSize: 14 }}
                                    >확인</Text>
                                </TouchableHighlight>

                            </View>
                        </View>

                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                    >
                    <Text >Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}



const styles = StyleSheet.create({
  CenterArea:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title2: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '700',
    color: '#303030'
  },
  TownText: {
    marginTop: 20,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#202020'
  },
  TitleIcon: {
    width: 30,
    height: 50
  },
  CompleteText: {
    marginTop: 50,
    fontSize: 40,
    fontWeight: '800',
    color: '#50bcdf'
  },
  ErrorText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 15,
    fontWeight: '900',
    color: '#ff0000'
  }
});

export default SignOAuthMain;