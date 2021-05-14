import React,{Component} from 'react';
import {View, Text, ScrollView, Alert} from "react-native";
import axios from "axios";
import GLOBAL from '../Global.js';
import ModalDropDown from "react-native-modal-dropdown";
import Icon from 'react-native-vector-icons/Ionicons';

 
class PostMyList extends Component {
    constructor(props) {
        super(props);
        console.log("in constructor");
    }

    state = {
        localPosts:[]
    };

    getData() {
        // console.log("왜 403???? GLOBAL.TOKEN = " + GLOBAL.TOKEN);
        axios.get("http://3.35.202.156/api/localPost", {headers:{"X-AUTH-TOKEN":GLOBAL.TOKEN}, data:{}})
        .then(({data}) => {
            this.setState({localPosts:data.data.list});
            console.log("in getData = " + JSON.stringify(this.state.localPosts));
        })
    }

    componentDidMount() {
        console.log("in componentDidMount");
        this.getData();

    }

    componentDidUpdate() {
        console.log("in componentDidUpdate");
    }
 
    controlLocalPost(value, localPost) {
        switch(value) {
            case "수정하기":
                console.log("수정 API 연동 예정 & 상세조회, 수정 화면 문의 필요"); 
                break;

            case "삭제하기":
                Alert.alert("", "정말 삭제하시겠습니까?", [{text:"예", onPress:() => console.log("삭제 API 연동 예정") }, {text:"아니오"}]);
                break;
        }
    }

    render() {
        return (
            this.state.localPosts.map(localPost => {
                localPost.menuItems = ["수정하기", "삭제하기"];

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
export default class SudaTabInfo extends Component {

    render(){
        return(
            <View>
                <Text stickyHeaderIndices= {2} style={{fontSize:16, height:50, textAlignVertical:"center", textAlign:"center", fontWeight:"600", padding:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>당신의 게시글</Text>
                    <View style={{height:90,backgroundColor:"#FFF",borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>
                        <Text style={{fontSize : 40, fontWeight:"1000" , textAlign:"center", fontWeight:"600",}} >ID</Text>
                        <Text style={{fontSize : 18, fontWeight:"1000" , textAlign:"center", fontWeight:"600",}} >{GLOBAL.MEMBERNM}</Text>
                    </View>
                    <ScrollView style={{backgroundColor:"#FFF"}}>
                        <PostMyList/>
                    </ScrollView>
            </View>
        );
    }
}
