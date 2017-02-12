/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  Dimensions,
  PixelRatio,
  ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};
const pixel = 1 / PixelRatio.get();

class AppBar extends Component{
  render() {
    return (
      <View style={styles.appBar}>
        <View style={styles.navLeft}>
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

class MovieListView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: ds.cloneWithRows(this._genRows())
    };
  }

  _genRows() {
    let dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      dataBlob.push('Row ' + ii);
    }
    return dataBlob;
  }

  render() {
    return (
      <ListView
        dataSource={this.state.data}
        renderRow={this._renderRow.bind(this)}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        renderSeparator={this._renderSeparator}
        enableEmptySections={true}
      />
    );
  }

  _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <TouchableHighlight onPress={() => {}}>
        <View style={{padding: 10}}>
          <Text>{rowData}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }
}

export default class DRankerApp extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.statusBar} backgroundColor={MAIN_COLOR}>
          <StatusBar barStyle="light-content" />
        </View>
        <AppBar />
        <MovieListView />
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.btnContent}>
            <Icon name="md-create" size={25} color={MAIN_COLOR}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const MAIN_COLOR = '#FFBF02';

const styles = StyleSheet.create({
  statusBar: {
    height: 20
  },
  appBar: {
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
  },
  btnContent: {
    position: 'absolute',
    top: size.height - 60,
    left: size.width/2 - 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  }
});

AppRegistry.registerComponent('DRankerApp', () => DRankerApp);
