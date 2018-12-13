import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Constants, SecureStore } from 'expo';

class Logout extends React.Component {
  state = {
    data: [],
    isLoading: false
  };

  componentWillMount() {}

  componentDidMount() {}

  _redirecToLoginPage() {
    this.props.navigation.navigate('Signup');
  }

  _handleLoading(isLoading) {
    this.setState({
      isLoading
    });
  }

  _logOut = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('email');
    this.props.updateAuth(false);
  };

  render() {
    // console.log('login Tapnav props', this.props);

    if (this.state.isLoading) {
      return (
        <View style={styles.ActivityIndicatorContainer}>
          <ActivityIndicator size="large" color="#f96a00" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={e => this._logOut()} style={[styles.buttonWrapper]}>
          <View style={styles.buttonTextWrapper}>
            <Text style={[styles.buttonText]}>
              <Text style={styles.innerFont}>Log out</Text>
            </Text>
          </View>
        </TouchableOpacity>
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
)(Logout);

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
