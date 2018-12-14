import React from 'react';
import { connect } from 'react-redux';
import { Platform, ActivityIndicator, StyleSheet, View } from 'react-native';
import { NODE_ENV } from 'react-native-dotenv';
import { Constants, SecureStore, Location, Permissions } from 'expo';
import { Ionicons, AntDesign } from '@expo/vector-icons/';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import axios from 'axios';
import BusinessListScreen from '../screens/BusinessListScreen';
import BusinessProfileScreen from '../screens/BusinessProfileScreen';
import Signup from '../screens/signup';
import Logout from '../screens/Logout';
import Login from '../tabs/login';

class Home extends React.Component {
  state = {
    isLoading: true,
    initialData: [],
    address: null,
    location: null,
    errorMessage: null
  };

  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  async componentDidMount() {
    this._checkAuthentication();
  }

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

  _checkAuthentication = async () => {
    const token = await SecureStore.getItemAsync('token');
    const email = await SecureStore.getItemAsync('email');

    if (token && email) {
      axios({
        method: 'post',
        url: 'http://10.0.0.166:3000/api/auth',
        data: {
          email,
          token
        }
      })
        .then(res => {
          return this._initializeData(true);
        })
        .then(res => {
          console.log(res);
        });
    } else {
      return this._initializeData(false);
    }
  };

  _initializeData(auth) {
    const url =
      NODE_ENV === 'localhost'
        ? 'http://10.0.0.166:3000/api/businesses'
        : 'https://veeh-coupon.herokuapp.com/api/businesses';
    // console.log(url);
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        if (auth) {
          setTimeout(() => {
            this.setState(
              {
                isLoading: false,
                initialData: res.data
              },
              () => {
                this.props.updateAuth(true);
              }
            );
          }, 1500);
        } else {
          setTimeout(() => {
            this.setState(
              {
                isLoading: false,
                initialData: res.data
              },
              () => {
                this.props.updateAuth(false);
              }
            );
          }, 1500);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      maximumAge: 1000
    });
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
    this.setState({ location, address });
  };

  render() {
    let tabNav, text;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    console.log('========== home props ============>', this.state);
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.ActivityIndicatorContainer]}>
          <ActivityIndicator size="large" color="#f96a00" />
        </View>
      );
    }
    if (this.props.auth) {
      tabNav = <AppBottomTabNavigatorLoggedin screenProps={this.state} />;
    } else {
      tabNav = <AppBottomTabNavigator screenProps={this.state} />;
    }
    return (
      <View style={styles.container}>
        {/* <View style={styles.topMenu}>
          <Text>Top menu</Text>
        </View> */}
        <View style={styles.main}>{tabNav}</View>
      </View>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: status => {
      dispatch({ type: 'AUTH', payload: status });
    }
  };
};

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
    navigationOptions: { title: 'Profile', header: null }
    // Platform.OS === 'ios'
    //   ? { title: 'Profile', header: null }
    //   : { title: 'Profile', header: null }
  },
  Signup: {
    screen: Signup,
    navigationOptions: { title: 'Profile', header: null }
    // Platform.OS === 'ios'
    //   ? { title: 'Profile', header: null }
    //   : { title: 'Profile', header: null }
  }
});

const ProfileStackNavigator = createStackNavigator({
  Logout: {
    screen: Logout,
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

const AppBottomTabNavigator = createBottomTabNavigator(
  {
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
  },
  {
    tabBarOptions: {
      activeTintColor: '#f96a00',
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: 'white',
        paddingTop: 10
      }
    }
  }
);

const AppBottomTabNavigatorLoggedin = createBottomTabNavigator(
  {
    Home: {
      screen: AppStackNavigator,
      navigationOptions: {
        tabBarLabel: 'EXPLORE',
        tabBarIcon: () => <Ionicons name="ios-search" size={20} />
      }
    },
    Login: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarLabel: 'MY PAGE',
        tabBarIcon: () => <AntDesign name="user" size={20} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#f96a00',
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: 'white'
      }
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white'
  },
  ActivityIndicatorContainer: { alignItems: 'center', justifyContent: 'center' },
  topMenu: { flex: 1, backgroundColor: 'yellow' },
  main: {
    flex: 11
  }
});
