import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { NODE_ENV, URL } from 'react-native-dotenv';
import axios from 'axios';
import { Constants, SecureStore } from 'expo';
import FacebookLoginButton from '../components/FacebookLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';

class Login extends React.Component {
  state = {
    data: [],
    isLoading: false
  };

  _redirecToLoginPage() {
    this.props.navigation.navigate('Signup');
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

    const url = URL + `/signup`;

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
