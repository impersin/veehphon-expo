import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Text, View, Modal } from 'react-native';
import axios from 'axios';
import { Constants, SecureStore } from 'expo';
import FacebookLoginButton from '../components/FacebookLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';

class Signup extends React.Component {
  state = {
    data: [],
    isLoading: false
  };

  _redirectToLoginPage() {
    this.props.navigation.goBack();
  }
  _redirectToTermsPage() {
    this.props.navigation.navigate('TermsOfService');
  }
  _redirectToPolicyPage() {
    this.props.navigation.navigate('PrivacyPolicy');
  }

  _handleLoading(isLoading) {
    this.setState({
      isLoading
    });
  }

  _handleWebAuth(type, data) {
    this._handleLoading(true);
    let userInfo;
    if (type === 'google') {
      userInfo = {
        firstName: data.user.givenName,
        lastName: data.user.familyName,
        email: data.user.email,
        profileImage: data.user.photoUrl
      };
    } else if (type === 'facebook') {
      userInfo = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        profileImage: data.picture.data.url
      };
    }
    const url = process.env.URL + `/signup`;
    // console.log(process.env.URL);
    axios({
      method: 'post',
      url,
      data: userInfo
    })
      .then(res => {
        SecureStore.setItemAsync('token', res.data.token);
        SecureStore.setItemAsync('user', JSON.stringify(res.data.userInfo));
        setTimeout(() => {
          this.props.updateAuth({ auth: true, user: res.data.userInfo });
          this._handleLoading(false);
          this.props.navigation.navigate('Home');
        }, 1500);
      })
      .catch(err => {});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={styles.ActivityIndicatorContainer}>
              <ActivityIndicator size="large" color="#f96a00" />
            </View>
          </Modal>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 24, marginBottom: 5 }}>Sign Up</Text>
          {/* <Text style={{ fontSize: 14 }}>Sign in to use this coupon</Text> */}
        </View>
        <View style={styles.body}>
          <FacebookLoginButton
            handleWebAuth={this._handleWebAuth.bind(this)}
            handleLoading={this._handleLoading.bind(this)}
          />
          <GoogleLoginButton
            handleWebAuth={this._handleWebAuth.bind(this)}
            handleLoading={this._handleLoading.bind(this)}
          />
          <View style={[styles.buttonWrapper]}>
            <Text style={[styles.buttonText, { color: '#777', marginBottom: 15 }]}>
              By using Veeh Coupon, you agree to our
              <Text style={styles.innerFont} onPress={this._redirectToTermsPage.bind(this)}>
                {' '}
                Terms
              </Text>{' '}
              &
              <Text style={styles.innerFont} onPress={this._redirectToPolicyPage.bind(this)}>
                {' '}
                Privacy Policy
              </Text>
            </Text>
            <Text style={[styles.buttonText, { color: '#444' }]}>
              Already have a Veeh account?{' '}
              <Text onPress={e => this._redirectToLoginPage()} style={styles.innerFont}>
                Log in
              </Text>
            </Text>
          </View>
        </View>
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
)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20
  },
  ActivityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  header: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  body: {
    flex: 4
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center'
    // height: 50,
    // marginBottom: 10,
    // borderRadius: 5
  },
  buttonTextWrapper: {
    // flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: { fontSize: 14, textAlign: 'center' },
  facebookButtonFont: {
    color: 'white',
    paddingTop: 2
  },
  googleButtonFont: {
    paddingTop: 2
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
