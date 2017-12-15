import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Main from './views/Main'
import Login from './views/Login'
import px2dp from './util/px2dp';

const defaultRoute = 'App'

const routes = (store) => {
  const mainPage = Main(store)
  const loginPage = Main(store)

  // 单独页面（登录，操作失败等）
  const routesMap = {
    Login: {
      screen: loginPage,
    },
  };

  // 底部Tab
  const TabNav = TabNavigator({
    // 首页页
    Index: {
      screen: mainPage,
      path: '/',
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={px2dp(22)}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Found: {
      screen: mainPage,
      path: '/profile',
      navigationOptions: {
        tabBarLabel: '发现',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-compass' : 'ios-compass-outline'}
            size={px2dp(22)}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Msg: {
      screen: mainPage,
      path: '/profile',
      navigationOptions: {
        tabBarLabel: '消息',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-notifications' : 'ios-notifications-outline'}
            size={px2dp(22)}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Profile: {
      screen: mainPage,
      path: '/profile',
      navigationOptions: {
        tabBarLabel: '我',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={px2dp(22)}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  }, {
    initialRouteName: 'Index',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'rgb(22,131,251)',
      inactiveTintColor:'#a9a9a9',
      labelStyle: {
        fontSize: px2dp(12),
        marginTop: 0,
      },
      style: styles.tabbar,
    }
  });

  const AppNavigator = StackNavigator({
    App: {
      screen: TabNav,
    },
    ...routesMap,
  }, {
    initialRouteName: defaultRoute,
    headerMode: 'none',
  });

  return AppNavigator;
}

const styles = StyleSheet.create({
  tabbar: {
    height: px2dp(60),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default routes
