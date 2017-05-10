import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { Container, Content, Form, Item, Input, InputGroup, Label} from 'native-base';
import { Button, normalize, colors } from 'react-native-elements';
import Colors from '../Colors';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

export default class NewPlace extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      placeName: props.placeName,
      lastPosition: null,
      submitBtnDisabled: false
    }
  }

  onNavigatorEvent(event) {
    if (event.id == 'close') {
      this.props.navigator.dismissModal();
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

  render() {
    return(
      <Container>
        <Content>
          <InputGroup style={{marginBottom: 20}}>
            <Text style={styles.label}>お店名</Text>
            <Input
              value={this.state.placeName}
              onChangeText={(text) => {this.setState({placeName: text, submitBtnDisabled: false});}}
            />
          </InputGroup>
        </Content>

        <Button
          buttonStyle={styles.submitBtn}
          fontWeight='bold'
          fontSize={20}
          disabled={this.state.submitBtnDisabled}
          disabledStyle={{backgroundColor: '#C0C0C0'}}
          onPress={() => {
            axios.post('http://192.168.56.111:3000/api/places', {
                name: this.state.placeName,
                lat: this.state.lastPosition.coords.latitude,
                lng: this.state.lastPosition.coords.longitude
              },{
                headers: { Authorization: `Bearer ${this.props.store.token}` }
              })
              .then((response) => {
                this.props.navigator.dismissModal();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          title='登録する'
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    color: colors.grey3,
    fontSize: normalize(12),
  },
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
