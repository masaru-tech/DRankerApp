import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ListView,
  Dimensions,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar, ListItem } from 'react-native-elements';
import Header from './Header';
import { MAIN_COLOR } from '../Common';
import axios from 'axios';
const { height } = Dimensions.get('window');

StatusBar.setBarStyle('light-content', true);

export default class SakeList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let sakes = []
    this.state = {
      sakes: sakes,
      dataSource: ds.cloneWithRows(sakes)
    };
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight onPress={() => {}}>
        <View>
          <ListItem
            title={this.state.sakes[rowID].name} />
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

  searchSake(searchTxt) {
    self = this;
    axios.get('http://192.168.56.111:3000/api/sakes', {
          params: {
            keyword: searchTxt
          }
        })
        .then(function (response) {
          let newSakes = response.data;
          self.setState({
            sakes: newSakes,
            dataSource: self.state.dataSource.cloneWithRows(newSakes)
          })
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    return (
      <View>
        <View style={styles.statusBar} backgroundColor={MAIN_COLOR}>
          <StatusBar />
        </View>
        <Header />
        <SearchBar
          onChangeText={this.searchSake.bind(this)}
          containerStyle={styles.searchBar}
          inputStyle={styles.searchInput}
          placeholder='お酒名/よみがなで検索' />
        <View style={{height: height - 110}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            renderSeparator={this._renderSeparator}
            enableEmptySections={true}
          />
        </View>
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
