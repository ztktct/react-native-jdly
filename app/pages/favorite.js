import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import {toJS} from 'mobx';
import Icon from 'react-native-vector-icons/FontAwesome';
import { request } from '../util'
import store from '../store'
import RowItem from '../components/item'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.pid !== r2.pid });
export default class ListPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '收藏',
      headerStyle: {
        backgroundColor: '#00bcd4'
      },
      gesturesEnabled: true,
      headerTitleStyle: {
        color: '#fff'
      },
      headerTintColor: '#fff'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds  // 用于listView渲染的数据
    }
  }

  cancelFavoriteHandler = (item) => {
    store.delFavorite(item).then(res => {
      this.setState({
        dataSource: ds.cloneWithRows(toJS(res))
      })
    })
  }

  componentDidMount() {
    this.setState({
      dataSource: ds.cloneWithRows(toJS(store.favoriteList))
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrap}>
        <ListView
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.container}
          renderRow={(rowData) => <RowItem
            rowData={rowData}
            navigate={navigate}
            toggleFavoriteHandler={this.cancelFavoriteHandler} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 5
  }
});
