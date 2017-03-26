import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

const { height } = Dimensions.get('window');

export default class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id == 'close') {
      this.props.navigator.dismissModal();
    }
  }

  render() {
    return(
      <View style={{backgroundColor: '#EEEEEE', height: height}}>
        <List>
          <ListItem
            key='map'
            title="場所を選択"
            hideChevron={true}
            leftIcon={{name: 'md-pin', type: 'ionicon'}}
          />
        </List>
        <List>
          <ListItem
            key='sake'
            title="お酒を追加"
            hideChevron={true}
            leftIcon={{name: 'md-add-circle', type: 'ionicon'}}
            onPress={() => {
              this.props.navigator.showModal({
              screen: 'SakeListScreen',
              title: "お酒を検索",
              passProps: {},
              navigatorStyle: {},
              animationType: 'slide-up'
              });
            }}
          />
        </List>
      </View>
    )
  }
}
