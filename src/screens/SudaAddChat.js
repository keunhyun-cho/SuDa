import React,{Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
 
export default class SudaTabAlert extends Component {
    render(){
        let curLength = 0;
        let maxLength = 30;

        return(
            <View style={styles.body}>
                <TextInput style={styles.TextInputTitle} placeholder="제목을 입력하세요"/>
                <Text style={styles.MaxTextInputTitle}>{curLength}/{maxLength}</Text>
                <TextInput style={styles.TextInputContent} placeholder="내용을 입력하세요."/>
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