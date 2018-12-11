import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import Expo, { Google } from 'expo';
export default class GoogleButton extends React.Component {
  state = {
    data: [],
    isLoading: true
  };

  componentWillMount() {}

  componentDidMount() {}

  _redirecToLoginPage() {
    this.props.navigation.navigate('Signup');
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '358804249552-lc95ffcg9ks5sk6k70smr5p296v8iqi6.apps.googleusercontent.com',
        iosClientId: '358804249552-pp9p30ke7f755ma1iubbun209aqt7cpr.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        behavior: 'web'
      });

      if (result.type === 'success') {
        console.log(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    console.log('Signup Tapnav props', this.props);
    return (
      <TouchableOpacity
        onPress={this.signInWithGoogleAsync}
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
  facebookButtonFont: {
    color: 'white',
    paddingTop: 2
  },
  googleButtonFont: {
    paddingTop: 2
    // backgroundColor: 'red'
  },
  google: {
    backgroundColor: 'white',
    borderWidth: 1
  }
});
