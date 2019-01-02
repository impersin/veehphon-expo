import React from 'react';
import { connect } from 'react-redux';
import { Platform, ActivityIndicator, StyleSheet, View } from 'react-native';
import { NODE_ENV, URL } from 'react-native-dotenv';
import { Constants, SecureStore, Location, Permissions } from 'expo';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons/';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import axios from 'axios';
import BusinessListScreen from '../screens/BusinessListScreen';
import BusinessProfileScreen from '../screens/BusinessProfileScreen';
import SponsoredBusinessProfileScreen from '../screens/SponsoredBusinessProfileScreen';
import CouponCarousel from '../screens/CouponCarousel';
import Signup from '../screens/Signup';
import UserProfile from '../screens/UserProfileScreen';
import Login from '../tabs/login';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
// const headerOption = {
//   headers: {
//     Authorization: 'Bearer ' + AUTH_TOKEN
//   }
// };

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

  componentDidMount() {
    this._checkAuthentication();
  }

  _checkAuthentication = async () => {
    const token = await SecureStore.getItemAsync('token');
    const user = await SecureStore.getItemAsync('user');
    const url = URL + '/auth';

    if (token && user) {
      axios({
        method: 'post',
        url,
        data: {
          user,
          token
        }
      }).then(res => {
        setTimeout(() => {
          this.setState(
            {
              isLoading: false
            },
            () => {
              this.props.updateAuth({ auth: true, user: res.data.userInfo });
            }
          );
        }, 1000);
      });
    } else {
      setTimeout(() => {
        this.setState(
          {
            isLoading: false
          },
          () => {
            this.props.updateAuth({ auth: false, user: null });
          }
        );
      }, 1000);
    }
  };

  _getLocationAsync = async () => {
    const GEOLOCATION_OPTIONS = {
      enableHighAccuracy: true,
      timeInterval: 1000,
      distanceInterval: 10
    };

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    // let location = await Location.getCurrentPositionAsync({
    //   enableHighAccuracy: true,
    //   maximumAge: 1000
    // });

    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this._locationChanged);
  };

  _locationChanged = location => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05
    };
    this.setState({ location, region });
  };

  render() {
    let tabNav, text;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    if (this.state.isLoading || !this.state.location) {
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
  },
  SponsoredBusinessProfile: {
    screen: SponsoredBusinessProfileScreen,
    navigationOptions:
      Platform.OS === 'ios'
        ? { title: 'Profile', header: null }
        : { title: 'Profile', header: null }
  },
  CouponCarousel: {
    screen: CouponCarousel,
    navigationOptions: {
      title: 'Coupons',
      header: null //this will hide the header
    }
  }
});

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: { title: 'Profile', header: null }
  },
  Signup: {
    screen: Signup,
    navigationOptions: { title: 'Profile', header: null }
  },
  PrivacyPolicy: {
    screen: PrivacyPolicyScreen,
    navigationOptions:
      Platform.OS === 'ios'
        ? { title: 'Profile', header: null }
        : { title: 'Profile', header: null }
  },
  TermsOfService: {
    screen: TermsOfServiceScreen,
    navigationOptions:
      Platform.OS === 'ios'
        ? { title: 'Profile', header: null }
        : { title: 'Profile', header: null }
  }
});

const ProfileStackNavigator = createStackNavigator({
  UserProfile: {
    screen: UserProfile,
    navigationOptions:
      Platform.OS === 'ios'
        ? { title: 'Profile', header: null }
        : { title: 'Profile', header: null }
  },
  PrivacyPolicy: {
    screen: PrivacyPolicyScreen,
    navigationOptions:
      Platform.OS === 'ios'
        ? { title: 'Profile', header: null }
        : { title: 'Profile', header: null }
  },
  TermsOfService: {
    screen: TermsOfServiceScreen,
    navigationOptions:
      Platform.OS === 'ios'
        ? { title: 'Profile', header: null }
        : { title: 'Profile', header: null }
  }
  // Logout: {
  //   screen: Logout,
  //   navigationOptions:
  //     Platform.OS === 'ios'
  //       ? { title: 'Profile', header: null }
  //       : { title: 'Profile', header: null }
  // }
});

AppStackNavigator.navigationOptions = ({ navigation }) => {
  if (navigation.state.index === 1 || navigation.state.index === 2) {
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
        tabBarIcon: () => <Ionicons name="ios-search" color="#444" size={25} />
      }
    },
    Login: {
      screen: LoginStackNavigator,
      navigationOptions: {
        tabBarLabel: 'LOG IN',
        tabBarIcon: () => <AntDesign name="user" color="#444" size={25} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#f96a00',
      labelStyle: {
        fontSize: 10
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
        tabBarIcon: () => <Ionicons name="ios-search" color="#444" size={25} />
      }
    },
    Login: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarLabel: 'MY PAGE',
        tabBarIcon: () => <AntDesign name="user" color="#444" size={25} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#f96a00',
      labelStyle: {
        fontSize: 10
      },
      style: {
        backgroundColor: 'white',
        paddingTop: 10
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
