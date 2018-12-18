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
    errorMessage: null
    // isLoading: true
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
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.container}>
    //       <ActivityIndicator size="large" color="#f96a00" />
    //     </View>
    //   );
    // }

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.props.screenProps.initialData}
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
