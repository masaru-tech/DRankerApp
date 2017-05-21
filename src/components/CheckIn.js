import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import {observer} from 'mobx-react/native';
import Colors from '../Colors';
import DeletableItem from './DeletableItem';
import axios from 'axios';
import { CHECKINS_ADD_URL } from '../Apis';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';

const { height, width } = Dimensions.get('window');

export default observer(class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id == 'close') {
      this.props.navigator.dismissModal();
    }
  }

  componentWillMount() {
    this.props.store.initCheckIn();
  }

  render() {
    const selectSakes = this.props.store.selectSakes.map((sake) => {
      return <DeletableItem key={sake.id} title={sake.name} onPress={() => {this.props.store.removeSelectSakeItem(sake);}} />
    });
    const selectedPlace = this.props.store.selectedPlace;

    return(
      <View>
        <View style={{backgroundColor: '#EEEEEE', height: height - 19 - 45}}>
          <List>
            {selectedPlace.length != 0 ? 
            <DeletableItem key={selectedPlace[0].place_id} title={selectedPlace[0].name} onPress={() => {this.props.store.clearPlace();}} />:
            <ListItem
              key='map'
              title="場所を選択"
              hideChevron={true}
              leftIcon={{name: 'md-pin', type: 'ionicon'}}
              onPress={() => {
                this.props.navigator.showModal({
                screen: 'PlaceListScreen',
                title: "お店を検索",
                passProps: {
                  store: this.props.store
                },
                navigatorStyle: {},
                animationType: 'slide-up'
                });
              }}
            />
            }
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

        <Button
          buttonStyle={styles.submitBtn}
          fontWeight='bold'
          fontSize={20}
          disabled={this.props.store.submitBtnDisabled}
          disabledStyle={{backgroundColor: '#C0C0C0'}}
          onPress={() => {
            this.setState({loading: true});
            const place_id = this.props.store.selectedPlace.length != 0 ? this.props.store.selectedPlace[0].id : null;
            const sakes = this.props.store.selectSakes.map((sake)=>{ return sake.id });

            axios.post(CHECKINS_ADD_URL, {
                checkin: {
                  place_id: place_id,
                  alcohols: sakes
                }
              },{
                headers: { Authorization: `Bearer ${this.props.store.token}` }
              })
              .then((response) => {
                this.setState({loading: false});
                this.props.navigator.dismissModal();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          title='登録する'
        />
        <SleekLoadingIndicator loading={this.state.loading} />
      </View>
    )
  }
})

const styles = StyleSheet.create({
  submitBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    backgroundColor: Colors.main,
    marginLeft: 0,
    marginRight: 0
  }
});