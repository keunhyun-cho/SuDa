import React, {Component} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {View, TextInput, Text, Button, ScrollView, TouchableOpacity} from "react-native";
import axios from "axios";
import GLOBAL from "./Global.js";

class CommentList extends Component {
    constructor(props) {
        console.log("CommentList constructor");

        super(props);
        this.state = {localComments:[]};
    }

    componentDidMount() {
        console.log("CommentList componentDidMount");
        this.getData();
    }

    componentDidUpdate() {
        console.log("CommentList componentDidUpdate");
    }
 
    // componentWillUnmount() {
    //     console.log("CommentList componentWillUnmount");
    // }

    getData() {
        var postId = this.props.navigation.getParam("postId");
        console.log("SudaTabHome → SudaDetailChat this.props.navigation.getParam(\"postId\") = " + postId);

        axios.get("http://3.35.202.156/api/localComment/" + postId, {headers:{"X-AUTH-TOKEN":GLOBAL.TOKEN}, data:{}})
        .then(({data}) => {
            var localComments = [];
            data.data.list.forEach(function(item) {
                localComments.push(item);
                if(item.subComments.length > 0) {
                    localComments = localComments.concat(item.subComments);
                }
            })

            this.setState({localComments:localComments});
            console.log("CommentList getData");
            console.log(JSON.stringify(this.state.localComments));
        })
    }

    render() {
        return (
            this.state.localComments.map(localComment => {
                return (
                    <TouchableOpacity key={localComment.commentId ? localComment.commentId : localComment.subCommentId} style={{paddingLeft:localComment.commentId ? 0 : 20, paddingTop:5, paddingBottom:5, height:70, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0", backgroundColor:"#ffffff"}}>
                        <Text style={{height:20, fontSize:12, color:"#50bcdf"}}>{localComment.regMemberNm}</Text>
                        <Text style={{height:20, fontSize:12}}>{localComment.commentId ? (localComment.delYn ? "삭제된 댓글입니다." : localComment.content) : localComment.content}</Text>
                        <Text style={{height:20, fontSize:12, color:"#808080"}}>{localComment.regDate}</Text>
                    </TouchableOpacity>
                )
            }) 
        )
    }
}

class SudaDetailChat extends Component {
    constructor(props) {
        console.log("SudaDetailChat constructor");

        super(props);
        this.state = {localPost:{}};
    }

    componentDidMount() {
        console.log("SudaDetailChat componentDidMount");
        this.getData();
    }

    componentDidUpdate() {
        console.log("SudaDetailChat componentDidUpdate");
    }
 
    // componentWillUnmount() {
    //     console.log("SudaDetailChat componentWillUnmount");
    // }

    getData() {
        var postId = this.props.navigation.getParam("postId");
        console.log("SudaTabHome → SudaDetailChat this.props.navigation.getParam(\"postId\") = " + postId);

        axios.get("http://3.35.202.156/api/localPost/" + postId, {headers:{"X-AUTH-TOKEN":GLOBAL.TOKEN}, data:{}})
        .then(({data}) => {
            this.setState({localPost:data.data});
            console.log("SudaDetailChat getData");
            console.log(JSON.stringify(this.state.localPost));
        })
    }

    render() {
        return(
            <View style={{padding:20, height:"100%", backgroundColor:"#ffffff"}}>
                <View>
                    <Text style={{fontSize:30, textAlignVertical:"center", textAlign:"left", fontWeight:"600"}}>{this.state.localPost.title}</Text>
                    <Text style={{height:30, fontSize:12, textAlignVertical:"center", textAlign:"left", fontWeight:"600", color:"#50bcdf"}}>{this.state.localPost.regMemberNm}</Text>
                    <Text style={{height:30, fontSize:12, textAlignVertical:"top", textAlign:"left", fontWeight:"600", color:"#808080", borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>{this.state.localPost.regDate}</Text>
                    <Text style={{height:300, fontSize:17, textAlignVertical:"top", textAlign:"left", fontWeight:"600", paddingTop:20}}>{this.state.localPost.contents}</Text>
                    <View style={{height:20, flexDirection:"row", alignItems:"center", paddingBottom:20, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>
                        <Icon name="chatbox-ellipses" size={12} color="#808080" style={{marginTop:2}}></Icon>
                        <Text style={{width:35, fontSize:14, color:"#808080", marginLeft:4}}>{this.state.localPost.likeCnt}</Text>
                        <Icon name="thumbs-up" size={12} color={this.state.localPost.likeYn ? "#50bcdf" : "#808080"}></Icon>
                        <Text style={{width:35, fontSize:14, color:(this.state.localPost.likeYn ? "#50bcdf" : "#808080"), marginLeft:4}}>{this.state.localPost.commentCnt}</Text>
                    </View>
                </View>
                <ScrollView>
                    <CommentList navigation={this.props.navigation}/>
                </ScrollView>
            </View>
        );
    }
}

export default SudaDetailChat;