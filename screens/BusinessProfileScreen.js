import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, ScrollView, View, Button } from 'react-native';
import { MapView } from 'expo';
import BackgroundImage from './../components/BackgroundImage';

class BusinessProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home'
  // };
  _goToPrevious() {
    this.props.navigation.goBack();
  }
  render() {
    let uri = this.props.navigation.state.params.data.businessImage[0];
    return (
      <View style={styles.container}>
        <View style={styles.topMenu}>
          <BackgroundImage uri={uri} goToPrevious={this._goToPrevious.bind(this)} />
        </View>
        <View style={styles.main}>
          <Text>Main contents</Text>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />
        </View>
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
  topMenu: { flex: 3, alignSelf: 'stretch', backgroundColor: 'yellow' },
  main: {
    flex: 2
    // alignSelf: 'stretch',
    // backgroundColor: 'blue'
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
