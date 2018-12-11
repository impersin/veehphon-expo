import React from 'react';
import { StyleSheet, Image, Alert, Text, View, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { EvilIcons } from '@expo/vector-icons/';

export default class GoogleLoginButton extends React.Component {
  state = {
    data: [],
    isLoading: true
  };

  componentWillMount() {}

  componentDidMount() {}

  _redirecToLoginPage() {
    this.props.navigation.navigate('Signup');
  }

  async logIn() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Expo.Facebook.logInWithReadPermissionsAsync('313650029360284', {
        permissions: ['public_profile', 'email']
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,birthday,picture.type(large)`
        );
        const userProfile = await response.json();
        console.log(userProfile);
        // Alert.alert('Logged in!', `Hi ${await response.json()}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    console.log('Signup Tapnav props', this.props);
    return (
      <TouchableOpacity onPress={this.logIn} style={[styles.buttonWrapper, styles.facebook]}>
        <View style={styles.buttonTextWrapper}>
          <EvilIcons name="sc-facebook" color="white" size={25} />
          <Text style={[styles.buttonText, styles.facebookButtonFont]}>Continue with Facebook</Text>
        </View>
      </TouchableOpacity>
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
