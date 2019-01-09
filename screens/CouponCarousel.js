import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons/';
import { Constants } from 'expo';
import Coupons from '../components/Coupons';

const { width } = Dimensions.get('window');
const height = width * 0.8;

export default class Carousel extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.scroller.scrollTo({ x: width * this.props.navigation.state.params.index });
    }, 0);
  }
  _goToPrevious() {
    if (!this.props.navigation.state.params.business) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate(this.props.navigation.state.params.redirectedFrom, {
        data: this.props.navigation.state.params.business
      });
    }
  }
  render() {
    const coupons = this.props.navigation.state.params.coupons;
    if (coupons) {
      return (
        <View style={styles.container}>
          <View style={styles.topMenuWhite}>
            <TouchableOpacity onPress={this._goToPrevious.bind(this)} style={styles.topMenuOne}>
              <Ionicons name="ios-close" color={'white'} size={40} />
              <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 20 }}>
                {/* Coupon */}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <ScrollView
              ref={scroller => {
                this.scroller = scroller;
              }}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {coupons.map((coupon, index) => {
                return (
                  <View key={index} style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                    <View style={{ width, padding: 10, alignItems: 'center' }}>
                      <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>
                        {coupon.dealName}
                      </Text>
                    </View>
                    <Image
                      style={{ width, height, resizeMode: 'contain' }}
                      source={{ uri: coupon.photoUri }}
                    />
                    <View style={{ width, padding: 10 }}>
                      <Text style={{ color: 'white' }}>{coupon.dealDetails}</Text>
                    </View>
                  </View>
                );
              })}
              {/* <View style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                <View style={{ width, padding: 10, alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>
                    {coupon.dealName}
                  </Text>
                </View>
                <Image
                  style={{ width, height, resizeMode: 'contain' }}
                  source={{ uri: coupon.photoUri }}
                />
                <View style={{ width, padding: 10 }}>
                  <Text style={{ color: 'white' }}>{coupon.dealDetails}</Text>
                </View>
              </View> */}
            </ScrollView>
          </View>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'black',
    // alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    paddingTop: 0
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
    backgroundColor: 'black'
  },
  topMenuOne: {
    flex: 1,
    // borderWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  topMenuTwo: {
    flex: 2,
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
  scrollContainer: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'red'
  },
  image: {
    width,
    resizeMode: 'contain'
  }
});
