import React, { Component } from 'react';
import Register from '../components/Register';
import Colors from '../Colors';
import { iconsMap, iconsLoaded } from '../AppIcons';

export default class RegisterScreen extends Component {
  render() {
    return (
      <Register {...this.props} />
    );
  }
}
