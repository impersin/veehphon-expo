import React from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  Linking,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
  FlatList
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons/';
import axios from 'axios';
import BackgroundImage from './../components/BackgroundImage';
import GoogleMap from './../components/GoogleMap';
import Tags from './../components/Tags';
import Coupons from './../components/Coupons';
import BlockMenu from './../components/BlockMenu';
import { NODE_ENV, URL } from 'react-native-dotenv';

class SponsoredBusinessProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home'
  // };
  state = {
    isLoading: false,
    yOffset: 0,
    isModalOpen: false,
    business: this.props.navigation.state.params.data
  };

  _goToPrevious() {
    this.props.navigation.goBack();
  }

  _redirectToProfile(data) {
    this.props.navigation.navigate('BusinessProfile', { data });
  }

  _redirectToCarousel(coupon) {
    this.props.navigation.navigate('CouponCarousel', coupon);
  }

  _handleScroll(e) {
    const nativeEvent = e.nativeEvent;
    const yOffset = nativeEvent.contentOffset.y;
    this.setState({
      yOffset
    });
  }

  _handleMapMoal() {
    this.setState({
      isModalOpen: true
    });
  }

  _closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  _handleDirection() {
    let { addressStreet, addressZipcode, addressCity } = this.state.business;

    let daddr = encodeURIComponent(`${addressStreet} ${addressZipcode}, ${addressCity}`);

    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
    } else {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
    }
  }

  _renderDetails(business) {
    const addressOne = `${business.addressStreet}`;
    const addressTwo = `${business.addressCity}, ${business.addressState} ${
      business.addressZipcode
    }`;
    const website = business.website === '' ? null : business.website;
    const businessHours = `Mon-Thu ${business.hours[0]}, Fri-Sat ${business.hours[1]}, Sun ${
      business.hours[2]
    }`;
    let sponsores = null;
    return (
      <View style={styles.details}>
        <View style={[styles.detailsContent]}>
          <Text style={[styles.detailsFont, styles.detailsTitle]}>{business.businessName}</Text>
        </View>
        <View style={[styles.detailsContent]}>
          <Text style={[styles.detailsFont, styles.detialsSubtitle]}>Business Hours</Text>
          <Text style={styles.detailsFont}>{businessHours}</Text>
        </View>
        <Tags tags={this.state.business.tags} />
        <Text style={[styles.detailsFont, styles.detialsSubtitle]}>Coupons</Text>
        <ScrollView horizontal={true}>
          <Coupons
            coupons={business.coupons}
            goToPrevious={this._goToPrevious.bind(this)}
            redirectToCarousel={this._redirectToCarousel.bind(this)}
          />
        </ScrollView>
        <GoogleMap
          handleMapMoal={this._handleMapMoal.bind(this)}
          location={business.geometry.coordinates}
          title={business.businessName}
        />
        <View style={[styles.detailsContent, styles.addressContainer]}>
          <View style={styles.addressLeft}>
            <Text style={styles.detailsFont}>{`${addressOne}`}</Text>
            <Text style={styles.detailsFont}>{`${addressTwo}`}</Text>
          </View>
          <View style={styles.addressRight}>
            {/* <Text style={styles.detailsFont}>Get direction button.</Text> */}
            <TouchableOpacity
              onPress={this._handleDirection.bind(this)}
              style={styles.directionIconContainer}
            >
              <MaterialIcons name="directions" size={35} color="#f96a00" />
            </TouchableOpacity>
            <Text style={[styles.detailsFont, { fontSize: 12, fontWeight: 'bold' }]}>
              Directions
            </Text>
            <Text style={[styles.detailsFont, { fontSize: 12 }]}>{`${this.state.dist}mi`}</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
          <BlockMenu icon={'phone'} title={business.phoneNumber} subTitle={'Subtitle'} />
          <BlockMenu icon={'home'} title={business.website} subTitle={'Subtitle'} />
        </View>
        {sponsores}
      </View>
    );
  }
  render() {
    let business = this.state.business,
      topMenu = null,
      adImage = null,
      details;
    if (this.state.yOffset < 250) {
      topMenu = (
        <View style={styles.topMenu}>
          <TouchableOpacity onPress={this._goToPrevious.bind(this)} style={styles.topMenuOne}>
            <Ionicons name="ios-arrow-back" color={'white'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topMenuTwo}>
            <Ionicons name="ios-share-alt" color={'white'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topMenuThree}>
            <Ionicons name="ios-heart-empty" color={'white'} size={30} />
          </TouchableOpacity>
        </View>
      );
    } else {
      topMenu = (
        <View style={styles.topMenuWhite}>
          <TouchableOpacity onPress={this._goToPrevious.bind(this)} style={styles.topMenuOne}>
            <Ionicons name="ios-arrow-back" color={'#444'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topMenuTwo}>
            <Ionicons name="ios-share-alt" color={'#444'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topMenuThree}>
            <Ionicons name="ios-heart-empty" color={'#444'} size={30} />
          </TouchableOpacity>
        </View>
      );
    }

    if (this.state.isModalOpen) {
      const addressOne = `${business.addressStreet}`;
      const addressTwo = `${business.addressCity}, ${business.addressState} ${
        business.addressZipcode
      }`;
      return (
        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={{ paddingTop: Constants.statusBarHeight }} />
            <View
              style={Platform.OS === 'ios' ? styles.topMenuModalIos : styles.topMenuModalAndroid}
            >
              <TouchableOpacity
                onPress={this._closeModal.bind(this)}
                style={[
                  styles.topMenuOne,
                  {
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }
                ]}
              >
                <Ionicons name="ios-arrow-back" color={'#444'} size={30} />
                <Text style={{ color: '#444', fontSize: 18, fontWeight: 'bold', paddingLeft: 20 }}>
                  Location
                </Text>
              </TouchableOpacity>
            </View>
            <GoogleMap
              handleMapMoal={this._handleMapMoal.bind(this)}
              location={this.state.coordinates}
              title={business.businessName}
              type="modal"
            />
            <View style={{ flex: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
              <View style={[styles.detailsContent, styles.addressContainer]}>
                <View style={styles.addressLeft}>
                  <Text style={[styles.detailsFont, { fontWeight: 'bold', paddingBottom: 5 }]}>{`${
                    business.businessName
                  }`}</Text>
                  <Text style={styles.detailsFont}>{`${addressOne}`}</Text>
                  <Text style={styles.detailsFont}>{`${addressTwo}`}</Text>
                </View>
                <View style={styles.addressRight}>
                  <TouchableOpacity
                    onPress={this._handleDirection.bind(this)}
                    style={styles.directionIconContainer}
                  >
                    <MaterialIcons name="directions" size={35} color="#f96a00" />
                  </TouchableOpacity>
                  <Text style={[styles.detailsFont, { fontSize: 12, fontWeight: 'bold' }]}>
                    Directions
                  </Text>
                  <Text style={[styles.detailsFont, { fontSize: 12 }]}>{`${
                    this.state.dist
                  }mi`}</Text>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
    const uri = business.photos[0];
    adImage = <BackgroundImage uri={uri} goToPrevious={this._goToPrevious.bind(this)} />;

    if (this.state.isLoading) {
      details = (
        <View style={[styles.details, styles.ActivityIndicatorContainer]}>
          <ActivityIndicator size="large" color="#f96a00" />
        </View>
      );
    } else {
      details = this._renderDetails(business);
    }

    return (
      <View>
        {topMenu}
        <ScrollView scrollEventThrottle={16} onScroll={e => this._handleScroll(e)}>
          {adImage}
          {details}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white'
    // paddingTop: Constants.statusBarHeight
  },
  ActivityIndicatorContainer: {
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
    // backgroundColor: 'black'
  },
  topMenuWhite: {
    display: 'flex',
    alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    height: 200,
    zIndex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowColor: 'black'
  },
  topMenuModalAndroid: {
    display: 'flex',
    alignSelf: 'stretch',
    position: 'absolute',
    // top: 44,
    height: 200,
    zIndex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  topMenuModalIos: {
    display: 'flex',
    alignSelf: 'stretch',
    position: 'absolute',
    top: Constants.statusBarHeight,
    height: 200,
    zIndex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  details: {
    flex: 1,
    minHeight: 500,
    padding: 10,
    // justifyContent: 'center'
    // alignSelf: 'stretch',
    backgroundColor: 'white'
    // paddingBottom: 50
  },
  detailsContent: {
    marginBottom: 20
  },
  detailsFont: {
    color: '#444',
    fontSize: 14
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10
  },
  detialsSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  addressLeft: {
    flex: 5,
    // borderWidth: 1,
    justifyContent: 'center'
  },
  addressRight: {
    flex: 2,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  directionIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: '#ccc'
  },
  topMenuOne: {
    flex: 6,
    // borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  topMenuTwo: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  topMenuThree: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  paddingTop: {
    paddingTop: 30
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  login: target => {
    dispatch({ type: 'AUTH', payload: target });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsoredBusinessProfileScreen);
