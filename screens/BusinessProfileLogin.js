import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { Constants, SecureStore } from 'expo';
import { Ionicons } from '@expo/vector-icons/';
import FacebookLoginButton from '../components/FacebookLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';

class Login extends React.Component {
  state = {
    data: [],
    isLoading: false
  };

  _redirectToSignupPage() {
    this.props.navigation.navigate('BusinessProfileLogin', { type: 'signup' });
  }

  _redirectToLoginPage() {
    this.props.navigation.navigate('BusinessProfileLogin', { type: 'login' });
  }

  _redirectToTermsPage() {
    this.props.navigation.navigate('TermsOfService');
  }

  _redirectToPolicyPage() {
    this.props.navigation.navigate('PrivacyPolicy');
  }

  _goToPrevious() {
    this.props.navigation.goBack();
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

    const url = 'https://veeh-coupon.herokuapp.com/api' + `/signup`;

    axios({
      method: 'post',
      url,
      data: userInfo
    })
      .then(res => {
        SecureStore.setItemAsync('token', res.data.token);
        SecureStore.setItemAsync('user', JSON.stringify(res.data.userInfo));
        SecureStore.setItemAsync(
          'business',
          JSON.stringify(this.props.navigation.state.params.business)
        );
        SecureStore.setItemAsync(
          'coupons',
          JSON.stringify(this.props.navigation.state.params.coupons)
        );
        SecureStore.setItemAsync('index', JSON.stringify(this.props.navigation.state.params.index));

        setTimeout(() => {
          this.props.updateAuth({ auth: true, user: res.data.userInfo });
          this._handleLoading(false);
          this.props.navigation.navigate('CouponCarousel', {
            coupons: this.props.navigation.state.params.coupons,
            index: this.props.navigation.state.params.index,
            business: this.props.navigation.state.params.business,
            redirectedFrom: this.props.navigation.state.params.redirectedFrom
          });
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

    if (this.props.navigation.state.params.type === 'login') {
      return (
        <View style={styles.container}>
          <View style={styles.topMenu}>
            <TouchableOpacity onPress={this._goToPrevious.bind(this)} style={styles.topMenuOne}>
              <Ionicons name="ios-arrow-back" color={'#444'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topMenuTwo}>
              {/* <Ionicons name="ios-share-alt" color={'white'} size={30} /> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.topMenuThree}>
              {/* <Ionicons name="ios-heart-empty" color={'white'} size={30} /> */}
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={{ fontSize: 24, marginBottom: 5 }}>Log In</Text>
            {/* <Text style={{ fontSize: 14 }}>Log in to use this coupon</Text> */}
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
            <View onPress={this._redirectToSignupPage.bind(this)} style={[styles.buttonWrapper]}>
              <View style={styles.buttonTextWrapper}>
                <Text style={[styles.buttonText]}>
                  Don't have an account?{' '}
                  <Text onPress={this._redirectToSignupPage.bind(this)} style={styles.innerFont}>
                    Sign up
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.topMenu}>
            <TouchableOpacity onPress={this._goToPrevious.bind(this)} style={styles.topMenuOne}>
              <Ionicons name="ios-arrow-back" color={'#444'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topMenuTwo}>
              {/* <Ionicons name="ios-share-alt" color={'white'} size={30} /> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.topMenuThree}>
              {/* <Ionicons name="ios-heart-empty" color={'white'} size={30} /> */}
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={{ fontSize: 24, marginBottom: 5 }}>Sign up to use this coupon</Text>
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
            <View style={[styles.buttonWrapper, { marginTop: 10 }]}>
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
                <Text onPress={this._redirectToLoginPage.bind(this)} style={styles.innerFont}>
                  Log in
                </Text>
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: status => {
      dispatch({ type: 'AUTH', payload: status });
    },
    storePendingData: data => {
      dispatch({ type: 'PENDING_DATA', payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

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
  topMenu: {
    display: 'flex',
    alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    height: 200,
    zIndex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center'
  },
  topMenuOne: {
    flex: 6,
    justifyContent: 'center',
    paddingLeft: 20
  },
  topMenuTwo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  topMenuThree: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
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
  },
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
