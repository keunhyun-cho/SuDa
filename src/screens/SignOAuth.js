import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import GLOBAL from './Global.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Global from './Global';

class SignOAuth extends Component {
 
  state = {
    DongSu  : [],
    loading : false,
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.GetDongsu();  // 주소 API 호출
  }
  GetDongsu = async () => {
    // console.log('getDongsu');
    // axios
    //   .get("http://3.36.123.247/api/signUp/juso",{
    //     typeCd : 1,
    //   })
    //   .then(({ data }) => {
    //     console.log(data);
    //     this.setState({ 
    //       loading: true,
    //       DongSu: data.juso
    //     });
    //   })
    //   .catch(e => {  // API 호출이 실패한 경우
    //     console.error(e);  // 에러표시
    //     this.setState({  
    //       loading: false
    //     });
    //   });
    //   console.log('getDongsuEnd');

  };

  SetSignUp = async () => {
    const { navigation } = this.props;
    let signUpData, loginData, tokenData;

    /* 로그인 → 기기 토큰 저장 */
    // // 1. 회원가입
    // // 2. 로그인
    // axios({
    //   method:"POST",
    //   url   :"http://3.35.202.156/api/login",
    //   data  :{memberId:350, password:"SM4hv7B"}
    // }).then(({data}) => {
    //   loginData = data;

    //   if(loginData.resultCode == "00") {
    //     GLOBAL.MEMBERNM = "공덕동_312";
    //     console.log("GLOBAL.MEMBERNM = " + GLOBAL.MEMBERNM);

    //     GLOBAL.MEMBERID = 350;
    //     console.log("GLOBAL.MEMBERID = " + GLOBAL.MEMBERID);

    //     GLOBAL.TOKEN = loginData.data.token;
    //     console.log("GLOBAL.TOKEN = " + GLOBAL.TOKEN);

    //     // 3. 알림 고유 식별 토큰정보 설정
    //     axios({
    //       method  :"PUT",
    //       url     :"http://3.35.202.156/api/config/token",
    //       headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
    //       data    :{token:GLOBAL.ALARM_TOKEN}
    //     }).then(({data}) => {
    //       tokenData = data;

    //       if(tokenData.resultCode == "00") 
    //         navigation.navigate("SignOAuthMainPage", {LoginId:GLOBAL.MEMBERNM});
    //       else
    //         Alert.alert("서비스 작업중 입니다.", "앱 재 로그인 바랍니다.",[{text:"확인", onPress: () => console.log("OK Press")}], {cancelable:false});
    //     });
    //   } 
    //   else 
    //     Alert.alert("서비스 작업중 입니다.", "앱 재 로그인 바랍니다.", [{text:"확인", onPress:() => console.log("OK Press")}], {cancelable:false});
    // }).catch(e => {  
    //   console.error(e);
    //   this.setState({loading:false});
    // });

    /* 회원가입 → 로그인 → 기기 토큰 저장 */
    // 1. 회원가입
    axios.post("http://3.35.202.156/api/signUp", {
      siNm  :"서울시",
      sggNm :"마포구",
      emdNm :"공덕동",
    }).then(({data}) => {
      signUpData = data;

      if(signUpData.resultCode == "00") {
        // 2. 로그인
        axios.post("http://3.35.202.156/api/login", {
          memberId:signUpData.data.memberId,
          password:signUpData.data.password
        }).then(({data}) => {
          loginData = data;

          if(loginData.resultCode == "00") {
            GLOBAL.MEMBERNM = signUpData.data.memberNm;
            console.log('GLOBAL.MEMBERNM ===> ' + GLOBAL.MEMBERNM);

            GLOBAL.MEMBERID = signUpData.data.memberId;
            console.log('GLOBAL.MEMBERID ===> ' + GLOBAL.MEMBERID);

            GLOBAL.TOKEN = loginData.data.token;
            console.log('GLOBAL.TOKEN ===> ' + GLOBAL.TOKEN);

            // 3. 알림 고유 식별 토큰정보 저장
            axios({
              method  :"PUT",
              url     :"http://3.35.202.156/api/config/token",
              headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
              data    :{token:GLOBAL.ALARM_TOKEN}
            }).then(({data}) => {
                tokenData = data;

                if(tokenData.resultCode == "00") 
                  navigation.navigate("SignOAuthMainPage", {LoginId:GLOBAL.MEMBERNM});
                else
                  Alert.alert("서비스 작업중 입니다.", "앱 재 로그인 바랍니다.",[{text:"확인", onPress: () => console.log("OK Press")}], {cancelable:false});
            });
          }
          else 
            Alert.alert("서비스 작업중 입니다.", "앱 재 로그인 바랍니다.",[{text:"확인", onPress: () => console.log("OK Press")}], {cancelable:false});
        })
      }
      else
        Alert.alert("서비스 작업중 입니다.", "앱 재 로그인 바랍니다.",[{text:"확인", onPress: () => console.log("OK Press")}], {cancelable:false});
    }).catch(e => {  
      console.error(e);
      this.setState({loading:false});
    });
  }

  render() {

    const { navigation } = this.props;
    let isComplete = true; 
    let strTownName = '서울시 마포구 공덕동';
    let strTownNameAvailable = '공덕동';

    return(
      
      <View style={styles.CenterArea}>
      <Image style={styles.TitleIcon} source={require('SuDa/img/location.png')}></Image>
      <Text style={styles.Title2}>살고계신 동네를 알려주세요</Text>
      <TouchableOpacity style={styles.TownText}>
        <Text>{strTownName}</Text>
      </TouchableOpacity>
      <Text onPress = {this.SetSignUp}  
            style={styles.CompleteText}>{isComplete ? '완료' : '선택'}</Text>
      <Text style={styles.ErrorText}>!{'\n'}현재 {strTownNameAvailable}만{'\n'}서비스 중입니다.</Text>
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

export default SignOAuth;