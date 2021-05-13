import React, {Component} from "react";
import {View, Text, ScrollView, Alert, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ModalDropDown from "react-native-modal-dropdown";
import Mailer from "react-native-mail";
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
            console.log("CommentList getData");
            console.log(JSON.stringify(data.data));

            var localComments = [];
            data.data.list.forEach(function(item) {
                localComments.push(item);
                if(item.subComments.length > 0) {
                    localComments = localComments.concat(item.subComments);
                }
            })

            this.setState({localComments:localComments});
        })
    }

    controlLocalComment(value, localComment) {
        switch(value) {
            case "수정":
                break;

            case "삭제":
                break;

            case "대댓글 등록":
                break;
        }
    }

    render() {
        return (
            this.state.localComments.map(localComment => {
                return (
                    <View key={localComment.commentId ? localComment.commentId : localComment.subCommentId} style={{paddingLeft:localComment.commentId ? 0 : 20, paddingTop:5, paddingBottom:5, borderBottomWidth:0.5, borderBottomColor:localComment.commentId ? "#e0e0e0" : "#ffffff", backgroundColor:localComment.commentId ? "#ffffff" : "#e9e9e9"}}>
                        <ModalDropDown onSelect={(idx, value) => {this.controlLocalComment(value, localComment);}} options={localComment.regMemberId == GLOBAL.MEMBERID ? ["수정", "삭제", "대댓글 등록"] : ["대댓글 등록"]} defaultValue="…" textStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:15}} style={{height:20, alignSelf:"flex-end"}} dropdownTextStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} dropdownStyle={{width:80, height:"auto"}}></ModalDropDown>
                        <Text style={{height:20, fontSize:12, color:"#50bcdf"}}>{localComment.regMemberNm}</Text>
                        <Text style={{height:20, fontSize:12}}>{localComment.commentId ? (localComment.delYn ? "삭제된 댓글입니다." : localComment.content) : localComment.content}</Text>
                        <Text style={{height:20, fontSize:12, color:"#808080"}}>{localComment.regDate}</Text>
                    </View>
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
            console.log("SudaDetailChat getData");
            console.log(JSON.stringify(data.data));

            this.setState({localPost:data.data});
        })
    }

    controlLocalPost(value, localPost) {
        switch(value) {
            case "수정하기":
                Alert.alert("", "수정 API 연동 예정"); 
                break;

            case "삭제하기":
                Alert.alert("", "정말 삭제하시겠습니까?", [{text:"예", onPress:() => Alert.alert("", "삭제 API 연동 예정") }, {text:"아니오"}]);
                break;

            case "신고하기":
                Mailer.mail({
                    subject     :"동수다에 게시글 신고 드립니다.", 
                    recipients  :["dongsudasuda@gmail.com"], 
                    ccRecipients:[""], 
                    isHTML      :true, 
                    body        :"안녕하세요.<br>언제나 더 나은 동수다를 위해 노력해 주셔서 감사합니다.<br><br>" +
                                 "아래 신고 가이드 라인을 안내드리니 확인 후 최종 신고 부탁 드립니다.<br><br>" +
                                 "[신고 기준]<br>욕설/비하<br>개인 사생활 침해<br>음란성<br>게시글/댓글 도배<br>직접적 홍보<br><br>" +
                                 "동수다 팀에 신고글이 접수되면 신고 기준에 따라 확인 작업을 진행하며 필요에 따라 다시 연락드릴 수 있음을 알려 드립니다.<br>" +
                                 "빠른 회신이 필요하시다면 기타 연락처를 기재해 주시기 바랍니다.<br><br>감사합니다.<br>동수다 드림<br><br>" +
                                 "ID : " + localPost.regMemberNm + "<br>" +
                                 "작성일 : " + new Date()
                });
                break;
        }
    }

    render() {
        return (
            <View style={{padding:20, height:"100%", backgroundColor:"#ffffff"}}>
                <View>
                    <ModalDropDown onSelect={(idx, value) => {this.controlLocalPost(value, this.state.localPost);}} options={this.state.localPost.regMemberId == GLOBAL.MEMBERID ? ["수정하기", "삭제하기"] : ["신고하기"]} defaultValue="…" textStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:20}} style={{height:20, alignSelf:"flex-end"}} dropdownTextStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} dropdownStyle={{width:80, height:"auto"}}></ModalDropDown>
                    <Text style={{fontSize:30, textAlignVertical:"center", textAlign:"left", fontWeight:"600"}}>{this.state.localPost.title}</Text>
                    <Text style={{height:30, fontSize:12, textAlignVertical:"center", textAlign:"left", fontWeight:"600", color:"#50bcdf"}}>{this.state.localPost.regMemberNm}</Text>
                    <Text style={{height:30, fontSize:12, textAlignVertical:"top", textAlign:"left", fontWeight:"600", color:"#808080", borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>{this.state.localPost.regDate}</Text>
                    <Text style={{height:150, fontSize:17, textAlignVertical:"top", textAlign:"left", fontWeight:"600", paddingTop:20}}>{this.state.localPost.contents}</Text>
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