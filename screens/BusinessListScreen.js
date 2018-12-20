import React from 'react';
import { connect } from 'react-redux';
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
import axios from 'axios';
import { NODE_ENV } from 'react-native-dotenv';
import Tags from './../components/Tags';

const { height, width } = Dimensions.get('window');

class BusinessListScreen extends React.Component {
  state = {
    address: null,
    location: null,
    errorMessage: null,
    isLoading: true
  };

  componentDidMount() {
    this._initializeData();
  }

  _initializeData(auth) {
    const lat = this.props.screenProps.location.coords.latitude;
    const lng = this.props.screenProps.location.coords.longitude;

    const url =
      NODE_ENV === 'localhost'
        ? `http://192.168.0.107:3000/api/businesses?lat=${lat}&lng=${lng}`
        : 'https://veeh-coupon.herokuapp.com/api/businesses';
    axios
      .get(url)
      .then(res => {
        const businesses = res.data.map(business => {
          return (business.dist.calculated = (business.dist.calculated * 0.62).toFixed(1));
        });
        console.log(businesses);
        setTimeout(() => {
          this.setState({
            isLoading: false,
            initialData: res.data
          });
        }, 500);
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
          <Image style={styles.imgStyle} source={{ uri: item.photos[0] }} />
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryHeader}>{`${item.businessName} - ${item.addressCity}, ${
              item.addressState
            }`}</Text>
            <Tags tags={item.tags} />
            <Text>
              Deal: <Text style={styles.innerText}>{`${item.coupons[0].deal}`}</Text>
            </Text>
            <View style={styles.distanceContainer}>
              <Text style={styles.distanceFont}>{item.dist.calculated}mi</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    let text = 'Waiting..';
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
          // data={this.props.screenProps.initialData}
          data={this.state.initialData}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: status => {
      dispatch({ type: 'AUTH', payload: status });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  listContainer: {
    width: width
    // backgroundColor: 'green'
  },
  imgStyle: {
    // flex: 3,
    height: 250,
    width: null,
    resizeMode: 'cover'
  },
  summaryContainer: {
    // flex: 1,
    margin: 10,
    marginBottom: 20,
    justifyContent: 'center'
    // backgroundColor: 'red'
    // height: '100%'
  },
  summaryHeader: { color: '#444', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  circles: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  distanceContainer: {
    position: 'absolute',
    right: 0,
    top: -30
  },
  distanceFont: {
    color: 'white',
    fontWeight: 'bold'
  },
  innerText: {
    color: '#444',
    fontWeight: 'bold'
  }
});
