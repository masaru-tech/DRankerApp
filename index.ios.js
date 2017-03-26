/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import Colors from './src/Colors';
import { iconsMap, iconsLoaded } from './src/AppIcons';
import {registerScreens} from './src/screens';
registerScreens();

iconsLoaded.then(() => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TimelineScreen',
      titleImage: iconsMap['md-beer'],
      navigatorStyle: {
        navBarNoBorder: true
      },
      navigatorButtons: {}
    },
    passProps: {}
  });
});
