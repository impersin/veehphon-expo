import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Button } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons/';
import { MapView } from 'expo';
import BackgroundImage from './../components/BackgroundImage';
import GoogleMap from './../components/GoogleMap';

class BusinessProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home'
  // };
  state = {
    yOffset: 0
  };
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
  render() {
    let uri = this.props.navigation.state.params.data.businessImage[0];
    let topMenu;
    if (this.state.yOffset !== 0 && this.state.yOffset > 330) {
      topMenu = null;
    } else {
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
    }
    return (
      <View>
        {topMenu}
        <ScrollView scrollEventThrottle={16} onScroll={e => this._handleScroll(e)}>
          <BackgroundImage uri={uri} goToPrevious={this._goToPrevious.bind(this)} />
          <View style={styles.description}>
            <Text>Business description</Text>
          </View>
          <GoogleMap />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#ecf0f1'
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
  description: {
    flex: 1,
    minHeight: 400,
    padding: 20
    // alignSelf: 'stretch',
    // backgroundColor: 'blue'
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
