import React, {Component} from "react";
import {View, TextInput, Text, Button} from "react-native";
import axios from "axios";
import GLOBAL from "./Global.js";
 
export default class SudaTabAlert extends Component {
    state = {
        title           :"",    // 제목
        contents        :"",    // 내용
        curTitleLength  :0,     // 제목 현재 길이
        maxTitleLength  :30,    // 제목 최대 길이
    }; 

    render(){
        const { navigation } = this.props;

        return(
            <View style={{backgroundColor:"#ffffff", flex:1, padding:15}}>
                <Button title="게시" onPress={() => {
                    axios.post("http://3.35.202.156/api/localPost", {
                        title   :this.state.title,
                        contents:this.state.contents,
                    }, {headers:{"X-AUTH-TOKEN":GLOBAL.TOKEN}})
                    .then(({data}) => {
                        console.log("localPostData ===> " + JSON.stringify(data));

                        if(data.resultCode == "00")
                            navigation.goBack();
                    })
                }}></Button>
                <TextInput style={{color:"#686868", fontSize:19, height:50, borderBottomColor:"#50bcda", borderBottomWidth:0.5}} placeholder="제목을 입력하세요" maxLength={30} value={this.state.title} onChangeText={(text) => {
                    this.setState({title:text});
                    this.setState({curTitleLength:text.length});
                }}/>
                <Text id style={{marginTop:5, color:"#666666", fontSize:13, alignSelf:"flex-end"}}>{this.state.curTitleLength}/{this.state.maxTitleLength}</Text>
                <TextInput style={{marginTop:10, color:"#686868", fontSize:17, height:500, textAlignVertical:"top"}} placeholder="내용을 입력하세요" value={this.state.contents} onChangeText={(text) => {
                    this.setState({contents:text});
                }}/>
            </View>
        );
    }
}