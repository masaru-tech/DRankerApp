import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {observer} from 'mobx-react/native';

const { height } = Dimensions.get('window');

export default observer(class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id == 'close') {
      this.props.navigator.dismissModal();
    }
  }

  componentWillMount() {
    this.props.store.clearSelectSakes();
  }

  render() {
    let selectSakes = this.props.store.selectSakes.map((sake) => {
      return <ListItem key={sake.id} title={sake.name} hideChevron={true} />
    });

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
          {selectSakes}
          <ListItem
            key='sake'
            title="お酒を追加"
            hideChevron={true}
            leftIcon={{name: 'md-add-circle', type: 'ionicon'}}
            onPress={() => {
              this.props.navigator.showModal({
              screen: 'SakeListScreen',
              title: "お酒を検索",
              passProps: {
                store: this.props.store
              },
              navigatorStyle: {},
              animationType: 'slide-up'
              });
            }}
          />
        </List>
      </View>
    )
  }
})
