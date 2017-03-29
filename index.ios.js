/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import mobx from 'mobx';
mobx.useStrict(true);

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import Colors from './src/Colors';
import { iconsMap, iconsLoaded } from './src/AppIcons';
import {registerScreens} from './src/screens';
registerScreens();

import * as Keychain from 'react-native-keychain';

import AppStore from './src/AppStore';

Keychain.getInternetCredentials('dranker')
        .then((credentials) => {
          if (credentials) {
            const store = new AppStore({token: credentials.password});

            iconsLoaded.then(() => {
              Navigation.startSingleScreenApp({
                screen: {
                  screen: 'TimelineScreen',
                  titleImage: iconsMap['md-beer'],
                  navigatorStyle: {
                    navBarNoBorder: true
                  }
                },
                passProps: {
                  store: store
                }
              });
            });
          } else {
            const store = new Store({});

            Navigation.startSingleScreenApp({
              screen: {
                screen: 'RegisterScreen',
                navigatorStyle: {
                  navBarHidden: true
                }
              },
              passProps: {
                store: store
              }
            });
          }
        });
