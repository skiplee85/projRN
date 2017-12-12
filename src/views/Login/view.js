import React, { Component } from 'react';
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

  login = (name, pwd) => {
    const { userLogin } = this.props
    console.log(name, pwd)
    userLogin(name, pwd)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.login.bind(this, 'test123456', '123456')}
          title='login'
        />
      </View>
    );
  }
}

export default Main;
