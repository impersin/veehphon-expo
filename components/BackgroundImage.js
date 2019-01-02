import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons/';
import { LinearGradient } from 'expo';

const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';

export default class BackgroundImage extends Component {
  render() {
    const uri = this.props.uri;
    return (
      <ImageBackground style={styles.background} source={{ uri }}>
        <LinearGradient style={{ height: 250 }} colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)']} />
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
    height: 250
    // justifyContent: 'center'
  }
});
