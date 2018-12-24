import React from 'react';
import { Image, StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons/';

export default class Coupons extends React.Component {
  render() {
    return this.props.coupons.map((coupon, index) => {
      return (
        // <View key={index} style={styles.couponWrapper}>
        <TouchableOpacity
          key={index}
          style={styles.couponWrapper}
          onPress={e => this.props.redirectToCarousel(coupon)}
        >
          <View style={{ flex: 2 }}>
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'cover'
              }}
              source={{ uri: coupon.photoUri }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
            <Text style={styles.couponFont}>{coupon.dealName}</Text>
          </View>
        </TouchableOpacity>
        // </View>
      );
    });
  }
}

const styles = StyleSheet.create({
  couponWrapper: {
    height: 140,
    width: 150,
    marginRight: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  couponFont: {
    color: '#444',
    fontSize: 14
  }
});
