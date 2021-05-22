import React, {Component} from "react";
import {View, Text, TextInput, ScrollView, Alert, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ModalDropDown from "react-native-modal-dropdown";
import Mailer from "react-native-mail";
import axios from "axios";
import GLOBAL from "./Global.js";


class CommentList extends Component {
    constructor(props) {
        console.log("*** SudaDetailChat > CommentList *** constructor");

        super(props);
        this.state = {localComments:[]};
    }
    componentDidMount() {
        console.log("*** SudaDetailChat > CommentList *** componentDidMount");
        this.getLocalComments();
    }
    componentDidUpdate() {
        console.log("*** SudaDetailChat > CommentList *** componentDidUpdate");
    }
    componentWillUnmount() {
        console.log("*** SudaDetailChat > CommentList *** componentWillUnmount");
    }
    componentWillReceiveProps() {
        console.log("*** SudaDetailChat > CommentList *** componentWillReceiveProps");
    }

    /* 댓글 조회(/api/localComment/ GET) 함수 */
    getLocalComments() {
        var localPostId = this.props.navigation.getParam("localPostId");
        
        axios({
            method  :"GET",
            url     :"http://3.35.202.156/api/localComment/" + localPostId,
            headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
            data    :{}
        }).then(({data}) => {
            var localComments = [];
            data.data.list.forEach(function(item) {
                localComments.push(item);
                if(item.subComments.length > 0) {
                    localComments = localComments.concat(item.subComments);
                }
            })

            this.setState({localComments:localComments});
        });
    }
    /* 댓글 수정(/api/localComment/ POST 함수) */
    updateLocalComment(localComment) {
        Alert.alert("", "댓글 수정 개발중...", [{text:"예"}]);
    }
    /* 댓글 삭제(/api/localComment/ DELETE 함수) */
    deleteLocalComment(localComment) {
        Alert.alert("", "정말 삭제하시겠습니까?", [{text:"예", onPress:() => {
            axios({
                method  :"DELETE",
                url     :"http://3.35.202.156/api/localComment/" + localComment.commentId,
                headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
                data    :{}
            }).then(({data}) => {
                if(data.resultCode == "00")
                    this.getLocalComments();
            });
        }}, {text:"아니오"}]);
    }
    /* 대댓글 등록(/api/localComment/ POST) 함수 */
    addSubComment(localComment) {
        Alert.alert("", "대댓글 등록 개발중...", [{text:"예"}]);
    }

    render() {
        console.log("*** SudaDetailChat > CommentList *** render");

        return (
            this.state.localComments.map(localComment => {
                return (
                    <View key={localComment.commentId ? localComment.commentId : localComment.subCommentId} style={{paddingLeft:localComment.commentId ? 0 : 20, paddingTop:5, paddingBottom:5, borderBottomWidth:0.5, borderBottomColor:localComment.commentId ? "#e0e0e0" : "#ffffff", backgroundColor:localComment.commentId ? "#ffffff" : "#e9e9e9"}}>
                        <View style={{height:13, flexDirection:"row", alignSelf:"flex-end"}}>
                            <Icon onPress={() => {this.updateLocalComment(localComment);}} name="chatbox-ellipses" size={14} color="#808080" style={{marginRight:5, display:localComment.commentId && localComment.regMemberId == GLOBAL.MEMBERID ? "flex" : "none"}}></Icon>
                            <Icon onPress={() => {this.deleteLocalComment(localComment);}} name="trash" size={14} color="#808080" style={{marginRight:5, display:localComment.commentId && localComment.regMemberId == GLOBAL.MEMBERID ? "flex" : "none"}}></Icon>
                            <Icon onPress={() => {this.addSubComment(localComment);}} name="add-circle" size={14} color="#808080" style={{display:localComment.commentId ? "flex" : "none"}}></Icon>
                        </View>
                        <Text style={{height:20, fontSize:13, color:"#50bcdf"}}>{localComment.regMemberNm}</Text>
                        <Text style={{height:20, fontSize:13}}>{localComment.commentId ? (localComment.delYn == "Y" ? "삭제된 댓글입니다." : localComment.content) : localComment.content}</Text>
                        <Text style={{height:20, fontSize:13, color:"#808080"}}>{localComment.regDate}</Text>
                    </View>
                )
            }) 
        )
    }
}

class SudaDetailChat extends Component {
    constructor(props) {
        console.log("*** SudaDetailChat *** constructor");

        super(props);
        this.state = {localPost:{}, content:""};
    }
    componentDidMount() {
        console.log("*** SudaDetailChat *** componentDidMount");
        this.getLocalPost();
    }
    componentDidUpdate() {
        console.log("*** SudaDetailChat *** componentDidUpdate");
    }
    componentWillUnmount() {
        console.log("*** SudaDetailChat *** componentWillUnmount");
    }
    componentWillReceiveProps() {
        console.log("*** SudaDetailChat *** componentWillReceiveProps");
    }

    /* 게시글 상세 조회(/api/localPost/ GET) 함수 */
    getLocalPost() {
        var postId = this.props.navigation.getParam("localPostId");
        
        axios({
            method  :"GET",
            url     :"http://3.35.202.156/api/localPost/" + postId,
            headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
            data    :{}
        }).then(({data}) => {
            this.setState({localPost:data.data});
        });
    }
    /* 게시글 컨트롤 메뉴 함수 */
    controlLocalPost(value, localPost) {
        switch(value) {
            case "수정하기":
                this.props.navigation.navigate("SudaUpdateChatTab", this.state.localPost);
                break;

            case "삭제하기":
                Alert.alert("", "정말 삭제하시겠습니까?", [{text:"예", onPress:() => Alert.alert("", "게시글 삭제 API 연동 예정") }, {text:"아니오"}]);
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
    /* 게시글 좋아요 등록 or 취소(/api/likePost POST or DELETE) 함수 */
    likeLocalPostOrNot(localPost) {
        axios({
            method  :localPost.likeYn ? "DELETE" : "POST",
            url     :"http://3.35.202.156/api/likePost/" + localPost.localPostId,
            headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
            data    :{}
        }).then(({data}) => {
            if(data.resultCode == "00") 
                this.getLocalPost();
        });
    }
    /* 댓글 등록(/api/localComment POST) 함수 */
    addLocalContent() {
        if(this.state.content != "")
            axios({
                method  :"POST",
                url     :"http://3.35.202.156/api/localComment",
                headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
                data    :{localPostId:this.state.localPost.localPostId, content:this.state.content}
            }).then(({data}) => {
                if(data.resultCode == "00") 
                    this.getLocalPost();
            });
    }

    render() {
        console.log("*** SudaDetailChat *** render");

        return (
            <View style={{padding:20, height:"100%", backgroundColor:"#ffffff"}}>
                <View>
                    <ModalDropDown onSelect={(idx, value) => {this.controlLocalPost(value, this.state.localPost);}} options={this.state.localPost.regMemberId == GLOBAL.MEMBERID ? ["수정하기", "삭제하기"] : ["신고하기"]} defaultValue="…" textStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} style={{height:20, alignSelf:"flex-end"}} dropdownTextStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} dropdownStyle={{width:80, height:"auto"}}></ModalDropDown>
                    <Text style={{fontSize:30, textAlignVertical:"center", textAlign:"left", fontWeight:"600"}}>{this.state.localPost.title}</Text>
                    <Text style={{height:30, fontSize:12, textAlignVertical:"center", textAlign:"left", fontWeight:"600", color:"#50bcdf"}}>{this.state.localPost.regMemberNm}</Text>
                    <Text style={{height:30, fontSize:12, textAlignVertical:"top", textAlign:"left", fontWeight:"600", color:"#808080", borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>{this.state.localPost.regDate}</Text>
                    <Text style={{height:150, fontSize:17, textAlignVertical:"top", textAlign:"left", fontWeight:"600", paddingTop:20}}>{this.state.localPost.content}</Text>
                    <View style={{height:20, flexDirection:"row", alignItems:"center", paddingBottom:20, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>
                        <Icon name="chatbox-ellipses" size={12} color="#808080" style={{marginTop:2}}></Icon>
                        <Text style={{width:35, fontSize:14, color:"#808080", marginLeft:4}}>{this.state.localPost.commentCnt}</Text>
                        <Icon onPress={() => {this.likeLocalPostOrNot(this.state.localPost);}} name="thumbs-up" size={12} color={this.state.localPost.likeYn ? "#50bcdf" : "#808080"}></Icon>
                        <TouchableOpacity onPress={() => {this.likeLocalPostOrNot(this.state.localPost);}}>
                            <Text style={{width:35, fontSize:14, color:(this.state.localPost.likeYn ? "#50bcdf" : "#808080"), marginLeft:4}}>{this.state.localPost.likeCnt}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{height:150}}>
                    <CommentList navigation={this.props.navigation}/>
                </ScrollView>
                <View style={{marginTop:10, height:40, flexDirection:"row", alignItems:"center"}}>
                    <TextInput style={{width:"90%", borderWidth:1, borderColor:"#e0e0e0", paddingTop:10}} value={this.state.content} onChangeText={(text) => {this.setState({content:text});}}/>
                    <TouchableOpacity style={{width:"10%", marginLeft:5}} onPress={() => {this.addLocalContent();}}>
                        <Text style={{fontSize:13, color:"#50bcdf", fontWeight:"700"}}>댓글</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default SudaDetailChat;