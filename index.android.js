/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Linking
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import ListPage from './app/pages/list'
import DetailPage from './app/pages/details'
import FavoritePage from './app/pages/favorite'

const JdlyApp = StackNavigator({
  Home: { screen: ListPage },
  Detail: { screen: DetailPage },
  Favorite: { screen: FavoritePage }
});

const MainApp = () => <JdlyApp uriPrefix='jdly://' />
AppRegistry.registerComponent('demo01', () => MainApp);
