import React, {Component} from "react";
import {View, TextInput, Text, TouchableOpacity} from "react-native";
import axios from "axios";
import GLOBAL from "./Global.js";


class SudaUpdateChat extends Component {
    constructor(props) {
        console.log("*** SudaUpdateChat *** constructor");

        super(props);
    }
    componentDidMount() {
        console.log("*** SudaUpdateChat *** componentDidMount");
    }
    componentDidUpdate() {
        console.log("*** SudaUpdateChat *** componentDidUpdate");
    }
    componentWillUnmount() {
        console.log("*** SudaUpdateChat *** componentWillUnmount");
    }
    componentWillReceiveProps() {
        console.log("*** SudaUpdateChat *** componentWillReceiveProps");
    }
    
    render() {
        console.log("*** SudaUpdateChat *** render");

        return (
            <View></View>
        );
    }
}

export default SudaUpdateChat;