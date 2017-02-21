import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { MAIN_COLOR } from '../Common';

export default class Header extends Component{
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.navLeft}>
          <Icon name="ios-close" size={40} color='#fff' style={{width:30, paddingLeft: 10}} onPress={Actions.pop}></Icon>
        </View>
        <View style={styles.navMid}>
          <Icon name="md-beer" size={27} color='#fff'></Icon>
        </View>
        <View style={styles.navRight}>
          <Icon name="ios-search" size={23} color='#fff' style={{width:30}}></Icon>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: MAIN_COLOR,
    height: 44,
    flexDirection: "row",
  },
  navLeft:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  navMid:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  navRight:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row"
  }
});
