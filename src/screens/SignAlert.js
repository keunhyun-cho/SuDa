import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const SignAlert: () => React$Node = ({navigation}) => {
  return (
    <View style={styles.CenterArea}>
      <Text style={styles.Title1}>반갑습니다!</Text>
      <Text style={styles.Title2}>살고계신 동네를 알려주세요</Text>
      <Image 
        style={styles.TitleIcon} 
        source={require('SuDa/img/location.png')}
        onLoad={() => navigation.navigate('SignOAuthPage')}
        ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  CenterArea:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title1: {
    fontSize: 50,
    fontWeight: '900',
    color: '#000000'
  },
  Title2: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '500',
    color: '#303030'
  },
  TitleIcon: {
    marginTop: 40,
    width: 50,
    height: 50
  }
});

export default SignAlert;