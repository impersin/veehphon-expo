import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { MapView } from 'expo';

export default class Map extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 500);
  }

  render() {
    const latitude = this.props.location[1];
    const longitude = this.props.location[0];
    if (this.props.type === 'modal') {
      return (
        <MapView
          style={[styles.map, { flex: 6 }]}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0421
          }}
          scrollEnabled={true}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{ latitude, longitude }}
            title={this.props.title}
            description={''}
          />
        </MapView>
      );
    }
    if (this.state.isLoading) {
      return (
        <View style={styles.ActivityIndicatorContainer}>
          <ActivityIndicator size="large" color="#f96a00" />
        </View>
      );
    }
    return (
      <MapView
        onPress={this.props.handleMapMoal}
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421
        }}
        scrollEnabled={false}
        showsUserLocation={true}
      >
        <MapView.Marker
          coordinate={{ latitude, longitude }}
          title={this.props.title}
          description={''}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 200
  },
  ActivityIndicatorContainer: {
    display: 'flex',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});
