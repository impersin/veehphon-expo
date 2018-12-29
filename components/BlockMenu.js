import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons/';

export default class BlockMenu extends React.Component {
  _pressHomepage = () => {
    // Linking.openURL(`http://${this.props.title}`);
    Linking.openURL(`http://www.veeh.co`);
  };

  _pressCall = () => {
    Linking.openURL(`tel:+${this.props.title}`);
  };

  render() {
    if (this.props.icon === 'phone') {
      const areaCode = this.props.title.slice(0, 3);
      const middleNumber = this.props.title.slice(3, 6);
      const lastNumber = this.props.title.slice(6);
      return (
        <TouchableOpacity style={styles.blockWrapper}>
          <View style={styles.blockLeft}>
            <View style={styles.iconContainer}>
              <AntDesign name={this.props.icon} size={25} color="#444" />
            </View>
            <View style={styles.titleContainer}>
              <Text onPress={this._pressCall} style={styles.blockFont}>
                {`Call (${areaCode})${middleNumber}-${lastNumber}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (this.props.icon === 'home') {
      if (this.props.title === '') {
        return null;
      }
      return (
        <TouchableOpacity style={styles.blockWrapper}>
          <View style={styles.blockLeft}>
            <View style={styles.iconContainer}>
              <AntDesign name={this.props.icon} size={25} color="#444" />
            </View>
            <View style={styles.titleContainer}>
              <Text onPress={this._pressHomepage} style={styles.blockFont}>
                {`Visit Website`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  blockWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  blockLeft: {
    flex: 1,
    flexDirection: 'row'
  },
  blockRight: {
    flex: 1,
    flexDirection: 'row'
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: 5
  },
  titleContainer: {
    justifyContent: 'center'
  },
  blockFont: {
    color: '#444',
    fontSize: 14
  }
});
