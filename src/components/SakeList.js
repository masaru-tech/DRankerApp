import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ListView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar, ListItem } from 'react-native-elements';
import Colors from '../Colors';
import axios from 'axios';
const { height } = Dimensions.get('window');
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { parse_link_header } from '../Util';
import {observer} from 'mobx-react/native';
import { SAKES_URL } from '../Apis';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';

export default observer(class SakeList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let sakes = []
    this.state = {
      sakes: sakes,
      dataSource: ds.cloneWithRows(sakes),
      canLoadMoreContent: false,
      nextUrl: null,
      searchTxt: '',
      loading: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id == 'close') {
      this.props.navigator.dismissModal();
    }
  }

  _loadMoreContentAsync = async () => {
    this.setState({loading: true});
    axios.get(this.state.nextUrl,{
            headers: { Authorization: `Bearer ${this.props.store.token}` }
          })
        .then((response) => {
          let links = parse_link_header(response.headers.link);
          let newSakes = this.state.sakes.concat(response.data);
          this.setState({
            sakes: newSakes,
            dataSource: this.state.dataSource.cloneWithRows(newSakes),
            canLoadMoreContent: links.next != null,
            nextUrl: links.next,
            loading: false
          })
        })
        .catch((error) => {
          console.log(error);
        });
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    const sake = this.state.sakes[rowID];
    return (
      <TouchableHighlight underlayColor={Colors.select} onPress={() => {
        this.props.store.pushSelectSake(sake);
        this.props.navigator.dismissModal();
      }}>
        <View>
          <ListItem
            hideChevron={true}
            title={sake.name}
            subtitle={sake.yomi}
          />
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

  searchSake() {
    const { searchTxt } = this.state;
    if (searchTxt == '') {
      this.setState({
        akes: [],
        dataSource: this.state.dataSource.cloneWithRows([]),
        canLoadMoreContent: false,
        nextUrl: null
      })
    } else {
      this.setState({loading: true});
      axios.get(SAKES_URL, {
              params: {
                keyword: searchTxt
              },
              headers: { Authorization: `Bearer ${this.props.store.token}` }
            })
            .then((response) => {
              let links = parse_link_header(response.headers.link);
              let newSakes = response.data;
              this.setState({
                sakes: newSakes,
                dataSource: this.state.dataSource.cloneWithRows(newSakes),
                canLoadMoreContent: links.next != null,
                nextUrl: links.next,
                loading: false
              })
            })
            .catch((error) => {
              console.log(error);
            });
    }
  }

  render() {
    return (
      <View>
        <SearchBar
          onChangeText={(text) => {this.setState({searchTxt: text});}}
          onSubmitEditing={() => {this.searchSake();}}
          containerStyle={styles.searchBar}
          inputStyle={styles.searchInput}
          placeholder='お酒名/よみがなで検索' />
        <View style={{height: height - 110}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderScrollComponent={props => <InfiniteScrollView {...props} />}
            renderSeparator={this._renderSeparator}
            enableEmptySections={true}
            canLoadMore={this.state.canLoadMoreContent}
            distanceToLoadMore={50}
            onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
          />
        </View>
        <SleekLoadingIndicator loading={this.state.loading} />
      </View>
    );
  }
})

const styles = StyleSheet.create({
  searchBar: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: Colors.main
  },
  searchInput: {
    backgroundColor: '#fff',
  }
});
