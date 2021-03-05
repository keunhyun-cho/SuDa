import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Icon } from 'native-base';
 
export default class SudaTabHome extends Component {
    render(){
        function ChatLists(props) {
            let chatList = props.chatList;
            let chatListText = '';
            for(var i = 0; i < chatList.length; i++) 
                chatListText += chatList[i].title + ' 💕 ' + chatList[i].contents + ' -' + chatList[i].memberNm + '-' + '\n';
            
            return <Text style={styles.chatText}>{chatListText}</Text>;
        }

        return(
            <View style={styles.SudaTabHomeTitleArea}>
                <Text style={styles.SudaTabHomeTitle}>공덕동 수다방</Text>
                <View style={styles.SudaTabListArea}>
                    <ChatLists chatList={[{title:"가입알림", contents:"공덕주민30님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민30"}, 
                                          {title:"가입알림", contents:"공덕주민29님이 새로 오셨어요.\n반갑게 맞이해주세요.", memberNm:"공덕주민29"}]}/>
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
        fontWeight: '700',
        padding: 10,
    },
    SudaTabHomeListArea: {
        height: 100,
    },
    chatText: {
        
    }
});