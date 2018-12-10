import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Constants } from 'expo';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Home from './components/Home';

import { Provider } from 'react-redux';
import configureStore from './redux/store';

const initialState = {
  auth: 'false'
};
const store = configureStore(initialState);
const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
