import React from 'react';
import { Image, StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';

export default class Coupons extends React.Component {
  render() {
    return this.props.coupons.map((coupon, index) => {
      return (
        <TouchableOpacity key={index}>
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
    });
  }
}

const styles = StyleSheet.create({
  couponWrapper: {
    width: 160,
    height: 140,
    marginRight: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  couponFont: {
    color: '#444',
    fontSize: 12,
    fontWeight: 'bold'
  }
});
