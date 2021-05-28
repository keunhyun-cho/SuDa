import React, {Component} from "react";
import {View, TextInput, Text, TouchableOpacity} from "react-native";
import axios from "axios";
import GLOBAL from "./Global.js";
 

class SudaAddChat extends Component {
    constructor(props) {
        console.log("[SudaAddChat] constructor");

        super(props);
        this.state = {title:"", content:"", curTitleLength:0, maxTitleLength:30};
    }
    componentDidMount() {
        console.log("[SudaAddChat] componentDidMount");
    }
    componentDidUpdate() {
        console.log("[SudaAddChat] componentDidUpdate");
    }

    /* 게시글 등록(/api/localPost POST) 함수 */
    addLocalPost() {
        if(this.state.title == "" && this.state.content == "")  
            this.props.navigation.goBack();
        else {
            axios({
                method  :"POST",
                url     :"http://3.35.202.156/api/localPost",
                data    :{title:this.state.title, content:this.state.content},
                headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
            }).then(({data}) => {
                if(data.resultCode == "00")
                    this.props.navigation.navigate("SudaTabHomePage", {});
            });
        }
    }

    render() {
        console.log("[SudaAddChat] render");

        return (
            <View style={{backgroundColor:"#ffffff", padding:20}}>
                <TouchableOpacity onPress={() => {this.addLocalPost();}}>
                    <Text style={{fontSize:20, color:"#50bcdf", fontWeight:"700", alignSelf:"flex-end"}}>등록</Text>
                </TouchableOpacity>
                <TextInput style={{color:"#686868", fontSize:19, height:50, borderBottomColor:"#50bcda", borderBottomWidth:0.5}} placeholder="제목을 입력하세요" maxLength={30} value={this.state.title} onChangeText={(text) => {this.setState({title:text, curTitleLength:text.length});}}/>
                <Text id style={{marginTop:5, color:"#666666", fontSize:13, alignSelf:"flex-end"}}>{this.state.curTitleLength}/{this.state.maxTitleLength}</Text>
                <TextInput style={{marginTop:10, color:"#686868", fontSize:17, height:500, textAlignVertical:"top"}} placeholder="내용을 입력하세요" value={this.state.content} onChangeText={(text) => {this.setState({content:text});}}/>
            </View>
        );
    }
}

export default SudaAddChat;