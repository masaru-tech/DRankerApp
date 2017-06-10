import React, { Component } from 'react';
import Activity from '../components/Activity';
import Colors from '../Colors';

export default class ActivityScreen extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: Colors.main
  }

  render() {
    return (
      <Activity {...this.props} />
    );
  }
}
