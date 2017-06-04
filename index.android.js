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

const DemoApp = StackNavigator({
  Home: { screen: ListPage },
  Detail: { screen: DetailPage }
});

AppRegistry.registerComponent('demo01', () => DemoApp);
