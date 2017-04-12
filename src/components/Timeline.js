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
import Colors from '../Colors';
import axios from 'axios';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { parse_link_header } from '../Util';
import TimelineItem from './TimelineItem';

const { width, height } = Dimensions.get('window');
const pixel = 1 / PixelRatio.get();

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let checkins = [];
    this.state = {
      checkins: checkins,
      dataSource: ds.cloneWithRows(checkins),
      canLoadMoreContent: false,
      nextUrl: null
    };
  }

  componentDidMount() {
    const self = this;
    axios.get('http://192.168.56.111:3000/api/checkins', {
            headers: { Authorization: `Bearer ${this.props.store.token}` }
          })
          .then((response) => {
            let links = null;
            let nextUrl = null;
            if (response.headers.link) {
              links = parse_link_header(response.headers.link);
              nextUrl = links.next;
            }
            let newCheckins = response.data;
            self.setState({
              checkins: newCheckins,
              dataSource: self.state.dataSource.cloneWithRows(newCheckins),
              canLoadMoreContent: links != null && links.next != null,
              nextUrl: nextUrl
            })
          })
          .catch((error) => {
            console.log(error);
          });
  }

  _loadMoreContentAsync = async () => {
    const self = this;
    axios.get(this.state.nextUrl, {
            headers: { Authorization: `Bearer ${this.props.store.token}` }
          })
          .then((response) => {
            let links = parse_link_header(response.headers.link);
            let newCheckins = self.state.checkins.concat(response.data);
            self.setState({
              checkins: newCheckins,
              dataSource: self.state.dataSource.cloneWithRows(newCheckins),
              canLoadMoreContent: links.next != null,
              nextUrl: links.next
            })
          })
          .catch((error) => {
            console.log(error);
          });
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    const checkin = this.state.checkins[rowID];
    return (
      <View>
        <TimelineItem
          username={checkin.username}
          account_no="@masaruTech"
          posted_at="2017/04/12"
          place_name="お店名"
          alcohols={checkin.alcohols}
          thumbnail={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        />
      </View>
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
        <TouchableWithoutFeedback onPress={() => {
          this.props.navigator.showModal({
            screen: "CheckInScreen",
            title: "登録",
            passProps: {
              store: this.props.store
            },
            navigatorStyle: {},
            animationType: 'slide-up'
          });
        }}>
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
    top: height - 64 - 60, // 64=ステータスバー(20) + ナビゲージョンバー(44)
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
