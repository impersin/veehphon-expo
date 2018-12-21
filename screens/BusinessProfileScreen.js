import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons/';
import { MapView } from 'expo';
import axios from 'axios';
import BackgroundImage from './../components/BackgroundImage';
import GoogleMap from './../components/GoogleMap';
import Tags from './../components/Tags';
import { NODE_ENV } from 'react-native-dotenv';

class BusinessProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home'
  // };
  state = {
    isLoading: true,
    yOffset: 0,
    type: this.props.navigation.state.params.data.type,
    coordinates: this.props.navigation.state.params.data.coordinates,
    dist: this.props.navigation.state.params.data.dist.calculated
  };

  componentDidMount() {
    const id = this.props.navigation.state.params.data.id,
      dist = this.props.navigation.state.params.data.dist.calculated;
    const url =
      NODE_ENV === 'localhost'
        ? `http://10.0.0.166:3000/api/business?id=${id}`
        : `https://veeh-coupon.herokuapp.com/api/businesse?id=${id}`;

    axios.get(url).then(res => {
      const business = res.data;
      business.dist = dist;
      setTimeout(() => {
        this.setState({
          business,
          isLoading: false
        });
      }, 1000);
    });
  }

  _goToPrevious() {
    this.props.navigation.goBack();
  }

  _handleScroll(e) {
    const nativeEvent = e.nativeEvent;
    const yOffset = nativeEvent.contentOffset.y;
    this.setState({
      yOffset
    });
  }

  _renderDetails() {
    const business = this.state.business;
    const address = `${business.addressStreet}, ${business.addressCity}, ${business.addressState} ${
      business.addressZipcode
    }`;
    const website = business.website === '' ? null : business.website;
    const businessHours = `Mon-Thu ${business.hours[0]}, Fri-Sat ${business.hours[1]}, Sun ${
      business.hours[2]
    }`;
    return (
      <View>
        <Text>{business.businessName}</Text>
        <Text>{`${address}`}</Text>
        <Text>Business Hours</Text>
        <Text>{businessHours}</Text>
        <Text>{business.phoneNumber}</Text>
        <Text>{website}</Text>
        <Text>{`${this.state.dist}mi`}</Text>
        <Text>{`Details page`}</Text>
        <Tags tags={this.state.business.tags} />
        <Text>{`Deal ${this.state.business.coupons[0].dealName}`}</Text>
        <Text>{`Deal details`}</Text>
        <Text>{business.businessName}</Text>
        <Text>{`${address}`}</Text>
        <Text>Business Hours</Text>
        <Text>{businessHours}</Text>
        <Text>{business.phoneNumber}</Text>
        <Text>{website}</Text>
        <Text>{`${this.state.dist}mi`}</Text>
        <Text>{`Details page`}</Text>
        <Tags tags={this.state.business.tags} />
        <Text>{`Deal ${this.state.business.coupons[0].dealName}`}</Text>
        <Text>{`Deal details`}</Text>
      </View>
    );
  }
  render() {
    let business = this.props.navigation.state.params.data,
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
    if (this.state.type === 'Advertiser') {
      const uri = this.props.navigation.state.params.data.photos[0];
      adImage = <BackgroundImage uri={uri} goToPrevious={this._goToPrevious.bind(this)} />;

      if (this.state.isLoading) {
        details = (
          <View style={[styles.details, styles.ActivityIndicatorContainer]}>
            <ActivityIndicator size="large" color="#f96a00" />
          </View>
        );
      } else {
        details = this._renderDetails();
      }

      return (
        <View>
          {topMenu}
          <ScrollView scrollEventThrottle={16} onScroll={e => this._handleScroll(e)}>
            {adImage}
            <View style={styles.details}>{details}</View>
            <GoogleMap location={this.state.coordinates} />
          </ScrollView>
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
      details = this._renderDetails();
      return (
        <View>
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
          <ScrollView scrollEventThrottle={16} onScroll={e => this._handleScroll(e)}>
            {adImage}
            <View style={[styles.details, styles.paddingTop]}>
              <View style={styles.detailsContainer} />
              {details}
            </View>
            <GoogleMap location={this.state.coordinates} />
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#ecf0f1'
  },
  ActivityIndicatorContainer: { alignItems: 'center', justifyContent: 'center' },
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
    // borderBottomWidth: 1,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowColor: 'black'
    // shadowOffset: { height: 0, width: 0 }
  },
  details: {
    flex: 1,
    minHeight: 400,
    padding: 20,
    // justifyContent: 'center'
    // alignSelf: 'stretch',
    backgroundColor: 'white'
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
    paddingTop: 70
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
