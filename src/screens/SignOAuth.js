import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


class SignOAuth extends Component {
 
  state = {
    DongSu  : [],
    loading : false,
  }
  componentDidMount() {
    this.GetDongsu();  // 주소 API 호출
  }
  GetDongsu = async () => {
    var params = new URLSearchParams();
    params.append('doc_number', this.no);
    params.append('doc_password', this.doc_password);

    // axios
    //   .post("http://3.36.123.247/api/signUp",{
    //     params : {siNm : '서울시',
    //               sggNm: '마포구',
    //               emdNm :'공덕동'},
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
  };


  render(){
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
      <Text onPress = {() => setTimeout(()=>{navigation.navigate('SignOAuthMainPage')},3000)}  
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