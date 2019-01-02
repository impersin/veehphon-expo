import React from 'react';
import { connect } from 'react-redux';
import { NODE_ENV, URL } from 'react-native-dotenv';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Modal
} from 'react-native';
import axios from 'axios';
import { Constants, SecureStore } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import Logout from './Logout';

class UserProfile extends React.Component {
  state = {
    data: [],
    isLoading: false
  };

  componentWillMount() {
    const user = SecureStore.getItemAsync('user');
  }
  _redirecToLoginPage(screen) {
    this.props.navigation.navigate(screen);
  }
  _pressEmail = () => {
    Linking.openURL(`mailto:support@veeh.co`);
  };

  _handleLoading(isLoading) {
    this.setState({
      isLoading
    });
  }

  _logOut = async () => {
    this._handleLoading(true);
    const url = URL + '/logout';
    // console.log(URL);
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
    const user = this.props.user;
    return (
      <View style={styles.container}>
        <View style={[styles.header]}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
            source={{ uri: user.profileImage }}
          />
          <Text style={[styles.userProfileFont, { fontSize: 18 }]}>{`${user.firstName} ${
            user.lastName
          }`}</Text>
        </View>
        <View style={[styles.body]}>
          <View
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1
            }}
          >
            <TouchableOpacity
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50,
                flexDirection: 'row'
              }}
              onPress={e => this._redirecToLoginPage('PrivacyPolicy')}
            >
              <View>
                <Text style={[styles.userProfileFont]}>Privacy Policy</Text>
              </View>
              <View>
                <MaterialCommunityIcons name="security" color="#444" size={25} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 50,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1
            }}
            onPress={e => this._redirecToLoginPage('TermsOfService')}
          >
            <View>
              <Text style={[styles.userProfileFont]}>Terms Of Service</Text>
            </View>
            <View>
              <MaterialCommunityIcons name="file-document-outline" color="#444" size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 50,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1
            }}
            onPress={this._pressEmail.bind(this)}
          >
            <View>
              <Text style={[styles.userProfileFont]}>Contact Us</Text>
            </View>
            <View>
              <MaterialCommunityIcons name="email-open-outline" color="#444" size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => this._logOut()}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 50,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1
            }}
          >
            <View>
              <Text style={[styles.userProfileFont]}>Log out</Text>
            </View>
            <View>
              <MaterialCommunityIcons name="logout" color="#444" size={25} />
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isLoading}
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
)(UserProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 2
  },
  userProfileFont: {
    color: '#444'
  }
});
