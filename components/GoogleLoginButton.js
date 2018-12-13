import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { Google } from 'expo';

export default class GoogleButton extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: [],
    isLoading: true
  };

  _redirecToLoginPage() {
    this.props.navigation.navigate('Signup');
  }

  async logIn() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '358804249552-lc95ffcg9ks5sk6k70smr5p296v8iqi6.apps.googleusercontent.com',
        iosClientId: '358804249552-pp9p30ke7f755ma1iubbun209aqt7cpr.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        behavior: 'web'
      });

      if (result.type === 'success') {
        return this.props.handleWebAuth('google', result);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    // console.log('google login button props', this.props);
    return (
      <TouchableOpacity
        //this.signInWithGoogleAsync need to be binded to this component
        onPress={this.logIn.bind(this)}
        style={[styles.buttonWrapper, styles.google]}
      >
        <View style={styles.buttonTextWrapper}>
          <Image
            source={require('../assets/icons/google_login.png')}
            style={{ width: 22, height: 22 }}
          />
          <Text style={[styles.buttonText, styles.googleButtonFont]}>Continue with Google</Text>
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
  googleButtonFont: {
    paddingTop: 2
  },
  google: {
    backgroundColor: 'white',
    borderWidth: 1
  }
});
