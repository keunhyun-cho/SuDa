import React, {Component} from "react";
import {View, TextInput, Text, TouchableOpacity} from "react-native";
import axios from "axios";
import GLOBAL from "./Global.js";
 

class SudaAddChat extends Component {
    constructor(props) {
        console.log("SudaAddChat constructor");

        super(props);
        this.state = {title:"", contents:"", curTitleLength:0, maxTitleLength:30};
    }

    componentDidMount() {
        console.log("SudaAddChat componentDidMount");
    }

    componentDidUpdate() {
        console.log("SudaAddChat componentDidUpdate");
    }
 
    // componentWillUnmount() {
    //     console.log("SudaAddChat componentWillUnmount");
    // }

    render() {
        return (
            <View style={{backgroundColor:"#ffffff", padding:20}}>
                <TouchableOpacity onPress={() => {
                    if(this.state.title == "" && this.state.contents == "")  
                        this.props.navigation.goBack();
                    else {
                        axios.post("http://3.35.202.156/api/localPost", {title:this.state.title, contents:this.state.contents}, {headers:{"X-AUTH-TOKEN":GLOBAL.TOKEN}})
                        .then(({data}) => {
                            console.log("localPostData ===> " + JSON.stringify(data));

                            if(data.resultCode == "00")
                                this.props.navigation.goBack();
                        })
                    }
                }}>
                    <Text style={{fontSize:20, color:"#50bcdf", fontWeight:"700", alignSelf:"flex-end"}}>게시</Text>
                </TouchableOpacity>
                <TextInput style={{color:"#686868", fontSize:19, height:50, borderBottomColor:"#50bcda", borderBottomWidth:0.5}} placeholder="제목을 입력하세요" maxLength={30} value={this.state.title} onChangeText={(text) => {this.setState({title:text, curTitleLength:text.length});}}/>
                <Text id style={{marginTop:5, color:"#666666", fontSize:13, alignSelf:"flex-end"}}>{this.state.curTitleLength}/{this.state.maxTitleLength}</Text>
                <TextInput style={{marginTop:10, color:"#686868", fontSize:17, height:500, textAlignVertical:"top"}} placeholder="내용을 입력하세요" value={this.state.contents} onChangeText={(text) => {this.setState({contents:text});}}/>
            </View>
        );
    }
}

export default SudaAddChat;