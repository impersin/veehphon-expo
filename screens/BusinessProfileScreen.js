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
  Dimensions
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons/';
import axios from 'axios';
import BackgroundImage from './../components/BackgroundImage';
import GoogleMap from './../components/GoogleMap';
import Tags from './../components/Tags';
import Coupons from './../components/Coupons';
import BlockMenu from './../components/BlockMenu';
const { height, width } = Dimensions.get('window');

class BusinessProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home'
  // };
  state = {
    isLoading: true,
    yOffset: 0,
    type: this.props.navigation.state.params.data.type,
    coordinates: this.props.navigation.state.params.data.coordinates,
    // dist: this.props.navigation.state.params.data.dist.calculated,
    isModalOpen: false,
    modalType: null
  };

  componentDidMount() {
    const id = this.props.navigation.state.params.data.id;
    const url = 'https://veeh-coupon.herokuapp.com/api' + `/business?id=${id}`;
    const sponsoredUrl = 'https://veeh-coupon.herokuapp.com/api' + `/sponsored/businesses?`;

    axios.get(url).then(res => {
      const business = res.data;
      if (this.props.navigation.state.params.data.dist) {
        business.dist = this.props.navigation.state.params.data.dist.calculated;
      }
      if (business.type === 'Non-advertiser') {
        axios
          .get(
            sponsoredUrl +
              `category=${business.businessCategory}&lat=${this.state.coordinates[1]}&lng=${
                this.state.coordinates[0]
              }`
          )
          .then(res => {
            const sponsoredBusiness = res.data.map(business => {
              business.dist.calculated = (business.dist.calculated * 0.62).toFixed(1);
              return business;
            });

            if (this.props.navigation.state.params.coupons) {
              this.setState(
                {
                  business,
                  isLoading: false
                },
                () => {
                  this.props.navigation.navigate(
                    'CouponCarousel',
                    this.props.navigation.state.params.couponData
                  );
                }
              );
              // this.setState({
              //   modalType: 'coupons',
              //   isLoading: false,
              //   isModalOpen: true,
              //   business
              // });
            } else {
              setTimeout(() => {
                this.setState({
                  business,
                  sponsoredBusiness,
                  isLoading: false
                });
              }, 1000);
            }
          });
      } else {
        if (this.props.navigation.state.params.coupons) {
          this.setState(
            {
              business,
              isLoading: false
            },
            () => {
              this.props.navigation.navigate('CouponCarousel', {
                coupons: this.props.navigation.state.params.coupons,
                index: this.props.navigation.state.params.index
              });
            }
          );
          // this.setState({
          //   modalType: 'coupons',
          //   isLoading: false,
          //   isModalOpen: true,
          //   business
          // });
        } else {
          setTimeout(() => {
            this.setState({
              business,
              isLoading: false
            });
          }, 1000);
        }
      }
    });
  }

  _goToPrevious() {
    this.props.navigation.goBack();
  }

  _redirectToProfile(data) {
    this.props.navigation.navigate('SponsoredBusinessProfile', { data });
  }

  _redirectToCarousel(index) {
    if (this.props.auth) {
      this.props.navigation.navigate('CouponCarousel', {
        index,
        coupons: this.state.business.coupons
      });
    } else {
      this.props.navigation.navigate('BusinessProfileLogin', {
        business: this.props.navigation.state.params.data,
        coupons: this.state.business.coupons,
        index,
        type: 'login',
        redirectedFrom: 'BusinessProfile'
      });
    }
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

  _renderSponsores() {
    const businesses = this.state.sponsoredBusiness.slice();
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={[styles.detailsFont, styles.detialsSubtitle]}>Sponsored businesses</Text>
        <ScrollView horizontal={true}>
          {businesses.map((business, index) => {
            return (
              <TouchableOpacity onPress={e => this._redirectToProfile(business)} key={index}>
                <View
                  style={{
                    width: 160,
                    height: 140,
                    marginRight: 10,
                    borderColor: '#ccc',
                    borderWidth: 1
                  }}
                >
                  <Image
                    style={{ flex: 2, width: null, height: null, resizeMode: 'cover' }}
                    source={{ uri: business.photos[0] }}
                  />
                  <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                    <Text
                      style={{
                        color: '#444',
                        fontSize: 12,
                        fontWeight: 'bold',
                        marginBottom: 5
                      }}
                    >
                      {business.businessName}
                    </Text>
                    <Text
                      style={{
                        color: '#444',
                        fontSize: 12
                      }}
                    >
                      {business.coupons[0].dealName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity>
            <View
              style={{
                width: 160,
                height: 140,
                marginRight: 10,
                borderColor: '#ccc',
                borderWidth: 1
              }}
            >
              <Image
                style={{ flex: 2, width: null, height: null, resizeMode: 'cover' }}
                source={{ uri: 'https://s3-us-west-1.amazonaws.com/veeh/kyopo-1.jpg' }}
              />
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                <Text
                  style={{
                    color: '#444',
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginBottom: 5
                  }}
                >
                  Super Kyo-po Plaza
                </Text>
                <Text
                  style={{
                    color: '#444',
                    fontSize: 12
                  }}
                >{`coupon.dealName`}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                width: 160,
                height: 140,
                marginRight: 10,
                borderColor: '#ccc',
                borderWidth: 1
              }}
            >
              <Image
                style={{ flex: 2, width: null, height: null, resizeMode: 'cover' }}
                source={{ uri: 'https://s3-us-west-1.amazonaws.com/veeh/kyopo-1.jpg' }}
              />
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                <Text
                  style={{
                    color: '#444',
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginBottom: 5
                  }}
                >
                  Super Kyo-po Plaza
                </Text>
                <Text
                  style={{
                    color: '#444',
                    fontSize: 12
                  }}
                >{`coupon.dealName`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  _renderDetails(type) {
    const business = this.state.business;
    const addressOne = `${business.addressStreet}`;
    const addressTwo = `${business.addressCity}, ${business.addressState} ${
      business.addressZipcode
    }`;
    const website = business.website === '' ? null : business.website;
    const businessHours = `Mon-Thu ${business.hours[0]}, Fri-Sat ${business.hours[1]}, Sun ${
      business.hours[2]
    }`;
    let sponsores = null,
      distance = null;

    if (type === 'nonAdvertiser') {
      sponsores = this._renderSponsores();
    }

    if (this.props.navigation.state.params.data.dist) {
      distance = (
        <Text style={[styles.detailsFont, { fontSize: 12 }]}>{`${
          this.props.navigation.state.params.data.dist.calculated
        }mi`}</Text>
      );
    }

    return (
      <View style={type === 'nonAdvertiser' ? [styles.details, styles.paddingTop] : styles.details}>
        <View style={[styles.detailsContent]}>
          <Text style={[styles.detailsFont, styles.detailsTitle]}>{business.businessName}</Text>
        </View>
        <Tags tags={this.state.business.tags} />
        <Text
          style={[styles.detailsFont, styles.detialsSubtitle, { marginTop: 10, marginBottom: 0 }]}
        >
          Coupons
        </Text>
        <ScrollView style={{ marginBottom: 20 }} horizontal={false}>
          <Coupons
            coupons={business.coupons}
            goToPrevious={this._goToPrevious.bind(this)}
            redirectToCarousel={this._redirectToCarousel.bind(this)}
          />
        </ScrollView>
        <View style={[styles.detailsContent]}>
          <Text style={[styles.detailsFont, styles.detialsSubtitle]}>Business Hours</Text>
          <Text style={styles.detailsFont}>{businessHours}</Text>
        </View>
        <GoogleMap
          handleMapMoal={this._handleMapMoal.bind(this)}
          location={this.state.coordinates}
          title={business.businessName}
        />
        <View style={[styles.detailsContent, styles.addressContainer]}>
          <View style={styles.addressLeft}>
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
            {distance}
          </View>
        </View>
        <View style={{ display: 'flex' }}>
          <BlockMenu icon={'phone'} title={business.phoneNumber} subTitle={'Subtitle'} />
          <BlockMenu icon={'home'} title={business.website} subTitle={'Subtitle'} />
        </View>
        {sponsores}
      </View>
    );
  }

  _renderStickyButton() {
    if (Constants.deviceName.includes('iPhone X')) {
      return (
        <TouchableOpacity
          style={[styles.stickyButtonContainer, { paddingTop: 13 }]}
          onPress={e => this._redirectToCarousel.bind(this)(0)}
        >
          <View style={styles.stickyButton}>
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>
              Use Coupons
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.stickyButtonContainer, { justifyContent: 'center' }]}
          onPress={e => this._redirectToCarousel.bind(this)(0)}
        >
          {/* <View style={styles.stickyButton}> */}
          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>
            Use Coupons
          </Text>
          {/* </View> */}
        </TouchableOpacity>
      );
    }
  }

  render() {
    // if (this.props.navigation.state.params.coupons) {
    //   return <View style={{ flex: 1, backgroundColor: 'white' }} />;
    // }
    let business = this.props.navigation.state.params.data,
      topMenu = null,
      adImage = null,
      details,
      stickyButton = this._renderStickyButton();
    if (this.state.yOffset < 200) {
      topMenu = (
        <View style={styles.topMenu}>
          <TouchableOpacity onPress={this._goToPrevious.bind(this)} style={styles.topMenuOne}>
            <Ionicons name="ios-arrow-back" color={'white'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topMenuTwo}>
            {/* <Ionicons name="ios-share-alt" color={'white'} size={30} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.topMenuThree}>
            {/* <Ionicons name="ios-heart-empty" color={'white'} size={30} /> */}
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
            {this.state.yOffset > 245 ? (
              <Text
                style={{ color: '#444', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}
              >
                {this.state.business.businessName}
              </Text>
            ) : null}
            {/* <Ionicons name="ios-share-alt" color={'#444'} size={30} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.topMenuThree}>
            {/* <Ionicons name="ios-heart-empty" color={'#444'} size={30} /> */}
          </TouchableOpacity>
        </View>
      );
    }

    if (this.state.isModalOpen) {
      if (this.state.modalType !== 'coupons') {
        const business = this.state.business;
        const addressOne = `${business.addressStreet}`;
        const addressTwo = `${business.addressCity}, ${business.addressState} ${
          business.addressZipcode
        }`;

        let distance = null;

        if (this.props.navigation.state.params.data.dist) {
          distance = (
            <Text style={[styles.detailsFont, { fontSize: 12 }]}>{`${
              this.props.navigation.state.params.data.dist.calculated
            }mi`}</Text>
          );
        }

        return (
          <View style={[styles.modalContainer]}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}
            >
              <View
              // style={{ paddingTop: Constants.statusBarHeight }}
              />
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
                  <Text
                    style={{ color: '#444', fontSize: 18, fontWeight: 'bold', paddingLeft: 20 }}
                  >
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
                    <Text
                      style={[styles.detailsFont, { fontWeight: 'bold', paddingBottom: 5 }]}
                    >{`${business.businessName}`}</Text>
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
                    {distance}
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        );
      } else {
        return (
          <View style={styles.modalContainer}>
            <Modal
              animationType="none"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}
            >
              <View style={{ paddingTop: Constants.statusBarHeight }}>
                <View
                  style={
                    Platform.OS === 'ios'
                      ? [styles.topMenuModalIos, { backgroundColor: 'black' }]
                      : styles.topMenuModalAndroid
                  }
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
                    <Ionicons name="ios-arrow-back" color={'white'} size={30} />
                    <Text
                      style={{ color: 'white', fontSize: 18, fontWeight: 'bold', paddingLeft: 20 }}
                    >
                      Location
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        );
      }
    }
    if (this.state.type === 'Advertiser') {
      const uri = this.props.navigation.state.params.data.photos[0];
      adImage = <BackgroundImage uri={uri} goToPrevious={this._goToPrevious.bind(this)} />;

      if (this.state.isLoading) {
        // if (true) {
        details = (
          <View style={[styles.details, styles.ActivityIndicatorContainer]}>
            <ActivityIndicator size="large" color="#f96a00" />
          </View>
        );
      } else {
        details = this._renderDetails();
      }

      return (
        <View style={{ backgroundColor: 'white' }}>
          {topMenu}
          <ScrollView scrollEventThrottle={16} onScroll={e => this._handleScroll(e)}>
            {adImage}
            {details}
          </ScrollView>
          {stickyButton}
        </View>
      );
    } else {
      if (this.state.isLoading) {
        return (
          <View style={[styles.container, styles.ActivityIndicatorContainer]}>
            <ActivityIndicator size="large" color="#f96a00" />
          </View>
        );
      }

      details = this._renderDetails('nonAdvertiser');

      return (
        <View style={{ backgroundColor: 'white' }}>
          <View style={styles.topMenuWhite}>
            <TouchableOpacity onPress={this._goToPrevious.bind(this)} style={styles.topMenuOne}>
              <Ionicons name="ios-arrow-back" color={'#444'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topMenuTwo}>
              {this.state.yOffset > 40 ? (
                <Text
                  style={{ color: '#444', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}
                >
                  {this.state.business.businessName}
                </Text>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity style={styles.topMenuThree}>
              {/* <Ionicons name="ios-heart-empty" color={'#444'} size={30} /> */}
            </TouchableOpacity>
          </View>
          <ScrollView scrollEventThrottle={16} onScroll={e => this._handleScroll(e)}>
            <View style={styles.paddingTop}>{details}</View>
          </ScrollView>
          {stickyButton}
        </View>
      );
    }
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
    // position: 'absolute',
    // top: 44,
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
    // position: 'absolute',
    top: Constants.statusBarHeight,
    zIndex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  details: {
    flex: 1,
    minHeight: height - 250,
    padding: 10,
    backgroundColor: 'white',
    paddingBottom: 100
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
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  topMenuTwo: {
    flex: 2,
    // borderWidth: 1,
    justifyContent: 'center'
    // paddingLeft: 20
  },
  topMenuThree: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  paddingTop: {
    paddingTop: 30
  },
  stickyButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 70,
    backgroundColor: '#f96a00',
    position: 'absolute',
    bottom: 0
  },
  stickyButton: {
    display: 'flex',
    justifyContent: 'center',
    width: 150,
    height: 30,
    color: '#f96a00',
    backgroundColor: '#f96a00',
    borderRadius: 5
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
)(BusinessProfileScreen);
