import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const foodButton = props => (
  <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
    <View style={styles.buttonContainer}>
      <Icon
        name='md-add'
        size={40}
        color="white"
        //style={styles.buttonIcon}
      />
    </View>
  </TouchableOpacity>
)


const styles = StyleSheet.create({
  buttonContainer: {
      height: 50,
      width: 50,  //The Width must be the same as the height
      borderRadius:150, //Then Make the Border Radius twice the size of width or Height
      backgroundColor:'#0bccde',
      justifyContent: 'center',
      alignItems: "center",
  },
  buttonIcon: {
    marginRight: 20
  },
});

export default foodButton;
