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
    if (this.state.isLoading) {
      return (
        <View style={styles.ActivityIndicatorContainer}>
          <ActivityIndicator size="large" color="#f96a00" />
        </View>
      );
    }
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={'marker.title'}
          description={'desss'}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: { height: 300 },
  ActivityIndicatorContainer: {
    display: 'flex',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});
