import React, {Component} from "react";
import {View, Text, ScrollView, Alert, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ModalDropDown from "react-native-modal-dropdown";
import Mailer from "react-native-mail";
import axios from "axios";
import GLOBAL from "../Global.js";
import ActionButton from "react-native-action-button";


class PostList extends Component {
    constructor(props) {
        console.log("[SudaTabHome's PostList] constructor");

        super(props);
        this.state = {localPosts:[]};
    }
    componentWillReceiveProps(nextProps) {
        console.log("[SudaTabHome's PostList] componentWillReceiveProps");
        this.getLocalPosts();
    }
    componentDidMount() {
        console.log("[SudaTabHome's PostList] componentDidMount");
        this.getLocalPosts();
    }
    componentDidUpdate() {
        console.log("[SudaTabHome's PostList] componentDidUpdate");
    }

    /* 게시글 리스트 조회(/api/localPost GET) 함수 */
    getLocalPosts() {
        axios({
            method  :"GET",
            url     :"http://3.35.202.156/api/localPost",
            headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
            data    :{}
        }).then(({data}) => {
            console.log(JSON.stringify(data.data.list));
            this.setState({localPosts:data.data.list});
        });
    }
    /* 게시글 컨트롤 메뉴 함수 */
    controlLocalPost(value, localPost) {
        switch(value) {
            case "수정하기":
                this.props.navigation.navigate("SudaUpdateChatTab", {localPostId:localPost.localPostId});
                break;

            case "삭제하기":
                Alert.alert("", "정말 삭제하시겠습니까?", [{text:"예", onPress:() => {
                    axios({
                        method  :"DELETE",
                        url     :"http://3.35.202.156/api/localPost/" + localPost.localPostId,
                        headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
                        data    :{}
                    }).then(({data}) => {
                        if(data.resultCode == "00")
                            this.getLocalPosts();
                    });
                }}, {text:"아니오"}]);
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
    /* 게시글 상세조회 화면 이동 함수 */
    goToDetailChat(localPost) {
        this.props.navigation.navigate("SudaDetailChatTab", {localPostId:localPost.localPostId});
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
                this.getLocalPosts();
        });
    }

    render() {
        console.log("[SudaTabHome's PostList] render");

        return (
            this.state.localPosts.map(localPost => {
                return (
                    <TouchableOpacity onPress={() => {this.goToDetailChat(localPost);}} key={localPost.localPostId} style={{height:120, paddingTop:10, paddingLeft:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0", backgroundColor:"#ffffff"}}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", height:35}}>
                            <Text style={{height:20, width:"50%", color:"#50bcdf", fontWeight:"700", fontSize:15}}>{localPost.title}</Text>
                            <ModalDropDown onSelect={(idx, value) => {this.controlLocalPost(value, localPost);}} options={(localPost.regMemberId == GLOBAL.MEMBERID ? ["수정하기", "삭제하기"] : ["신고하기"])} defaultValue={localPost.regDate.substring(0, 10)} textStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} style={{marginRight:11, height:20, width:70}} dropdownTextStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} dropdownStyle={{width:80, height:"auto"}}></ModalDropDown>
                        </View>
                        <Text style={{height:50, color:"#2e2e2e", fontSize:14}}>{localPost.content}</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-between", height:25}}>
                            <View style={{flexDirection:"row", height:20, width:"50%", alignItems:"center"}}>
                                <Icon onPress={() => {this.goToDetailChat(localPost);}} name="chatbox-ellipses" size={12} color="#808080" style={{marginTop:2}}></Icon>
                                <TouchableOpacity onPress={() => {this.goToDetailChat(localPost);}} >
                                    <Text style={{width:35, fontSize:14, color:"#808080", marginLeft:4}}>{localPost.commentCnt}</Text>
                                </TouchableOpacity>
                                <Icon onPress={() => {this.likeLocalPostOrNot(localPost);}} name="thumbs-up" size={12} color={localPost.likeYn ? "#50bcdf" : "#808080"}></Icon>
                                <TouchableOpacity onPress={() => {this.likeLocalPostOrNot(localPost);}} >
                                    <Text style={{width:35, fontSize:14, color:(localPost.likeYn ? "#50bcdf" : "#808080"), marginLeft:4}}>{localPost.likeCnt}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{width:"50%", color:"#808080", fontSize:13, fontWeight:"600", textAlign:"right", paddingRight:15}}>{localPost.regMemberNm}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }) 
        )
    }
}

class SudaTabHome extends Component {
    constructor(props) {
        console.log("[SudaTabHome] constructor");

        super(props);
    }
    componentWillReceiveProps(nextProps) {
        console.log("[SudaTabHome] componentWillReceiveProps");
    }
    componentDidMount() {
        console.log("[SudaTabHome] componentDidMount");
    }
    componentDidUpdate() {
        console.log("[SudaTabHome] componentDidUpdate");
    }
    
    render() {
        console.log("[SudaTabHome] render");

        return (
            <View>
                <Text style={{fontSize:16, height:50, textAlignVertical:"center", textAlign:"center", fontWeight:"700", padding:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0", backgroundColor:"#ffffff"}}>공덕동 수다방</Text>
                <ScrollView>
                    <PostList navigation={this.props.navigation}/>
                </ScrollView>
                <ActionButton style={{marginBottom:30}} buttonColor="#50bcdf" onPress={() => this.props.navigation.navigate("SudaAddChatTab")} />
            </View>
        );
    }
}

export default SudaTabHome;