import React, { Component } from 'react';

import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  TouchableOpacity,
  DatePickerAndroid,
  TimePickerAndroid
} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";


export default class EventDataForm extends Component {
  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.state = {
        chosenDate: new Date(),
        chosenAndroidTime: '00:00',
        androidDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
        valor: '',
      };
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  setDateAndroid = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
      date: new Date(),
      minDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ androidDate: `${day}/${month + 1}/${year}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  setTimeAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        const m = (minute < 10) ? `0${minute}` : minute;
        const h = (hour < 10) ? `0${hour}` : hour;
        console.log(`time: ${hour}:${minute}`);
        this.setState({ chosenAndroidTime: `${h}:${m}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  render(){

    const source = this.mapKeyToImagePath(this.props.formImage);

    return(
      <View style={styles.formContainer}>

        <Image source={source} style={styles.eventImage} />

        <Text style={styles.eventName}>{this.props.formName}</Text>

          <TouchableOpacity onPress={() => this.setDateAndroid()}>
            <View style={styles.pickerContainer}>
              <Icon name="ios-calendar" size={25} style={styles.iconPicker}/>
              <Text style={{ fontSize: 16 }}>
                {this.state.androidDate}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setTimeAndroid()}>
            <View style={styles.pickerContainer}>
              <Icon name="ios-time" size={25} style={styles.iconPicker}/>
              <Text style={{fontSize: 16 }}>
                {this.state.chosenAndroidTime}
              </Text>
            </View>
          </TouchableOpacity>

          <TextInput
              style={styles.inputText}
              placeholder={this.props.placeholder}
              onChangeText={(valor) => this.setState({valor})}
              value={this.state.valor}
            />


      </View>
    )
  }

  mapKeyToImagePath(key) {
    return {
      banho_bg: require("../assets/Images/banho-tosa.jpeg"),
      //doses_bg: require('../Images/Products/doses_bg.png'),
      //shots_bg: require('../Images/Products/shots_bg.png'),
    }[key];
  }

}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 10,
  },
  eventImage: {
    width: "100%",
    height: 200,
    paddingBottom: 20,
  },
  eventName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
    paddingBottom: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  iconPicker: {
    marginRight: 20
  },
  inputText: {
    fontSize: 18,
  },
  rightIcon: {
    position: 'absolute',
    right: 20,
  }
});