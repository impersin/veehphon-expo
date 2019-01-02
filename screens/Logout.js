import React from 'react';
import { connect } from 'react-redux';
import { NODE_ENV, URL } from 'react-native-dotenv';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { Constants, SecureStore } from 'expo';

class Logout extends React.Component {
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

  _logOut = async () => {
    this._handleLoading(true);
    const url = URL + '/logout';
    console.log(URL);
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('email');

    axios
      .get(url)
      .then(res => {
        setTimeout(() => {
          return this.props.updateAuth(false);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
      <TouchableOpacity onPress={e => this._logOut()} style={[styles.buttonWrapper]}>
        <Text style={[styles.veehFont]}>Sign out</Text>
      </TouchableOpacity>
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
  veehFont: {
    color: '#444'
  }
});
