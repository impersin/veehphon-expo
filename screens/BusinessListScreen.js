import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Constants, Location, Permissions } from 'expo';
import { NODE_ENV } from 'react-native-dotenv';

const { height, width } = Dimensions.get('window');

export default class BusinessListScreen extends React.Component {
  state = {
    address: null,
    location: null,
    errorMessage: null,
    data: [],
    isLoading: true
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidMount() {
    const url =
      NODE_ENV === 'localhost'
        ? 'http://10.0.0.166:3000/api/businesses'
        : 'http://veeh-coupon.herokuapp.com/api/businesses';
    // console.log(url);
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({
          data
        });
        // console.log(data);
        setTimeout(() => {
          this.setState({
            isLoading: false
          });
        }, 1000);
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      maximumAge: 1000
    });
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
    this.setState({ location, address });
  };

  _keyExtractor = (item, index) => `list-item-${index}`;

  _redirectToProfile(data) {
    this.props.navigation.navigate('BusinessProfile', { data });
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback id={item.userid} onPress={e => this._redirectToProfile(item)}>
        <View style={styles.listContainer}>
          <Image style={styles.imgStyle} source={{ uri: item.businessImage[0] }} />
          <Text style={styles.businessTitle}>{item.businessName}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    let text = 'Waiting..';
    // console.log(this.state);
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#f96a00" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.data}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  listContainer: { width: width, height: height / 3 },
  imgStyle: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover'
  },
  businessTitle: { fontSize: 24 },
  circles: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
