import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, WebView } from 'react-native';
import { Ionicons } from '@expo/vector-icons/';

export default class PrivacyPolicy extends React.Component {
  _goToPrevious() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topMenuWhite}>
          <TouchableOpacity onPress={this._goToPrevious.bind(this)} style={styles.topMenuOne}>
            <Ionicons name="ios-arrow-back" color={'#444'} size={30} />
            <Text style={{ color: '#444', fontSize: 18, fontWeight: 'bold', paddingLeft: 20 }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        <WebView source={{ uri: 'https://www.veeh.co/privacy' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  topMenuWhite: {
    display: 'flex',
    alignSelf: 'stretch',
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
  topMenuOne: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20
  }
});
