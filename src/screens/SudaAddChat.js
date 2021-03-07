import React,{Component, useState} from 'react';
import {StyleSheet, View, TextInput, Text, Button} from 'react-native';
import axios from 'axios';
import GLOBAL from './Global.js';
 
export default class SudaTabAlert extends Component {
    state = {
        title:'',
        contents:'',
        curTitleLength:0,
        maxTitleLength:30,
    }; 

    render(){
        const { navigation } = this.props;
        return(
            <View style={styles.body}>
                <Button title="게시" onPress={() => {
                    axios
                    .post("http://3.35.202.156/api/localPost",{
                        title:this.state.title,
                        contents:this.state.contents,
                    }, {headers:{'X-AUTH-TOKEN':GLOBAL.TOKEN}})
                    .then(({ data }) => {
                      console.log('localPostData ===> ' + JSON.stringify(data));

                      if(data.resultCode=='00'){
                        navigation.navigate('SudaMainPage');
                      }else{
                        
                      }
                    })
                }}></Button>
                <TextInput style={styles.TextInputTitle} placeholder="제목을 입력하세요" maxLength={30} value={this.state.title} onChangeText={title => {
                    this.setState({title});
                    this.setState({curTitleLength:title.length});
                }}/>
                <Text id style={styles.MaxTextInputTitle}>{this.state.curTitleLength}/{this.state.maxTitleLength}</Text>
                <TextInput style={styles.TextInputContent} placeholder="내용을 입력하세요." value={this.state.contents} onChangeText={contents => {
                    this.setState({contents});
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#ffffff',
        flex:1,
        paddingTop:30,
        paddingRight:20,
        paddingBottom:30,
        paddingLeft:20
    },
    TextInputTitle:{
        color:'#686868',
        fontSize:19,
        height:50,
        borderBottomColor:'#50bcda',
        borderBottomWidth:0.5
    },
    MaxTextInputTitle:{
        marginTop:5, 
        color:'#666666',
        fontSize:13,
        alignSelf:'flex-end'
    },
    TextInputContent:{
        marginTop:10,
        color:'#686868',
        fontSize:17,
        height:500,
        textAlignVertical:'top'
    }
});