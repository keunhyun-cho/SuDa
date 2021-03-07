import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GLOBAL from './Global.js';
 
export default class SudaTabHome extends Component {
    render(){
        function ChatLists(props) {
            let chatList = props.chatList;
            let chatListTexts = [];

            for(var i = 0; i < chatList.length; i++) 
                chatListTexts.push(chatList[i].title + ' 💕 ' + chatList[i].contents + ' -' + chatList[i].memberNm + '-');
            
            return chatListTexts.map((chatListText) => {
                return (
                    <View style={styles.chatTextArea}>
                        <Text style={styles.chatText}>{chatListText}</Text>
                    </View>
                )
            })
        }

        return(
            <View style={styles.SudaTabHomeTitleArea}>
                <Text style={styles.SudaTabHomeTitle}>공덕동 수다방</Text>
                <View>
                    <ChatLists chatList={[{title:"가입알림", contents:"공덕주민30님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민30"}, 
                                          {title:"가입알림", contents:"공덕주민29님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민29"},
                                          {title:"가입알림", contents:"공덕주민28님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민27"},
                                          {title:"가입알림", contents:"공덕주민27님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민26"},
                                          {title:"가입알림", contents:"공덕주민26님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민25"},
                                          {title:"가입알림", contents:"공덕주민25님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민24"},
                                          {title:"가입알림", contents:"공덕주민24님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민23"}]}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    SudaTabHomeTitleArea: {
        justifyContent:'flex-start', 
        height: 50,
        borderBottomColor:'#e3e3e3',
        borderBottomWidth:0.5
    },
    SudaTabHomeTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        padding: 10,
    },
    chatTextArea: {
        height: 86,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    chatText: {
        fontSize: 16,
        paddingTop: 10,
        paddingLeft: 10,
    }
});