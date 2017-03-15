import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  TouchableWithoutFeedback,
  ListView,
  Dimensions,
  PixelRatio,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import Colors from '../Colors';
import Header from './Header';

const { width, height } = Dimensions.get('window');
const pixel = 1 / PixelRatio.get();

export default class Timeline extends Component {
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

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight underlayColor={Colors.select} onPress={() => {}}>
        <View style={{padding: 10}}>
          <Text>{rowData}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
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

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 20}} backgroundColor={Colors.main}>
          <StatusBar />
        </View>
        <Header />
        <ListView
          dataSource={this.state.data}
          renderRow={this._renderRow.bind(this)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeparator}
          enableEmptySections={true}
        />
        <TouchableWithoutFeedback onPress={Actions.checkIn}>
          <View style={styles.btnContent}>
            <Icon name="md-create" size={25} color={Colors.main} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContent: {
    position: 'absolute',
    top: height - 60,
    left: width/2 - 25,
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
