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
import { NODE_ENV, URL } from 'react-native-dotenv';
import axios from 'axios';
import Tags from './../components/Tags';

const { height, width } = Dimensions.get('window');

class BusinessListScreen extends React.Component {
  state = {
    address: null,
    location: null,
    errorMessage: null,
    isLoading: true,
    refreshing: false
  };

  componentDidMount() {
    this._initializeData();
  }

  _fetchData() {
    this.setState(
      {
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
      const url = URL + `/businesses?lat=${lat}&lng=${lng}`;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          // console.log('================================================================ 2');
          const businesses = res.data.map(business => {
            business.dist.calculated = (business.dist.calculated * 0.62).toFixed(1);
            return business;
          });
          setTimeout(() => {
            this.setState({
              isLoading: false,
              initialData: businesses,
              refreshing: false
            });
          }, 500);
          // console.log('================================================================ 3');
        })
        .catch(err => {
          // console.log('================================================================ 4');
          console.log(err);
        });
    } else {
      const url = URL + `/businesses`;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          // console.log('================================================================ 2');
          const businesses = res.data;
          console.log(businesses);
          // .map(business => {
          //   business.dist.calculated = (business.dist.calculated * 0.62).toFixed(1);
          //   return business;
          // });
          setTimeout(() => {
            this.setState({
              isLoading: false,
              initialData: businesses,
              refreshing: false
            });
          }, 500);
          // console.log('================================================================ 3');
        })
        .catch(err => {
          // console.log('================================================================ 4');
          console.log(err);
        });
    }
  }

  _keyExtractor = (item, index) => `list-item-${index}`;

  _redirectToProfile(data) {
    this.props.navigation.navigate('BusinessProfile', { data });
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
          <View style={styles.summaryContainer}>
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

    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={this._fetchData.bind(this)}
          refreshing={this.state.refreshing}
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
    width: width,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc'
    // backgroundColor: 'green'
  },
  imgStyle: {
    // flex: 3,
    height: 200,
    width: null,
    resizeMode: 'cover'
  },
  summaryContainer: {
    // flex: 1,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center'
    // backgroundColor: 'red'
    // height: '100%'
  },
  summaryHeader: {
    color: '#444',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
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
    marginTop: 10
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
