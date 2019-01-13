import React from 'react';
import { StyleSheet, Image, Alert, Text, View, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { EvilIcons } from '@expo/vector-icons/';

export default class GoogleLoginButton extends React.Component {
  state = {
    data: [],
    isLoading: true
  };

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
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,first_name,last_name,picture.type(large)`
        );
        const result = await response.json();
        return this.props.handleWebAuth('facebook', result);
      } else {
        if (type === 'cancel');
        return { cancelled: true };
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.logIn.bind(this)}
        style={[styles.buttonWrapper, styles.facebook]}
      >
        <View style={styles.buttonTextWrapper}>
          <EvilIcons name="sc-facebook" color="white" size={25} />
          <Text style={[styles.buttonText, styles.facebookButtonFont]}>Continue with Facebook</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
    paddingTop: 2,
    fontWeight: 'bold'
  },
  facebook: {
    backgroundColor: '#4267b2'
  }
});
