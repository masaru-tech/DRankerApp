import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Colors from '../Colors';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { displayName: null };
    this.register = this.register.bind(this)
  }

  register() {
    axios.post('http://192.168.56.111:3000/api/users', {
            display_name: this.state.displayName
          })
          .then((response) => {
            const jwt = response.data.jwt;
            Actions.main();
          })
          .catch((error) => {
            console.log(error);
          });
  }

  render() {
    return (
      <View style={styles.register}>
        <TextInput
          style={styles.displayName}
          onChangeText={(text) => this.setState({displayName: text})}
          value={this.state.displayName}
          placeholder="表示名を入力(後で変更可能)"
        />
        <Button
          large
          borderRadius={30}
          title='利用を開始する'
          onPress={this.register} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  displayName: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 20,
    margin: 20,
    paddingLeft: 15
  },
  register: {
    flex: 1,
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
  }
});
