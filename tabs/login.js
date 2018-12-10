import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, AntDesign, EvilIcons } from '@expo/vector-icons/';

export default class Login extends React.Component {
  state = {
    data: [],
    isLoading: true
  };

  componentWillMount() {}

  componentDidMount() {}

  _redirecToLoginPage() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    console.log('Signup Tapnav props', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 24, marginBottom: 5 }}>Your profile</Text>
          <Text style={{ fontSize: 14 }}>Log in to start planning your next trip</Text>
        </View>
        <View style={styles.body}>
          <TouchableOpacity style={[styles.buttonWrapper, styles.facebook]}>
            <View style={styles.buttonTextWrapper}>
              <EvilIcons name="sc-facebook" color="white" size={25} />
              <Text style={[styles.buttonText, styles.facebookButtonFont]}>
                Continue with Facebook
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonWrapper, styles.google]}>
            <View style={styles.buttonTextWrapper}>
              <Image
                source={require('../assets/icons/google_login.png')}
                style={{ width: 22, height: 22 }}
              />
              <Text style={[styles.buttonText, styles.googleButtonFont]}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => this._redirecToLoginPage()}
            style={[styles.buttonWrapper]}
          >
            <View style={styles.buttonTextWrapper}>
              <Text style={[styles.buttonText]}>
                Don't have an account? <Text style={styles.innerFont}>Sign up</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
    // backgroundColor: 'green'
  },
  body: {
    flex: 4
    // backgroundColor: 'red'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: { width: '100%', fontSize: 14, textAlign: 'center' },
  facebookButtonFont: {
    color: 'white',
    paddingTop: 2
  },
  googleButtonFont: {
    paddingTop: 2
    // backgroundColor: 'red'
  },
  icons: {},
  facebook: {
    backgroundColor: '#4267b2'
  },
  google: {
    backgroundColor: 'white',
    borderWidth: 1
  },
  innerFont: {
    color: '#337ab7'
  }
});
