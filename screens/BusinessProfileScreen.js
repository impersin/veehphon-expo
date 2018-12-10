import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

let option;

// if (platform.OS === 'ios') {
//   option = {
//     title: 'Home'
//   };
// } else {
//   option = {
//     title: 'Home',
//     header: null
//   };
// }

class BusinessProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home'
  // };
  componentWillMount() {
    // console.log(this.props.navigation);
  }
  _goToPrevious() {
    this.props.navigation.goBack();
  }
  render() {
    // console.log(this.props.navigation.state.params.data);
    console.log('Business profile props', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.topMenu}>
          <Text onPress={e => this._goToPrevious()}>Top menu</Text>
        </View>
        <View style={styles.main}>
          <Text>Business Profile Page</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  topMenu: { flex: 1, alignSelf: 'stretch', backgroundColor: 'yellow' },
  main: {
    flex: 11,
    alignSelf: 'stretch',
    backgroundColor: 'blue'
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  login: target => {
    dispatch({ type: 'AUTH', payload: target });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessProfileScreen);
