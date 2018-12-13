import React from 'react';
import { connect } from 'react-redux';
import { Platform, ActivityIndicator, StyleSheet, View } from 'react-native';
import { Constants, SecureStore } from 'expo';
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
    isLoading: true
  };

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
      }).then(res => {
        this.setState(
          {
            isLoading: false
          },
          () => {
            return this.props.updateAuth(true);
          }
        );
      });
    } else {
      this.setState(
        {
          isLoading: false
        },
        () => {
          return this.props.updateAuth(false);
        }
      );
    }
  };

  render() {
    let tabNav;
    // console.log('========== home props ============>', this.state);
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
