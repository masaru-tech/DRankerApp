import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ListView,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import { MAIN_COLOR } from '../Common';

StatusBar.setBarStyle('light-content', true);

export default class SakeList extends Component {
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
      <TouchableHighlight onPress={() => {}}>
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
      <View>
        <View style={styles.statusBar} backgroundColor={MAIN_COLOR}>
          <StatusBar />
        </View>
        <Header />
        <View>
          <TextInput style={styles.searchField} placeholder="お酒名/よみがなを入力" />
        </View>
        <ListView
          dataSource={this.state.data}
          renderRow={this._renderRow.bind(this)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeparator}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 20
  },
  searchField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingLeft: 10
  }
});
