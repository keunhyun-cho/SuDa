import React,{Component} from 'react';
import {View, Text,TouchableHighlight, Switch} from 'react-native';
import Mailer from 'react-native-mail';
import GLOBAL from "../Global.js";

import axios from "axios";

export default class SudaTabSet extends Component {
    state = {alarmValue:true};

    handleEmail = () => {
        Mailer.mail({
          subject: '동수타 팀에게 연락하기',
          recipients: ['dongsudasuda@gmail.com'],
          ccRecipients: ['rmsgus33@naver.com'],
          body: '<b>문의 드립니다.</b><br><br>' +
                '동네 : 서울 마포구 공덕동<br>' + 
                'ID   : ',
          isHTML: true,
          attachment: {
            path: '',  // The absolute path of the file from which to read data.
            type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            name: '',   // Optional: Custom filename for attachment
          }
        }, (error, event) => {
          Alert.alert(
            error,
            event,
            [
              {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
              {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
            ],
            { cancelable: true }
          )
        });
      }
    render(){
        return(
            
            <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor : '#FFFFFF'
            }}
        >
            <View style={{
                width: 300,
                height: 500,
                borderRadius: 20
            }}>
                 <Text
                     style={{
                        marginTop:30, 
                        fontSize: 22, 
                        alignSelf:'flex-start',
                        color:'#00a4ff'
                        }}
                >반갑습니다! </Text>
                <Text
                    style={{ fontSize: 14,  marginTop:20}}
                >
                    동수다는 우리동네 정보방, 수다방, 사랑방 입니다.{"\n"}
                    집앞 마트 타임세일에서 지금 무엇을 팔고있을까? 아침에 고장 난 엘리베이터가 지금은 괜찮을까? 새로생긴 맛집은 어떨까?{"\n"}{"\n"}
                    작은 궁금증에서 부터 안정과 치안에 이르기 까지, 동네에서 일어나는 다양한 일들을 함께 나누어보세요. 동수다는 이웃과 함께하며 서로 힘이되고자 하는 마음을 위해 태어났습니다. {"\n"}
                    동네 생활을 함께 만들어 가보세요.{"\n"}{"\n"}
                    나눈만큼 풍성해지는 마음 따듯하고 살기 좋은 동네, 다양한 이웃들과 함께 만들어갈수 있기를 바랍니다.{"\n"}
                </Text>
                <Text
                     style={{ fontSize: 14, 
                        textAlign :'right',
                        color : '#727272',
                        marginBottom:20
                        }}
                >동수다 팀 드림.</Text>

                    <View style={{flex:1, flexDirection:"row"}}>  
                        <Text style={{fontSize:16, color:'black', fontWeight:'900'}}>알림 받기</Text>  
                        <Switch style={{height:25}} trackColor={{true:'#00a4ff', false:'#808080'}} thumbColor={'#ffffff'} value={this.state.alarmValue} onValueChange ={(alarmValue) => {
                            this.setState({alarmValue:alarmValue}); 
                            GLOBAL.ALARM = alarmValue; 
                            console.log(GLOBAL.ALARM);

                            // 알림 수신 설정
                            axios({
                                method  :"PUT",
                                url     :"http://3.35.202.156/api/config/alarm",
                                headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
                                data    :{alarm:GLOBAL.ALARM, receive:GLOBAL.ALARM}
                            }).then(({data}) => {
                                console.log(data);
                            });
                        }}/>  
                    </View>  
                    <TouchableHighlight
                        style={{ flex: 1, marginTop:10, justifyContent: 'center', alignItems: 'flex-start', backgroundColor:'#FFFFFF',borderTopWidth:1, borderColor:'#727272' }}
                        onPress={this.handleEmail}>
                        <Text
                            style={{ fontSize: 16 }}
                        >동수다 팀에게 연락하기</Text>
                    </TouchableHighlight>
            </View>
           
                {/* <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "left",
                }}>
                    <Text
                     style={{ fontSize: 14, 
                        color : '#727272'
                        }}
                >동수다 팀에게 연락하기.</Text>
                </View> */}

            </View>

        );
    }
}
