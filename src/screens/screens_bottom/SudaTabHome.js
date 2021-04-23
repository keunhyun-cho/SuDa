import Icon from 'react-native-vector-icons/Ionicons';
import React, {Component} from "react";
import {View, Text, ScrollView, Alert} from "react-native";
import ModalDropDown from "react-native-modal-dropdown";
import GLOBAL from "../Global.js";
import axios from "axios";
import Mailer from 'react-native-mail';

class PostList extends Component {
    constructor(props) {
        super(props);
        console.log("in constructor");
    }

    state = {
        localPosts:[]
    };

    getData() {
        axios.get("http://3.35.202.156/api/localPost", {headers:{"X-AUTH-TOKEN":GLOBAL.TOKEN}, data:{}})
        .then(({data}) => {
            this.setState({localPosts:data.data.localPosts});
            console.log("in getData = " + JSON.stringify(this.state.localPosts));
        })
    }

    componentDidMount() {
        console.log("in componentDidMount");
        this.getData();

        // this.props.navigation.addListener("willFocus", () => {
        //     console.log("in willfocus")
        // })
    }

    componentDidUpdate() {
        console.log("in componentDidUpdate");
    }
 
    // componentWillUnmount() {
    //     console.log("in componentWillUnmount");
    // }

    controlLocalPost(value, localPost) {
        switch(value) {
            case "수정하기":
                console.log("수정 API 연동 예정 & 상세조회, 수정 화면 문의 필요"); 
                break;

            case "삭제하기":
                Alert.alert("", "정말 삭제하시겠습니까?", [{text:"예", onPress:() => console.log("삭제 API 연동 예정") }, {text:"아니오"}]);
                break;

            case "신고하기":
                Mailer.mail({
                    subject: "동수다에 게시글 신고 드립니다.",
                    recipients: ["dongsudasuda@gmail.com"],
                    ccRecipients: [""],
                    body: "안녕하세요.<br>언제나 더 나은 동수다를 위해 노력해 주셔서 감사합니다.<br><br>" +
                          "아래 신고 가이드 라인을 안내드리니 확인 후 최종 신고 부탁 드립니다.<br><br>" +
                          "[신고 기준]<br>욕설/비하<br>개인 사생활 침해<br>음란성<br>게시글/댓글 도배<br>직접적 홍보<br><br>" +
                          "동수다 팀에 신고글이 접수되면 신고 기준에 따라 확인 작업을 진행하며 필요에 따라 다시 연락드릴 수 있음을 알려 드립니다.<br>" +
                          "빠른 회신이 필요하시다면 기타 연락처를 기재해 주시기 바랍니다.<br><br>감사합니다.<br>동수다 드림<br><br>" +
                          "ID : " + localPost.regMemberNm + "<br>" +
                          "작성일 : " + new Date(),
                    isHTML: true,
                    attachment: {
                      path: '',  // The absolute path of the file from which to read data.
                      type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                      name: '',   // Optional: Custom filename for attachment
                    }
                  }, (error, event) => {
                    Alert.alert(
                      error,
                      event,
                      [
                        {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                        {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
                      ],
                      { cancelable: true }
                    )
                  });
                break;
        }
    }

    render() {
        return (
            this.state.localPosts.map(localPost => {
                localPost.menuItems = (localPost.regMemberId == GLOBAL.MEMBERID ? ["수정하기", "삭제하기"] : ["신고하기"]);

                return (
                    <View key={localPost.localPostId} style={{height:130, paddingTop:10, paddingLeft:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0", backgroundColor:"#ffffff"}}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", height:35}}>
                            <Text style={{height:20, width:"50%", color:"#50bcdf", fontWeight:"700", fontSize:15}}>{localPost.title}</Text>
                            <ModalDropDown onSelect={(idx, value) => {this.controlLocalPost(value, localPost);}} options={localPost.menuItems} defaultValue={localPost.regDate.substring(0, 10)} textStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} style={{marginRight:11, height:20, width:70}} dropdownTextStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} dropdownStyle={{width:80, height:"auto"}}></ModalDropDown>
                        </View>
                        <Text style={{height:60, color:"#2e2e2e", fontSize:14}}>{localPost.contents}</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-between", height:25}}>
                            <View style={{flexDirection:"row", height:20, width:"50%", alignItems:"center"}}>
                                <Icon name="chatbox-ellipses" size={12} color="#808080" style={{marginTop:2}}></Icon>
                                <Text style={{width:35, fontSize:14, color:"#808080"}}>{localPost.likeCnt}</Text>
                                <Icon name="thumbs-up" size={12} color="#808080"></Icon>
                                <Text style={{width:35, fontSize:14, color:"#808080"}}>{localPost.commentCnt}</Text>
                            </View>
                            <Text style={{width:"50%", color:"#808080", fontSize:13, fontWeight:"600", textAlign:"right", paddingRight:15}}>{localPost.regMemberNm}</Text>
                        </View>
                    </View>
                )
            }) 
        )
    }
}
 
export default class SudaTabHome extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text style={{fontSize:16, height:50, textAlignVertical:"center", textAlign:"center", fontWeight:"600", padding:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>공덕동 수다방</Text>
                <ScrollView>
                    <PostList></PostList>
                </ScrollView>
            </View>
        );
    }
}