import Icon from 'react-native-vector-icons/Ionicons';
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import ModalDropDown from "react-native-modal-dropdown";
import GLOBAL from "../Global.js";
import axios from "axios";

class PostList extends Component {
    constructor(props) {
        super(props);
        console.log("in constructor");
    }

    state = {
        data:[]
    };

    getData() {
        axios.get("http://3.35.202.156/api/localPost", {headers:{"X-AUTH-TOKEN":GLOBAL.TOKEN}, data:{}})
        .then(({data}) => {
            this.setState({data:data.data.localPosts});
            console.log("in getData = " + JSON.stringify(this.state.data));
        })
    }

    componentDidMount() {
        console.log("in componentDidMount");
        this.getData();
    }

    componentDidUpdate() {
        console.log("in componentDidUpdate");
    }
 
    componentWillUnmount() {
        console.log("in componentWillUnmount");
    }

    render() {
        return (
            this.state.data.map(localPost => {
                localPost.menuItems = (localPost.regMemberId == GLOBAL.MEMBERID ? ["수정하기", "삭제하기"] : ["신고하기"]);

                return (
                    <View key={localPost.localPostId} style={{height:140, paddingTop:10, paddingLeft:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0", backgroundColor:"#ffffff"}}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", height:40}}>
                            <Text style={{height:20, width:"50%", color:"#50bcdf", fontWeight:"700", fontSize:15}}>{localPost.title}</Text>
                            <ModalDropDown options={localPost.menuItems} defaultValue={localPost.regDate} textStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} style={{marginRight:11, height:20, width:70}} dropdownTextStyle={{textAlign:"right", fontWeight:"600", color:"#808080", fontSize:13}} dropdownStyle={{width:80, height:"auto"}}></ModalDropDown>
                        </View>
                        <Text style={{height:65, color:"#2e2e2e", fontSize:14}}>{localPost.contents}</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-between", height:20}}>
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
        return (
            <ScrollView>
                <Text style={{fontSize:16, height:50, textAlignVertical:"center", textAlign:"center", fontWeight:"600", padding:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>공덕동 수다방</Text>
                <PostList></PostList>
            </ScrollView>
        );
    }
}