import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

class Explore extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Explore Tab</Text>
      </View>
    );
  }
}

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', //X-axis
    justifyContent: 'center', //X-axis
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#C2185B'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  }
});
