import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Header from './Header';
const { height } = Dimensions.get('window');

import Colors from '../Colors';

export default class CheckIn extends Component {
  render() {
    return(
      <View style={{backgroundColor: '#EEEEEE', height: height}}>
        <View style={styles.statusBar} backgroundColor={Colors.main}>
          <StatusBar />
        </View>
        <Header />
        <List>
          <ListItem
            key='map'
            title="場所を選択"
            hideChevron={true}
            leftIcon={{name: 'md-pin', type: 'ionicon'}}
          />
        </List>
        <List>
          <ListItem
            key='sake'
            title="お酒を追加"
            hideChevron={true}
            leftIcon={{name: 'md-add-circle', type: 'ionicon'}}
            onPress={Actions.sake}
          />
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 20
  }
});
