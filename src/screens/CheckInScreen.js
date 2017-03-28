import React, { Component } from 'react';
import CheckIn from '../components/CheckIn';
import Colors from '../Colors';
import { iconsMap, iconsLoaded } from '../AppIcons';

export default class CheckInScreen extends Component {
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
      <CheckIn {...this.props} />
    );
  }
}
