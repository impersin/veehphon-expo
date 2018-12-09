import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Button
} from 'react-native';
import axios from 'axios';
import { Constants, Location, Permissions } from 'expo';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { NODE_ENV } from 'react-native-dotenv';
import Home from './screens/BusinessListScreen';
import BusinessProfileScreen from './screens/BusinessProfileScreen';
import Temp from './tabs/temp';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    auth: true
  };
  render() {
    return (
      // <Provider store={store}>
      <View style={styles.container}>
        <AppBottomTabNavigator screenProps={this.state} />
      </View>
      // </Provider>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Homescreen: {
    screen: Home
  },
  BusinessProfile: {
    screen: BusinessProfileScreen
  }
});

AppStackNavigator.navigationOptions = ({ navigation }) => {
  if (navigation.state.index === 1) {
    return {
      tabBarVisible: false
    };
  }
  return {
    tabBarVisible: true
  };
};

const AppBottomTabNavigator = createBottomTabNavigator({
  Home: AppStackNavigator,
  placeHolder: { screen: Temp }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  },
  listContainer: { width: width, height: height / 3, marginTop: 20 },
  imgStyle: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover'
  },
  businessTitle: { fontSize: 24 },
  circles: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
