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
import { SearchBar } from 'react-native-elements';
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
        <SearchBar
          onChangeText={() => {}}
          containerStyle={styles.searchBar}
          inputStyle={styles.searchInput}
          placeholder='お酒名/よみがなで検索' />
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
  searchBar: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: MAIN_COLOR
  },
  searchInput: {
    backgroundColor: '#fff',
  }
});
