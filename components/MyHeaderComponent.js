import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';

export default class MyHeaderComponent extends React.Component {
  componentWillMount() {}

  componentDidMount() {}

  render() {
    return <Text>working.........</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
