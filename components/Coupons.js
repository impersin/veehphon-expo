import React from 'react';
import { Image, StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons/';
import BlockMenu from './BlockMenu';

export default class Coupons extends React.Component {
  render() {
    return this.props.coupons.map((coupon, index) => {
      return (
        <View
          key={index}
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
              height: 40,
              flexDirection: 'row'
            }}
            onPress={e => this.props.redirectToCarousel(index)}
          >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {/* <MaterialIcons name="redeem" color="#444" size={20} /> */}
              <Text style={styles.couponFont}>{coupon.dealName}</Text>
            </View>
            <View>
              <AntDesign name="right" color="#444" size={20} />
            </View>
          </TouchableOpacity>
        </View>
        // <TouchableOpacity
        //   key={index}
        //   style={styles.couponWrapper}
        //   onPress={e => this.props.redirectToCarousel(coupon)}
        // >
        //   <View style={{ flex: 2 }}>
        //     <Image
        //       style={{
        //         flex: 1,
        //         width: 300,
        //         height: 190,
        //         resizeMode: 'contain'
        //       }}
        //       source={{ uri: coupon.photoUri }}
        //     />
        //     <AntDesign name="gift" />
        //   </View>
        //   <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        //     <Text style={styles.couponFont}>{coupon.dealName}</Text>
        //   </View>
        // </TouchableOpacity>
      );
    });
  }
}

const styles = StyleSheet.create({
  couponWrapper: {
    // width: 320,
    // height: 280,
    // marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  couponFont: {
    color: '#444',
    fontSize: 14,
    marginLeft: 10
    // fontWeight: 'bold'
  },
  blockWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  blockLeft: {
    flex: 1,
    flexDirection: 'row'
  },
  blockRight: {
    flex: 1,
    flexDirection: 'row'
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 5
  },
  titleContainer: {
    justifyContent: 'center'
  },
  blockFont: {
    color: '#444',
    fontSize: 14
  }
});
