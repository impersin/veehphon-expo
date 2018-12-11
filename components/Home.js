import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Button, Text, View, Dimensions } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, AntDesign } from '@expo/vector-icons/';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import BusinessListScreen from '../screens/BusinessListScreen';
import BusinessProfileScreen from '../screens/BusinessProfileScreen';
import Signup from '../screens/signup';
import Login from '../tabs/login';

const { height, width } = Dimensions.get('window');

class Home extends React.Component {
  // static navigationOptions = {
  //   header: null
  // };
  state = {
    auth: false
  };

  _login() {
    this.setState({
      auth: true
    });
  }

  _logout() {
    this.setState({
      auth: false
    });
  }

  render() {
    let tabNav;
    if (this.state.auth) {
      console.log('=========================>', this.state);
      tabNav = <AppBottomTabNavigatorLoggedin screenProps={this.state} />;
    } else {
      tabNav = <AppBottomTabNavigator screenProps={this.state} />;
    }
    return (
      <View style={styles.container}>
        {/* <View style={styles.topMenu}>
          <Text>Top menu</Text>
        </View> */}
        {/* <Button
          title="login"
          onPress={e => {
            this._login();
          }}
        />
        <Button
          title="logout"
          onPress={e => {
            this._logout();
          }}
        /> */}
        <View style={styles.main}>{tabNav}</View>
      </View>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const AppStackNavigator = createStackNavigator({
  BusinessList: {
    screen: BusinessListScreen,
    navigationOptions: {
      title: 'Home',
      header: null //this will hide the header
    }
  },
  BusinessProfile: {
    screen: BusinessProfileScreen,
    navigationOptions:
      Platform.OS === 'ios'
        ? { title: 'Profile', header: null }
        : { title: 'Profile', header: null }
  }
});

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:
      Platform.OS === 'ios'
        ? { title: 'Profile', header: null }
        : { title: 'Profile', header: null }
  },
  Signup: {
    screen: Signup,
    navigationOptions:
      Platform.OS === 'ios'
        ? { title: 'Profile', header: null }
        : { title: 'Profile', header: null }
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
  Home: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon: () => <Ionicons name="ios-search" size={20} />
    }
  },
  Login: {
    screen: LoginStackNavigator,
    navigationOptions: {
      tabBarLabel: 'LOG IN',
      tabBarIcon: () => <AntDesign name="user" size={20} />
    }
  }
});

const AppBottomTabNavigatorLoggedin = createBottomTabNavigator({
  Home: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon: () => <Ionicons name="ios-search" size={20} />
    }
  },
  Login: {
    screen: LoginStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: () => <AntDesign name="user" size={20} />
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  topMenu: { flex: 1, backgroundColor: 'yellow' },
  main: {
    flex: 11
  }
});
