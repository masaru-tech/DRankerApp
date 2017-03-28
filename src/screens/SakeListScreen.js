import React, { Component } from 'react';
import SakeList from '../components/SakeList';
import Colors from '../Colors';
import { iconsMap, iconsLoaded } from '../AppIcons';

export default class SakeListScreen extends Component {
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
      <SakeList {...this.props} />
    );
  }
}
