/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Start: () => React$Node = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Image
              source={require('SuDa/img/alert.jpg')}
              style={styles.mainImage}
              onLoad={() => setTimeout(()=>{navigation.navigate('SignPage')},3000)}
            />
            <Text style={styles.highlight}>우리 동네 정보방</Text>
            <Text style={styles.sectionTitle}>동수다</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainImage: {
    height: 65,
    width: 130,
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 200,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 60,
    marginTop: 8,
    fontWeight: '700',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.dark,
    fontWeight: '600',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Start;
