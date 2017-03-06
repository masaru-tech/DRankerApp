/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Router, Scene, Actions, Modal, Reducer } from 'react-native-router-flux';

import SakeList from './src/components/SakeList';
import Register from './src/components/Register';
import Colors from './src/Colors';

const reducerCreate = params=>{
  const defaultReducer = Reducer(params);
  return (state, action)=>{
    // console.log("ACTION:", action);
    return defaultReducer(state, action);
  }
};

class App extends Component {
  render() {
    return (
      <Router createReducer={reducerCreate}>
        <Scene key="modal" component={Modal} >
          <Scene key="root">
            <Scene key="main">
              <Scene key="timeline" navigationBarStyle={{backgroundColor: Colors.main, borderBottomWidth: 0}} initial={true} hideNavBar={true} component={Register} title={<Icon name="md-beer" size={27} color='#fff'/>}/>
            </Scene>
            <Scene key="sakeList" direction="vertical" hideNavBar={true} schema="modal" component={SakeList} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('DRankerApp', () => App);
