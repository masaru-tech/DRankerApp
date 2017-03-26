import React, { Component } from 'react';
import Timeline from '../components/Timeline';
import Colors from '../Colors';

export default class TimelineScreen extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: Colors.main
  }

  render() {
    return (
      <Timeline {...this.props} />
    );
  }
}
