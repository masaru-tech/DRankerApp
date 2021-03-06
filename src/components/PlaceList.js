import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ListView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar, ListItem } from 'react-native-elements';
import Colors from '../Colors';
import axios from 'axios';
const { height } = Dimensions.get('window');
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {observer} from 'mobx-react/native';
import { parse_link_header } from '../Util';
import { PLACES_URL } from '../Apis';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';

export default observer(class PlaceList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let places = []
    this.state = {
      places: places,
      search: false,
      dataSource: ds.cloneWithRows(places),
      canLoadMoreContent: false,
      pagetoken: null,
      lastPosition: null,
      searchTxt: '',
      loading: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    switch(event.id) {
      case 'close':
        this.props.navigator.dismissModal();
        break;
      case 'willAppear':
        this.searchPlace();
        break;
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lastPosition = position;
        // latitude:緯度
        // longitude:経度
        this.setState({lastPosition: lastPosition});
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
    );
  }

  _loadMoreContentAsync = async () => {
    this.setState({loading: true});
    axios.get(this.state.nextUrl,{
            headers: { Authorization: `Bearer ${this.props.store.token}` }
          })
        .then((response) => {
          let links = parse_link_header(response.headers.link);
          let newPlaces = response.data;
          this.setState({
            places: newPlaces,
            dataSource: this.state.dataSource.cloneWithRows(newPlaces),
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
    return (
      <TouchableHighlight underlayColor={Colors.select} onPress={() => {
        this.props.store.selectPlace(this.state.places[rowID]);
        this.props.navigator.dismissModal();
      }}>
        <View>
          <ListItem
            hideChevron={true}
            title={this.state.places[rowID].name} />
        </View>
      </TouchableHighlight>
    );
  }

  _renderNewPlace() {
    return (
      <TouchableHighlight underlayColor={Colors.select} onPress={() => {
        this.props.navigator.showModal({
          screen: "NewPlaceScreen",
          title: "新しい場所の追加",
          passProps: {
            store: this.props.store,
            placeName: this.state.searchTxt
          },
          navigatorStyle: {},
          animationType: 'slide-up'
        });
      }}>
        <View>
          <ListItem
            hideChevron={true}
            title='現在地を登録' />
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

  searchPlace() {
    const { searchTxt } = this.state;
    if (searchTxt == '') {
      this.setState({
        places: [],
        search: false,
        dataSource: this.state.dataSource.cloneWithRows([]),
        canLoadMoreContent: false,
        pagetoken: null
      })
    } else {
      this.setState({loading: true});
      axios.get(PLACES_URL, {
              params: {
                keyword: searchTxt
              },
              headers: { Authorization: `Bearer ${this.props.store.token}` }
            })
            .then((response) => {
              let links = parse_link_header(response.headers.link);
              let newPlaces = response.data;
              this.setState({
                places: newPlaces,
                search: true,
                dataSource: this.state.dataSource.cloneWithRows(newPlaces),
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
          onSubmitEditing={() => {this.searchPlace();}}
          returnKeyType='search'
          containerStyle={styles.searchBar}
          inputStyle={styles.searchInput}
          placeholder='お店名で検索' />
        <View style={{height: height - 110}}>
          {this.state.search && this.state.places.length == 0 ?
            this._renderNewPlace():
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
          }
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
