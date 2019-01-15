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
        <View
          style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1
          }}
        >
          <TouchableOpacity onPress={this._pressCall.bind(this)} style={styles.blockWrapper}>
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
            <View style={styles.blockRight}>
              <View style={styles.iconContainer}>
                <AntDesign name="right" color="#444" size={20} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.icon === 'home') {
      if (this.props.title === '') {
        return (
          <View opacity={0.5} style={styles.blockWrapperDisabled}>
            <View style={styles.blockLeft}>
              <View style={styles.iconContainer}>
                <AntDesign name={this.props.icon} size={25} color="#444" />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.blockFont}>{`Visit Website`}</Text>
              </View>
            </View>
          </View>
        );
      }
      return (
        <View
          style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1
          }}
        >
          <TouchableOpacity onPress={this._pressHomepage.bind(this)} style={styles.blockWrapper}>
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
            <View style={styles.blockRight}>
              <View style={styles.iconContainer}>
                <AntDesign name="right" color="#444" size={20} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  blockWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 40
  },
  blockWrapperDisabled: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 40
  },
  blockLeft: {
    flex: 1,
    flexDirection: 'row'
  },
  blockRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
