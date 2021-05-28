import React, {Component} from "react";
import {View, TextInput, Text, TouchableOpacity} from "react-native";
import axios from "axios";
import GLOBAL from "./Global.js";


class SudaUpdateChat extends Component {
    constructor(props) {
        console.log("[SudaUpdateChat] constructor");

        super(props);
        this.state = {localPost:{}};
    }
    componentWillReceiveProps(nextProps) {
        console.log("[SudaUpdateChat] componentWillReceiveProps");
        this.getLocalPost(nextProps.navigation.getParam("localPostId"));
    }
    componentDidMount() {
        console.log("[SudaUpdateChat] componentDidMount");
        this.getLocalPost(this.props.navigation.getParam("localPostId"));
    }
    componentDidUpdate() {
        console.log("[SudaUpdateChat] componentDidUpdate");
    }

    /* 게시글 상세 조회(/api/localPost/ GET) 함수 */
    getLocalPost(postId) {
        axios({
            method  :"GET",
            url     :"http://3.35.202.156/api/localPost/" + postId,
            headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
            data    :{}
        }).then(({data}) => {
            this.setState({localPost:data.data});
        });
    }

    /* 게시글 수정(/api/localPost PUT) 함수 */
    updateLocalPost() {
        axios({
            method  :"PUT",
            url     :"http://3.35.202.156/api/localPost/" + this.state.localPost.localPostId,
            headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
            data    :{content:this.state.localPost.content}
        }).then(({data}) => {
            if(data.resultCode == "00")
                this.props.navigation.navigate("SudaTabHomeTab", {});
        }); 
    }
   
    render() {
        console.log("[SudaUpdateChat] render");

        return (
            <View style={{backgroundColor:"#ffffff", padding:20}}>
                <TouchableOpacity onPress={() => {this.updateLocalPost();}}>
                    <Text style={{fontSize:20, color:"#50bcdf", fontWeight:"700", alignSelf:"flex-end"}}>수정</Text>
                </TouchableOpacity>
                <TextInput style={{color:"#686868", fontSize:19, height:50, borderBottomColor:"#50bcda", borderBottomWidth:0.5}} value={this.state.localPost.title} editable={false}/>
                <TextInput style={{marginTop:10, color:"#686868", fontSize:17, height:500, textAlignVertical:"top"}} value={this.state.localPost.content} onChangeText={(text) => {this.setState({localPost:{...this.state.localPost, content:text}});}}/>
            </View>
        );
    }
}

export default SudaUpdateChat;