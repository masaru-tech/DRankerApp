import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Animated,
  Easing,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Colors from '../Colors';
import axios from 'axios';
import Timeline from './Timeline';
import * as Keychain from 'react-native-keychain';
const { width, height } = Dimensions.get('window');

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      scale: new Animated.Value(1),
      on: 1,
      scaleOn: 0,
      token: null
    };
    this.register = this.register.bind(this);

    Keychain.getInternetCredentials('dranker')
            .then((credentials) => {
              if (credentials) {
                this.setState({token: credentials.password});
              }
            });
  }

  register() {
    axios.post('http://192.168.56.111:3000/api/users', {
            display_name: this.state.displayName
          })
          .then((response) => {
            const jwt = response.data.jwt;
            Keychain.setInternetCredentials('dranker', 'dranker', jwt)
                    .then(() => {
                      console.log('Credentials saved successfully!');
                      this._loginAnimation();
                    });
          })
          .catch((error) => {
            console.log(error);
          });
  }

  _loginAnimation() {
    this.setState({
      on: 1,
    });
    Animated.timing(
       this.state.scale,
       {toValue: 20,
        duration: 500,
        easing: Easing.elastic(1),
      },
    ).start(() => {
      this.setState({
        scaleOn: 1,
      });
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.scaleOn || this.state.token != null ?
          <View style={styles.scaleContainer}>
            <Timeline />
          </View>:
          <View style={styles.register}>
            <TextInput
              style={styles.displayName}
              onChangeText={(text) => this.setState({displayName: text})}
              value={this.state.displayName}
              placeholder="表示名を入力(後で変更可能)"
            />
            <TouchableWithoutFeedback onPress={this.register}>
              <Animated.View style={[styles.btnContent,{transform:[{scale:this.state.scale}]}]}>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContent:{
    position: "absolute",
    top: 320,
    left: width / 2 - 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  scaleContainer:{
    position: "absolute",
    height: height,
    width: width,
    top: 0,
    left: 0,
  },
  register: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  displayName: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: Colors.main,
    borderWidth: 1,
    borderRadius: 20,
    margin: 20,
    paddingLeft: 15
  }
});
