import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons/';

const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';

export default class BackgroundImage extends Component {
  render() {
    const uri = this.props.uri;
    console.log(this.props.uri);
    return (
      <ImageBackground style={styles.background} source={{ uri }}>
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
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
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
