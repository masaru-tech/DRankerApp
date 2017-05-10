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
      searchTxt: ''
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.watchID = null;
  }

  onNavigatorEvent(event) {
    if (event.id == 'close') {
      this.props.navigator.dismissModal();
    }
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = position;
        // latitude:緯度
        // longitude:経度
        this.setState({lastPosition: lastPosition});
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _loadMoreContentAsync = async () => {
    self = this;
    axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
              pagetoken: this.state.pagetoken,
              key: 'development key'
            }
          })
          .then((response) => {
            let newPlaces = response.data.results.map((place) => {return {name: place.name, place_id: place.place_id}});
            newPlaces = self.state.places.concat(newPlaces);
            let next_page_token = response.data.next_page_token;
            self.setState({
              places: newPlaces,
              dataSource: self.state.dataSource.cloneWithRows(newPlaces),
              canLoadMoreContent: next_page_token != null,
              pagetoken: next_page_token
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
    const self = this;
    if (searchTxt == '') {
      this.setState({
        places: [],
        search: false,
        dataSource: self.state.dataSource.cloneWithRows([]),
        canLoadMoreContent: false,
        pagetoken: null
      })
    } else {
      axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
              params: {
                location: `${this.state.lastPosition.coords.latitude},${this.state.lastPosition.coords.longitude}`,
                radius: 1000,
                language: 'ja',
                types: 'food|liquor_store|grocery_or_supermarket',
                query: searchTxt,
                key: 'development key'
              }
            })
            .then((response) => {
              let newPlaces = response.data.results.map((place) => {return {name: place.name, place_id: place.place_id}});
              let next_page_token = response.data.next_page_token;
              self.setState({
                places: newPlaces,
                search: true,
                dataSource: self.state.dataSource.cloneWithRows(newPlaces),
                canLoadMoreContent: next_page_token != null,
                pagetoken: next_page_token
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
