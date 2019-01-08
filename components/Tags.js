import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons/';

export default class Tags extends React.Component {
  render() {
    return (
      <View style={styles.tagsWrapper}>
        {/* <View>
          <Ionicons name="ios-pricetags" size={25} color="#f96a00" />
        </View> */}
        <View style={styles.tagsContainer}>
          {this.props.tags.map((tag, index) => {
            return (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagFont}>{tag}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'yellow',
    width: '90%'
  },
  tag: {
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: '#00abd3',
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    // borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#00abd3'
  },
  tagFont: {
    fontSize: 12,
    color: '#00abd3',
    fontWeight: 'bold'
  }
});
