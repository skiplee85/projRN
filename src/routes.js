import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Main from './pages/Main'
import Login from './pages/Login'
import px2dp from './util/px2dp';

const defaultRoute = 'App'

const routes = (store) => {
  const mainPage = Main(store)
  const loginPage = Main(store)

  // 单独页面（登录，操作失败等）
  const routesMap = {
    Login: {
      screen: loginPage,
      navigationOptions: {
        title: '登录',
      },
    },
  };

  // 底部Tab
  const TabNav = TabNavigator({
    // 首页页
    Index: {
      screen: mainPage,
      path: '/',
      navigationOptions: {
        title: '首页',
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
        title: '发现',
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
        title: '消息',
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
        title: '我',
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
      inactiveTintColor: '#a9a9a9',
      labelStyle: {
        fontSize: px2dp(12),
        ...Platform.select({
          android: {
            marginTop: 0,
          },
        }),
      },
      tabStyle: {
        paddingTop: px2dp(10)
      },
      style: styles.tabbar,
    }
  });

  const AppNavigator = StackNavigator({
    App: {
      screen: TabNav,
      navigationOptions: {
        headerMode:'float',
      },
    },
    ...routesMap,
  }, {
      initialRouteName: defaultRoute,
      // headerMode: 'none',
    });

  return AppNavigator;
}

const styles = StyleSheet.create({
  tabbar: {
    height: px2dp(49),
    justifyContent: 'center',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        alignItems: 'center',
      },
    }),
  },
});

export default routes
