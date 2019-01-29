import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Constants } from 'expo';
import Home from './components/Home';

import { Provider } from 'react-redux';
import configureStore from './redux/store';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Home />
        </View>
      </Provider>
    );
  }
}
