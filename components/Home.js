import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, AntDesign } from '@expo/vector-icons/';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import BusinessListScreen from '../screens/BusinessListScreen';
import BusinessProfileScreen from '../screens/BusinessProfileScreen';
import Signup from '../tabs/signup';

const { height, width } = Dimensions.get('window');

class Home extends React.Component {
  // static navigationOptions = {
  //   header: null
  // };
  state = {
    auth: true
  };
  render() {
    console.log('Home props', this.props);
    return (
      <View style={styles.container}>
        {/* <View style={styles.topMenu}>
          <Text>Top menu</Text>
        </View> */}
        <View style={styles.main}>
          <AppBottomTabNavigator screenProps={this.state} />
        </View>
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

AppStackNavigator.navigationOptions = ({ navigation }) => {
  console.log(Platform.OS);
  // console.log();
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
    // navigationOptions: {
    //   tabBarLabel: 'Home',
    //   tabBarIcon: ({ tintColor }) => {
    //     <Icon name="ios-search-outline" color={tintColor} />;
    //   }
    // }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      tabBarLabel: 'LOG IN',
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
