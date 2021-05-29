import React,{Component} from 'react';
import {View, Text, ScrollView, Alert, TouchableOpacity} from "react-native";
import axios from "axios";
import GLOBAL from '../Global.js';
import ModalDropDown from "react-native-modal-dropdown";
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from "react-native-action-button";

 
class PostMyList extends Component {
    constructor(props) {
        console.log("[SudaTabInfo's PostList] constructor");
        super(props);
        this.state = {localPosts:[]};
    }

    componentWillReceiveProps(nextProps) {
        console.log("[SudaTabInfo's PostList] componentWillReceiveProps");
        this.getLocalPosts();
    }
    componentDidMount() {
        console.log("[SudaTabInfo's PostList] componentDidMount");
        this.getLocalPosts();
    }
    componentDidUpdate() {
        console.log("[SudaTabInfo's PostList] componentDidUpdate");
    }


     /* 게시글 리스트 조회(/api/localPost GET) 함수 */
     getLocalPosts() {
        axios({
            method  :"GET",
            url     :"http://3.35.202.156/api/localPost/My",
            headers :{"X-AUTH-TOKEN":GLOBAL.TOKEN},
            data    :{}
        }).then(({data}) => {
            console.log(JSON.stringify(data.data.list));
            this.setState({localPosts:data.data.list});
        });
    }


    // getData() {
    //     // console.log("왜 403???? GLOBAL.TOKEN = " + GLOBAL.TOKEN);
    //     axios.get("http://3.35.202.156/api/localPost", {headers:{"X-AUTH-TOKEN":GLOBAL.TOKEN}, data:{}})
    //     .then(({data}) => {
    //         this.setState({localPosts:data.data.list});
    //         console.log("in getData = " + JSON.stringify(this.state.localPosts));
    //     })
    // }

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
        console.log("[SudaTabInfo's PostList] render");

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
export default class SudaTabInfo extends Component {
    constructor(props) {
        console.log("[SudaTabInfo] constructor");

        super(props);
    }
    componentWillReceiveProps(nextProps) {
        console.log("[SudaTabInfo] componentWillReceiveProps");
    }
    componentDidMount() {
        console.log("[SudaTabInfo] componentDidMount");
    }
    componentDidUpdate() {
        console.log("[SudaTabInfo] componentDidUpdate");
    }
    

    render(){
        return(
            <View style={{flex:1}}>
                <Text stickyHeaderIndices= {2} style={{fontSize:16, height:50, textAlignVertical:"center", textAlign:"center", fontWeight:"600", padding:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>당신의 게시글</Text>
                <View style={{height:90,backgroundColor:"#FFF",borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>
                    <Text style={{fontSize : 40, fontWeight:"1000" , textAlign:"center", fontWeight:"600",}} >ID</Text>
                    <Text style={{fontSize : 18, fontWeight:"1000" , textAlign:"center", fontWeight:"600",}} >{GLOBAL.MEMBERNM}</Text>
                </View>
                <ScrollView style={{backgroundColor:"#FFF"}}>
                    <PostMyList navigation={this.props.navigation}/>
                </ScrollView>
                <ActionButton style={{marginTop:20}} buttonColor="#50bcdf" onPress={() => this.props.navigation.navigate("SudaAddChatTab")} />
            </View >
        );
    }
}
