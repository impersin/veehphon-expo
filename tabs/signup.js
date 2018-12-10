import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';

export default class temp extends React.Component {
  state = {
    data: [],
    isLoading: true
  };

  componentWillMount() {}

  componentDidMount() {}

  render() {
    console.log('Signup Tapnav props', this.props);
    return (
      <View style={styles.container}>
        <Text>Sign</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight
  }
});
