import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableNativeFeedback,
  Modal
} from 'react-native';
import { Card, CardItem } from 'native-base'
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImgViewer from '../components/imgViewer'
import { request } from '../util'
import { addFavorite, delFavorite } from '../store'

// 收藏/取消收藏
const toggleFavoriteHandler = (item) => {
  let collected = item.collected
  item.collected = !collected
  if (item.collected) {
    addFavorite(item)
  } else {
    delFavorite(item)
  }
  return item
}

export default class DetailPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const item = navigation.state.params.item
    const setParams = navigation.setParams
    return {
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: '#00bcd4'
      },
      headerTitleStyle: {
        color: '#fff'
      },
      headerTintColor: '#fff',
      headerRight: <TouchableNativeFeedback onPress={() => {
        let _item =toggleFavoriteHandler(item)
        setParams({ item: _item })
      }}>
        <Icon name="heart" size={20} color={item.collected ? 'pink' : "#fff"} style={{ marginRight: 20 }} />
      </TouchableNativeFeedback>
    }
  };

  state = {
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.pid !== r2.pid }),
    showImgViewer: false
  }
  _list = []
  _number = 0

  toggleImgViewer = (number) => {
    this._number = number || 0
    this.setState({
      showImgViewer: !this.state.showImgViewer
    })
  }

  componentDidMount() {
    const _self = this
    const { id } = this.props.navigation.state.params
    request('http://45.248.69.240:3001/api/inner?id=' + id).then(result => {
      this._list = result.imgLists
      _self.setState({
        dataSource: _self.state.dataSource.cloneWithRows(result.imgLists)
      })
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.container}
          renderRow={(rowData, i, j) => {
            return <TouchableNativeFeedback
              background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
              onPress={this.toggleImgViewer.bind(this, j)} >
              <View style={styles.item}>
                <Card style={{}}>
                  <Image source={{ uri: rowData }} style={styles.img} />
                </Card>
              </View>
            </TouchableNativeFeedback>
          }}
          onEndReached={this.getListByPage}
        />
        <ImgViewer
          visible={this.state.showImgViewer}
          number={Number(this._number)}
          images={this._list}
          onRequestClose={this.toggleImgViewer.bind(this, 0)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  item: {
    width: Dimensions.get('window').width - 20,
    marginTop: 10
  },
  img: {
    width: Dimensions.get('window').width - 20,
    height: 400
  }
})
