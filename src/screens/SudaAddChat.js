import React,{Component, useState} from 'react';
import {StyleSheet, View, TextInput, Text, Button} from 'react-native';
import axios from 'axios';
 
export default class SudaTabAlert extends Component {
    state = {
        title: '',
        contents: '',
    }

    render(){
        let curLength = 0;
        let maxLength = 30;
        
        return(
            <View style={styles.body}>
                <Button title="게시" onPress={() => {
                    axios
                    .post("http://3.35.202.156/api/localPost",{
                        title:this.state.title,
                        contents:this.state.contents,
                    })
                    .then(({ data }) => {
                      console.log(data);
                      if(data.resultCode=='00'){
                        Alert.alert(
                          "게시글이 등록되었습니다.",
                          [{
                              text: "확인",
                              onPress: () => console.log("OK Press"),
                           }],
                          { cancelable: false }
                        );
                        navigation.navigate('SudaMainPage');
                      
                      }else{
                        
                      }
                    })
                }}></Button>
                <TextInput style={styles.TextInputTitle} placeholder="제목을 입력하세요" onChangeText={title => this.setState({title})} value={this.state.title}/>
                <Text style={styles.MaxTextInputTitle}>{curLength}/{maxLength}</Text>
                <TextInput style={styles.TextInputContent} placeholder="내용을 입력하세요." onChangeText={contents => this.setState({contents})} value={this.state.contents}/>
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