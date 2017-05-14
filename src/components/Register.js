import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Animated,
  Easing,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../Colors';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { iconsMap, iconsLoaded } from '../AppIcons';
import { USERS_URL } from '../Apis';

const { width, height } = Dimensions.get('window');

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      scale: new Animated.Value(1),
      btnWidth: new Animated.Value(250),
      on: 0,
      scaleOn: 0
    };
  }

  register() {
    axios.post(USERS_URL, {
            display_name: this.state.displayName
          })
          .then((response) => {
            const jwt = response.data.jwt;
            Keychain.setInternetCredentials('dranker', 'dranker', jwt)
                    .then(() => {
                      console.log('Credentials saved successfully!');
                      this._loginAnimation();
                      iconsLoaded.then(() => {
                        setTimeout(() => {
                          this.props.navigator.push({
                            screen: 'TimelineScreen',
                            animated: false,
                            titleImage: iconsMap['md-beer'],
                            navigatorStyle: {
                              navBarNoBorder: true
                            },
                            backButtonHidden: true
                          });
                        }, 1100);
                      });
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
    Animated.sequence([
      Animated.timing(
        this.state.btnWidth,
        {
          toValue: 50,
          duration: 300,
          easing: Easing.elastic(1),
        },
      ),
      Animated.delay(200),
    ]).start(() => {
      this.setState({
        on: 2
      });
    });
    Animated.sequence([
      Animated.delay(600),
      Animated.timing(
        this.state.scale,
        {toValue: 20,
          duration: 500,
          easing: Easing.elastic(1),
        },
      )
    ]).start(() => {
      this.setState({
        scaleOn: 1
      });
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.scaleOn ?
          <View style={styles.scaleContainer}>
          </View>:
          <View style={styles.register}>
            <TextInput
              style={styles.displayName}
              onChangeText={(text) => this.setState({displayName: text})}
              value={this.state.displayName}
              placeholder="表示名を入力(後で変更可能)"
            />
            <TouchableWithoutFeedback onPress={() => {this.register();}}>
              <Animated.View style={[styles.btnContent,{width: this.state.btnWidth}]}>
                {this.state.on ? (this.state.on == 1 ? <ActivityIndicator animating={true} /> : null ) : <Text>開始する</Text> }
              </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.scaleBackground,{transform:[{scale:this.state.scale}]}]}>
            </Animated.View>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scaleBackground:{
    position: 'absolute',
    top: 300,
    left: width / 2 - 25,
    width: 48,
    height: 48,
    borderRadius: 25,
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
  btnContent:{
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
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
