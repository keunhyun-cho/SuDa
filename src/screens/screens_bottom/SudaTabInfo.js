import React,{Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import axios from "axios";
import Global from '../Global.js';

 
export default class SudaTabInfo extends Component {
    constructor(props) {
        super(props);
        console.log("in constructor" +props);
    }
    render(){
        return(
            <ScrollView style={{backgroundColor:"#FFF"}}>
                <Text style={{fontSize:16, height:50, textAlignVertical:"center", textAlign:"center", fontWeight:"600", padding:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>당신의 게시글</Text>
                <View style={{fheight:60}}>
                    <Text style={{fontSize : 40, fontWeight:"1000" , textAlign:"center", fontWeight:"600",}} >ID</Text>
                    <Text style={{fontSize : 18, fontWeight:"1000" , textAlign:"center", fontWeight:"600",}} >{'공덕주민 ' + Global.MEMBERID}</Text>
                </View>
            </ScrollView>
        );
    }
}
