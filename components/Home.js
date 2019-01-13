import React from 'react';
import { connect } from 'react-redux';
import { Platform, ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { Constants, SecureStore, Location, Permissions } from 'expo';
import { Ionicons, AntDesign } from '@expo/vector-icons/';
import { createBottomTabNavigator, createStackNavigator, BottomTabBar } from 'react-navigation';
import axios from 'axios';
import BusinessListScreen from '../screens/BusinessListScreen';
import BusinessProfileScreen from '../screens/BusinessProfileScreen';
import SponsoredBusinessProfileScreen from '../screens/SponsoredBusinessProfileScreen';
import CouponCarousel from '../screens/CouponCarousel';
import BusinessProfileSignup from '../screens/BusinessProfileSignup';
import UserProfile from '../screens/UserProfileScreen';
import BusinessProfileLogin from '../screens/BusinessProfileLogin';
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
    location: {},
    errorMessage: null
  };

  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isURLice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your URLice!',
        location: {}
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
    const url = 'https://veeh-coupon.herokuapp.com/api' + '/auth';

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
        errorMessage: 'Permission to access location was denied',
        location: {}
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
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.ActivityIndicatorContainer]}>
          <ActivityIndicator size="large" color="#f96a00" />
        </View>
      );
    }
    return <AppBottomTabNavigator screenProps={this.state} />;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  ActivityIndicatorContainer: { alignItems: 'center', justifyContent: 'center' },
  topMenu: { flex: 1, backgroundColor: 'yellow' },
  main: {
    flex: 11
  }
});

// const AppStackNavigatorConfig = {
//   transitionConfig: () => ({
//     transitionSpec: {
//       duration: 500,
//       easing: Easing.out(Easing.step1),
//       timing: Animated.timing,
//       useNativeDriver: true
//     }
//   })
// };

const AppStackNavigator = createStackNavigator(
  {
    BusinessList: {
      screen: BusinessListScreen
    },
    BusinessProfile: {
      screen: BusinessProfileScreen
    },
    SponsoredBusinessProfile: {
      screen: SponsoredBusinessProfileScreen
    },
    CouponCarousel: {
      screen: CouponCarousel
    },
    BusinessProfileLogin: {
      screen: BusinessProfileLogin
    },
    BusinessProfileSignup: {
      screen: BusinessProfileSignup
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const LoginStackNavigator = createStackNavigator(
  {
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
  },
  {
    initialRouteName: 'UserProfile',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

AppStackNavigator.navigationOptions = ({ navigation }) => {
  if (navigation.state.index > 0) {
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
        tabBarIcon: ({ focused, tintColor }) => {
          // const iconName = `ios-search${focused ? '' : '-outline'}`;
          return <Ionicons name={'ios-search'} color={tintColor} size={25} />;
        }
        // tabBarIcon: () => <Ionicons name="ios-search" color="#444" size={25} />
      }
    },
    Login: {
      screen: LoginStackNavigator,
      navigationOptions: {
        tabBarLabel: 'MY PAGE',
        tabBarIcon: ({ focused, tintColor }) => {
          // const iconName = `ios-search${focused ? '' : '-outline'}`;
          return <AntDesign name="user" color={tintColor} size={25} />;
        }
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
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        paddingTop: 5
      }
    }
  }
);

// const AppBottomTabNavigatorLoggedin = createBottomTabNavigator(
//   {
//     Home: {
//       screen: AppStackNavigator,
//       navigationOptions: {
//         tabBarLabel: 'EXPLORE',
//         tabBarIcon: () => <Ionicons name="ios-search" color="#444" size={25} />
//       }
//     },
//     Login: {
//       screen: ProfileStackNavigator,
//       navigationOptions: {
//         tabBarLabel: 'MY PAGE',
//         tabBarIcon: () => <AntDesign name="user" color="#444" size={25} />
//       }
//     }
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: '#f96a00',
//       labelStyle: {
//         fontSize: 10
//       },
//       style: {
//         backgroundColor: 'white',
//         paddingTop: 10
//       }
//     }
//   }
// );

// const ProfileStackNavigator = createStackNavigator({
//   UserProfile: {
//     screen: UserProfile,
//     navigationOptions:
//       Platform.OS === 'ios'
//         ? { title: 'Profile', header: null }
//         : { title: 'Profile', header: null }
//   },
//   PrivacyPolicy: {
//     screen: PrivacyPolicyScreen,
//     navigationOptions:
//       Platform.OS === 'ios'
//         ? { title: 'Profile', header: null }
//         : { title: 'Profile', header: null }
//   },
//   TermsOfService: {
//     screen: TermsOfServiceScreen,
//     navigationOptions:
//       Platform.OS === 'ios'
//         ? { title: 'Profile', header: null }
//         : { title: 'Profile', header: null }
//   }
// });
