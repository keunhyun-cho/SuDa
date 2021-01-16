import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from "react-native";

const Popup = props => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <Text>This is Popup!</Text>
          <TouchableHighlight onPress={props.setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};
export default Popup;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  modal: {
    width: "80%",
    height: "20%"
  }
});