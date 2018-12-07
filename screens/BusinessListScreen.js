import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Constants } from 'expo';
import tempData from '../mockdata.json';

const { height, width } = Dimensions.get('window');

export default class BusinessListScreen extends React.Component {
  state = {
    data: tempData
  };

  componentWillMount() {}

  componentDidMount() {
    const url = 'https://picsum.photos/list';
    // fetch(url)
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({
    //       data: tempData
    //     });
    //   })
    //   .catch(error => {
    //     console.log(err);
    //   });
  }

  _keyExtractor = (item, index) => `list-item-${index}`;

  _redirectToProfile(data) {
    this.props.navigation.navigate('BusinessProfile', { data });
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        id={item.id}
        style={styles.listContainer}
        onPress={e => this._redirectToProfile(item)}
      >
        <Image
          style={styles.imgStyle}
          source={{ uri: 'https://s3-us-west-1.amazonaws.com/veeh/kp-oak01.jpg' }}
        />
        <Text style={styles.businessTitle}>{item.business_name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
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
  listContainer: { width: width, height: height / 4, marginTop: 20 },
  imgStyle: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover'
  },
  businessTitle: { fontSize: 24 }
});
