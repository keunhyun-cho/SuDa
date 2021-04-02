import Icon from 'react-native-vector-icons/Ionicons';
import React, {Component} from "react";
import {View, Text} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import GLOBAL from "../Global.js";
import axios from "axios";
 
export default class SudaTabHome extends Component {
    render(){
        function ChatLists() {
            // axios.get("http://3.35.202.156/api/localPost", {}, {headers:{"X-AUTH-TOKEN":GLOBAL.TOKEN}})
            // .then(({data}) => {
            //     console.log("localPostData ===> " + JSON.stringify(data));
            // })

            // let chatList = [];
            var chatList = [{chatId:"1", title:"가입알림", contents:"공덕주민29님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민29", repleCnt:0, likeCnt:0, isILike:false, postDate:"2021-03-07", postToken:"TOKEN29"}, 
                            {chatId:"2", title:"가입알림", contents:"공덕주민28님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민28", repleCnt:2, likeCnt:1, isILike:true,  postDate:"2021-03-07", postToken:"TOKEN28"}, 
                            {chatId:"3", title:"가입알림", contents:"공덕주민27님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민27", repleCnt:1, likeCnt:1, isILike:false, postDate:"2021-03-06", postToken:"TOKEN27"}, 
                            {chatId:"4", title:"가입알림", contents:"공덕주민26님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민26", repleCnt:0, likeCnt:3, isILike:true,  postDate:"2021-03-04", postToken:"TOKEN26"}, 
                            {chatId:"5", title:"가입알림", contents:"공덕주민25님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민25", repleCnt:1, likeCnt:1, isILike:true,  postDate:"2021-03-02", postToken:"TOKEN25"}, 
                            {chatId:"6", title:"가입알림", contents:"공덕주민24님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민24", repleCnt:3, likeCnt:1, isILike:true,  postDate:"2021-03-01", postToken:"TOKEN24"}];
            var menuItems = [{label:"수정하기", value:"UPDATE"}, {label:"삭제하기", value:"DELETE"}];

            return chatList.map(chat => {
                return (
                    <View key={chat.chatId} style={{height:98, paddingTop:10, paddingLeft:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0", backgroundColor:"#ffffff"}}>
                        <View style={{flex:1, flexDirection:"row", height:24}}>
                            <Text style={{height:20, width:"50%", color:"#50bcdf", alignItems:"flex-start"}}>{chat.title}</Text>
                            <DropDownPicker placeholder="zz" items={menuItems} containerStyle={{height:20, width:100, alignItems:"flex-end"}} itemStyle={{height:20, width:100, color:"#303030"}}/>
                        </View>
                        <Text style={{height:50, color:"#303030", fontSize:12}}>{chat.contents}</Text>
                        <View style={{flex:1, flexDirection:"row", height:20}}>
                            <Icon name="ios-remove-circle-outline" stlye={{height:20, width:"10%", alignItems:"flex-start"}}></Icon>
                            <Text style={{height:20, width:"5%"}}>{chat.likeCnt}</Text>
                            <Icon name="ios-thumbs-up-outline" stlye={{height:20, width:"60%"}}></Icon>
                            <Text style={{height:20, width:"5%"}}>{chat.repleCnt}</Text>
                            <Text style={{height:20, width:"30%", color:"#303030", fontSize:12, alignItems:"flex-end"}}>{chat.memberNm + " 🥰"}</Text>
                        </View>
                    </View>
                )
            })
        }

        return(
            <View>
                <Text style={{fontSize:16, height:50, textAlignVertical:"center", textAlign:"center", fontWeight:"600", padding:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>공덕동 수다방</Text>
                <ChatLists></ChatLists>
            </View>
        );
    }
}