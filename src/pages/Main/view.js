import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Main extends Component {

  constructor(props) {
    super(props);
  }

  jumpLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <Ionicons
          name='ios-home'
          size={26}
        />
        <Button
          onPress={this.jumpLogin}
          title='jump'
        />
      </View>
    );
  }
}

export default Main;
