import {Navigation} from 'react-native-navigation';
import {StatusBar} from 'react-native';
StatusBar.setBarStyle('light-content', true);

import RegisterScreen from './RegisterScreen';
import TimelineScreen from './TimelineScreen';
import CheckInScreen from './CheckInScreen';
import SakeListScreen from './SakeListScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('RegisterScreen', () => RegisterScreen);
  Navigation.registerComponent('TimelineScreen', () => TimelineScreen);
  Navigation.registerComponent('CheckInScreen', () => CheckInScreen);
  Navigation.registerComponent('SakeListScreen', () => SakeListScreen);
}
