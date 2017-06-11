import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableNativeFeedback,
  RefreshControl
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { request } from '../util'
import { getFavorite, addFavorite, delFavorite } from '../store'
import RowItem from '../components/item'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.pid !== r2.pid });
export default class ListPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const navigate = navigation.navigate
    return {
      title: 'JDLY',
      headerStyle: {
        backgroundColor: '#00bcd4'
      },
      headerTitleStyle: {
        color: '#fff'
      },
      headerRight: <TouchableNativeFeedback onPress={() => navigate('Favorite')}>
        <Icon name="heart" size={20} color="#fff" style={{ marginRight: 20 }} />
      </TouchableNativeFeedback>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds,  // 用于listView渲染的数据
      refreshing: false
    }
    this._list = [] // 存储获取到的数据
    this._page = 0  // 当前页
    this._isLoading = false // 正在加载

  }

  // 获取列表
  getListByPage = async (isRefresh = false) => {
    const _favorites = await getFavorite()
    if (this._isLoading) return
    if (isRefresh === true) {
      this._page = 1
      this.setState({ refreshing: true })
    } else {
      this._page++
    }
    this._isLoading = true
    const list = await request('http://45.248.69.240:3001/api/index?page=' + this._page)
    list.forEach(li => {
      let hasIndex = _favorites.findIndex(fa => +fa.pid === +li.pid)
      if (hasIndex !== -1) {
        li.collected = true
      }
    })
    if (isRefresh === true) {
      this._list = list
      this.setState({
        refreshing: false
      })
    } else {
      this._list = this._list.concat(list)
    }
    this.setState({
      dataSource: ds.cloneWithRows(this._list)
    })
    this._isLoading = false
  }

  toggleFavoriteHandler = (item) => {
    const current = this._list.find(li => +li.pid === +item.pid)
    const collected = current.collected
    current.collected = !collected
    this.setState({
      dataSource: ds.cloneWithRows(this._list)
    })
    if (current.collected) {
      addFavorite(item)
    } else {
      delFavorite(item)
    }
  }

  componentDidMount() {
    this.getListByPage()
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrap}>
        <ListView
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.getListByPage(true)}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#fff']}
              progressBackgroundColor="pink"
            />
          }
          renderRow={(rowData) => <RowItem
            rowData={rowData}
            navigate={navigate}
            toggleFavoriteHandler={this.toggleFavoriteHandler} />}
          onEndReachedThreshold={68}
          onEndReached={this.getListByPage}
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
