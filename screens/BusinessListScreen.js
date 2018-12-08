import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Constants } from 'expo';
import axios from 'axios';
import { NODE_ENV } from 'react-native-dotenv';
import * as Progress from 'react-native-progress';
import tempData from '../mockdata.json';

const { height, width } = Dimensions.get('window');

export default class BusinessListScreen extends React.Component {
  state = {
    data: [],
    isLoading: true
  };

  componentWillMount() {}

  componentDidMount() {
    const url =
      NODE_ENV === 'localhost'
        ? 'http://192.168.86.243:3000/api/businesses'
        : 'https://veeh-coupon.herokuapp.com/api/businesses';
    console.log(url);
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({
          data
        });
        console.log(data);
        setTimeout(() => {
          this.setState({
            isLoading: false
          });
        }, 1000);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

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
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight
  },
  listContainer: { width: width, height: height / 3, marginTop: 20 },
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
