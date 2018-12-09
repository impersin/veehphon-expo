import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { createStackNavigator } from 'react-navigation';

export default class BusinessProfileScreen extends React.Component {
  componentWillMount() {
    // console.log(this.props.navigation);
  }

  render() {
    // console.log(this.props.navigation.state.params.data);
    return (
      <View style={styles.container}>
        <Text>Businesse profile screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  }
});
