import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons/';
import { LinearGradient } from 'expo';

const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';

export default class BackgroundImage extends Component {
  render() {
    const uri = this.props.uri;
    console.log(this.props.uri);
    return (
      <ImageBackground style={styles.background} source={{ uri }}>
        <LinearGradient style={{ height: 400 }} colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)']}>
          <View style={styles.topMenu}>
            <TouchableOpacity onPress={this.props.goToPrevious} style={styles.topMenuOne}>
              <Ionicons name="ios-arrow-back" color={'white'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topMenuTwo}>
              <Ionicons name="ios-share-alt" color={'white'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topMenuThree}>
              <Ionicons name="ios-heart-empty" color={'white'} size={30} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    // backgroundColor: '#ccc',
    // resizeMode: 'center',
    // position: 'absolute',
    // width: '100%',
    height: 400
    // justifyContent: 'center'
  },
  topMenu: {
    display: 'flex',
    // backgroundColor: 'red',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center'
    // alignItems: 'flex-start'
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
  }
});
