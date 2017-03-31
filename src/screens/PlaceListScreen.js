import React, { Component } from 'react';
import PlaceList from '../components/PlaceList';
import Colors from '../Colors';
import { iconsMap, iconsLoaded } from '../AppIcons';

export default class PlaceListScreen extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: Colors.main,
    navBarButtonColor: '#fff',
    navBarTextColor: '#fff',
    navBarNoBorder: true
  }

  componentDidMount() {
    iconsLoaded.then(() => {
      this.props.navigator.setButtons({
        leftButtons: [{
          icon: iconsMap['ios-close'],
          id: 'close'
        }]
      });
    });
  }

  render() {
    return (
      <PlaceList {...this.props} />
    );
  }
}
