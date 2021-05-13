import React, {Component} from "react";
import {View, TextInput, Text, Button, ScrollView} from "react-native";
import axios from "axios";
import GLOBAL from "./Global.js";

class SudaDetailChat extends Component {
    render() {
        return(
            <View>
                <Text style={{fontSize:16, height:50, textAlignVertical:"center", textAlign:"center", fontWeight:"600", padding:10, borderBottomWidth:0.5, borderBottomColor:"#e0e0e0"}}>제목</Text>
                <ScrollView/>
            </View>
        );
    }
}

export default SudaDetailChat;