import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  Modal,
  Dimensions
} from 'react-native';
import axios from 'axios';
import { SecureStore } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import Login from './Login';

const { height, width } = Dimensions.get('window');
const logoutContainerWidth = (width * 2) / 3;

class UserProfile extends React.Component {
  state = {
    data: [],
    isLoading: false,
    isModalOpen: false,
    modalType: null,
    authMethod: 'login'
  };

  componentWillMount() {
    const user = SecureStore.getItemAsync('user');
  }

  _redirecToSignupPage() {
    this.setState({
      authMethod: 'signup'
    });
  }

  _redirecToLoginPage() {
    this.setState({
      authMethod: 'login'
    });
  }

  _redirecToTermsPage() {
    this.props.navigation.navigate('TermsOfService');
  }
  _redirecToPrivacyPage() {
    this.props.navigation.navigate('PrivacyPolicy');
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
    const url = 'https://veeh-coupon.herokuapp.com/api' + '/logout';

    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('email');

    axios
      .get(url)
      .then(res => {
        this.setState(
          {
            modalType: null,
            isModalOpen: false,
            isLoading: false
          },
          () => {
            this.props.updateAuth({ auth: false, user: null });
            this.props.navigation.navigate('Home');
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  _openModal(modalType) {
    this.setState({
      modalType,
      isModalOpen: true
    });
  }

  _closeModal() {
    if (!this.state.isLoading) {
      this.setState({
        modalType: null,
        isModalOpen: false,
        isLoading: false
      });
    }
  }
  _clickInnerBox() {}
  _handleModal() {
    let body;
    if (this.state.modalType === 'logout') {
      if (this.state.isLoading) {
        body = (
          <View style={styles.ActivityIndicatorContainer}>
            <ActivityIndicator size="large" color="#f96a00" />
          </View>
        );
      } else {
        body = (
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              backgroundColor: 'white'
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={styles.userProfileFont}>Are you sure want to logout?</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly'
              }}
            >
              <TouchableOpacity onPress={this._closeModal.bind(this)}>
                <Text style={[styles.userProfileFont, { fontSize: 12 }]}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._logOut.bind(this)}>
                <Text style={[styles.userProfileFont, { color: '#f96a00', fontSize: 12 }]}>
                  LOG OUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }

      return (
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.isModalOpen}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <TouchableWithoutFeedback onPress={this._closeModal.bind(this)}>
            <View
              style={[styles.ActivityIndicatorContainer, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
            >
              <View
                style={{
                  width: logoutContainerWidth,
                  height: logoutContainerWidth / 2,
                  backgroundColor: 'white'
                }}
              >
                <TouchableWithoutFeedback onPress={this._clickInnerBox.bind(this)}>
                  {body}
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      );
    }
  }

  render() {
    const user = this.props.user;
    let modal = this._handleModal();

    if (!this.props.auth) {
      return (
        <Login
          authMethod={this.state.authMethod}
          navigation={this.props.navigation}
          redirecToLoginPage={this._redirecToLoginPage.bind(this)}
          redirecToSignupPage={this._redirecToSignupPage.bind(this)}
        />
      );
    } else {
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
                onPress={this._redirecToPrivacyPage.bind(this)}
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
              onPress={this._redirecToTermsPage.bind(this)}
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
              onPress={e => this._openModal('logout')}
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
          {modal}
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
