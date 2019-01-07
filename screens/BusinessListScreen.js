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
import { SecureStore } from 'expo';
import { NODE_ENV, URL } from 'react-native-dotenv';
import axios from 'axios';
import Tags from './../components/Tags';

const { height, width } = Dimensions.get('window');

class BusinessListScreen extends React.Component {
  state = {
    initialData: [],
    address: null,
    location: null,
    errorMessage: null,
    isLoading: true,
    refreshing: false,
    page: 1,
    seed: 1
  };

  async componentDidMount() {
    let business = await SecureStore.getItemAsync('business');
    let coupons = await SecureStore.getItemAsync('coupons');
    let index = await SecureStore.getItemAsync('index');
    if (business && coupons && index) {
      data = JSON.parse(business);
      coupons = JSON.parse(coupons);
      index = JSON.parse(index);
      this.props.navigation.navigate('BusinessProfile', { data, coupons, index });
      await SecureStore.deleteItemAsync('business');
      await SecureStore.deleteItemAsync('coupons');
      await SecureStore.deleteItemAsync('index');
      this._initializeData();
    } else {
      this._initializeData();
    }
  }

  _fetchData() {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this._initializeData();
      }
    );
  }

  _initializeData(auth) {
    if (Object.keys(this.props.screenProps.location).length !== 0) {
      const lat = this.props.screenProps.location.coords.latitude;
      const lng = this.props.screenProps.location.coords.longitude;
      const { page, seed } = this.state;
      const url = process.env.URL + `/businesses?lat=${lat}&lng=${lng}&page=${page}&seed=${seed}`;

      axios
        .get(url)
        .then(res => {
          const businesses = res.data.map(business => {
            business.dist.calculated = (business.dist.calculated * 0.62).toFixed(1);
            return business;
          });
          setTimeout(() => {
            this.setState({
              isLoading: false,
              initialData: [...this.state.initialData, ...businesses],
              refreshing: false
            });
          }, 500);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const url = process.env.URL + `/businesses`;

      axios
        .get(url)
        .then(res => {
          const businesses = res.data;
          setTimeout(() => {
            this.setState({
              isLoading: false,
              initialData: businesses,
              refreshing: false
            });
          }, 500);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  _keyExtractor = (item, index) => `list-item-${index}`;

  _redirectToProfile(data) {
    this.props.navigation.navigate('BusinessProfile', { data });
  }

  _handleLoadMore() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this._initializeData();
      }
    );
  }

  _renderItem = ({ item }) => {
    let adImage = null,
      distance = null;
    if (item.type === 'Advertiser') {
      adImage = <Image style={styles.imgStyle} source={{ uri: item.photos[0] }} />;
    }
    if (item.dist) {
      distance = <Text style={styles.innerText}>{item.dist.calculated}mi</Text>;
    }
    return (
      <TouchableWithoutFeedback id={item.userid} onPress={e => this._redirectToProfile(item)}>
        <View style={item.type === 'Advertiser' ? styles.listContainer : styles.listContainer}>
          {adImage}
          <View
            style={
              item.type === 'Advertiser'
                ? styles.summaryContainer
                : [styles.summaryContainer, { marginTop: 0 }]
            }
          >
            <Text style={styles.summaryHeader}>{`${item.businessName} - ${item.addressCity}, ${
              item.addressState
            }`}</Text>
            <Tags tags={item.tags} />
            <View style={styles.summaryFooter}>
              <View style={styles.footerLeft}>
                <Text>
                  <Text style={styles.innerText}>{`${item.coupons[0].dealName}`}</Text>
                </Text>
              </View>
              <View style={styles.footerRight}>{distance}</View>
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

    console.log(width);
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={this._fetchData.bind(this)}
          refreshing={this.state.refreshing}
          keyExtractor={this._keyExtractor}
          // data={this.props.screenProps.initialData}
          data={this.state.initialData}
          renderItem={this._renderItem}
          // onEndReached={this._handleLoadMore.bind(this)}
          // onEndReachedThreshold={0}
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
    width: width,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingBottom: 0
    // backgroundColor: 'green',
  },
  imgStyle: {
    // flex: 3,
    height: 175,
    width: null,
    resizeMode: 'cover'
  },
  summaryContainer: {
    // flex: 1,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center'
    // backgroundColor: 'red'
    // height: '100%'
  },
  summaryHeader: {
    color: '#444',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  distanceContainer: {
    position: 'absolute',
    right: 0,
    top: -30
  },
  distanceContainerHide: {
    display: 'none'
  },
  distanceFont: {
    color: 'white',
    fontWeight: 'bold'
  },
  distanceFontTwo: {
    fontWeight: 'bold'
  },
  innerText: {
    color: '#444',
    fontWeight: 'bold'
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  summaryFooter: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 0
    // backgroundColor: 'yellow'
  },
  footerLeft: {
    flex: 5
    // backgroundColor: 'red'
  },
  footerRight: {
    flex: 1
    // backgroundColor: 'blue'
  }
});
