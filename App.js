import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import Explore from './Myscreen/Explore';
import Trips from './Myscreen/Trips';
import Saved from './Myscreen/Saved';
import Inbox from './Myscreen/Inbox';

export class App extends React.Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Coupon 1</Text>
        <Text style={styles.paragraph}>Coupon 2</Text>
        <Text style={styles.paragraph}>Coupon 3</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Explore: {
    screen: Explore
  },
  Saved: {
    screen: Saved
  },
  Trips: {
    screen: Trips
  },
  Inbox: {
    screen: Inbox
  }
});

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
