/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ListPage from './app/pages/list'
import DetailPage from './app/pages/details'
import FavoritePage from './app/pages/favorite'

const DemoApp = StackNavigator({
  Home: { screen: ListPage },
  Detail: { screen: DetailPage },
  Favorite: { screen: FavoritePage }
});

AppRegistry.registerComponent('demo01', () => DemoApp);
