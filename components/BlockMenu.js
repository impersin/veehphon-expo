import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons/';

export default class BlockMenu extends React.Component {
  _openHomepage = () => {
    Linking.openURL('https://www.veeh.co');
  };

  _pressCall = () => {
    Linking.openURL('tel:+123456789');
  };

  render() {
    if (this.props.icon === 'phone') {
      return (
        <View style={styles.blockWrapper}>
          <View style={styles.blockLeft}>
            <View style={styles.iconContainer}>
              <AntDesign name={this.props.icon} size={25} color="#444" />
            </View>
            <View style={styles.titleContainer}>
              <Text onPress={this._pressCall} style={styles.blockFont}>
                {this.props.title}
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (this.props.icon === 'home') {
      return (
        <View style={styles.blockWrapper}>
          <View style={styles.blockLeft}>
            <View style={styles.iconContainer}>
              <AntDesign name={this.props.icon} size={25} color="#444" />
            </View>
            <View style={styles.titleContainer}>
              <Text onPress={this._openHomepage} style={styles.blockFont}>
                {this.props.title}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
  // render() {
  //   let homepage = null;
  //   if (this.props.title.length > 0) {
  //     homepage = (
  //       <View style={styles.blockRight}>
  //         <View style={styles.iconContainer}>
  //           <AntDesign name={this.props.icon[1]} size={25} color="#444" />
  //         </View>
  //         <View style={styles.titleContainer}>
  //           <Text style={styles.blockFont}>{this.props.title[1]}</Text>
  //         </View>
  //       </View>
  //     );
  //   }
  //   return (
  //     <View style={styles.blockWrapper}>
  //       <View style={styles.blockLeft}>
  //         <View style={styles.iconContainer}>
  //           <AntDesign name={this.props.icon[0]} size={25} color="#444" />
  //         </View>
  //         <View style={styles.titleContainer}>
  //           <Text style={styles.blockFont}>{this.props.title[0]}</Text>
  //         </View>
  //       </View>
  //       {homepage}
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  blockWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 25,
    marginBottom: 10
  },
  blockLeft: {
    flex: 2,
    flexDirection: 'row'
  },
  blockRight: {
    flex: 3,
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
