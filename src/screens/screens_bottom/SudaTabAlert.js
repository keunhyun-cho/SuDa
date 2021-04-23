import React,{Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
 
export default class SudaTabAlert extends Component {
    render(){

        function AlertLists(){

            let alertList = [{title:'공덕주민24님이 동네 게시판에 새로운 소식을 남겼습니다.',date:'19년 10월 14일'},
                             {title:'공덕주민20님이 공덕주민19님의 게시글에 댓글을 남겼습니다.',date:'19년 10월 14일'},
                             {title:'공덕주민19님이 공덕주민19님의 게시글에 댓글을 남겼습니다.',date:'19년 10월 11일'},
                             {title:'공덕주민1님이 동네 게시판에 새로운 소식을 남겼습니다.',date:'19년 10월 11일'},
                             {title:'공덕주민2님이 공덕주민18님의 게시글을 좋아합니다.',date:'21년 04월 02일'},
                             {title:'공덕주민24님이 동네 게시판에 새로운 소식을 남겼습니다.',date:'19년 10월 14일'},
                             {title:'공덕주민20님이 공덕주민19님의 게시글에 댓글을 남겼습니다.',date:'19년 10월 14일'},
                             {title:'공덕주민19님이 공덕주민19님의 게시글에 댓글을 남겼습니다.',date:'19년 10월 11일'},
                             {title:'공덕주민1님이 동네 게시판에 새로운 소식을 남겼습니다.',date:'19년 10월 11일'},
                             {title:'공덕주민2님이 공덕주민18님의 게시글을 좋아합니다.',date:'21년 04월 02일'}];

            return alertList.map(alt => {
                
                return (
                    <View style={{height:98, paddingTop:14, paddingLeft:10, borderBottomWidth:1, paddingRight:10, paddingBottom:8, borderBottomColor:"#e0e0e0", backgroundColor:"#ffffff"}}>
                        <View style={{flex:1, flexDirection:"row", height:40}}>
                            <Text style={{color:"#2E2E2E", fontWeight:"700"}} numberOfLines={2} ellipsizeMode="middle">{alt.title + " 💕"}</Text>
                        </View>
                        <View>
                            <Text style={{height:20, textAlign :'right', color : '#727272',  fontSize:13}}>{alt.date}</Text>
                        </View>
                    </View>
                )
            })
        }


        return(
            <View>
            <Text  style={{fontSize:16, height:50, textAlignVertical:"center", textAlign:"center", fontWeight:"600", padding:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>알림</Text>
                <ScrollView>                
                    <AlertLists/>
                </ScrollView>
            </View>
        );
    }
}
