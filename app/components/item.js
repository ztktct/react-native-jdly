import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import { Card, CardItem } from 'native-base'
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class extends Component {
  static propTypes = {
    rowData: PropTypes.any
  }
  render() {
    const {rowData, toggleFavoriteHandler, navigate} = this.props
    return <TouchableNativeFeedback onPress={() => navigate('Detail', {
      title: rowData.title,
      id: rowData.pid,
      item: rowData
    })}
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
      <View style={styles.item}>
        <Card>
          <TouchableNativeFeedback onPress={() => toggleFavoriteHandler(rowData)}
            background={TouchableNativeFeedback.Ripple('#333')}>
            <Icon name="heart" size={16} color={rowData.collected ? 'pink' : "#fff"} style={styles.hertIcon} />
          </TouchableNativeFeedback>
          <Image source={{ uri: rowData.imgSrc }} style={styles.img} />
          <Text numberOfLines={2} style={styles.title}>{rowData.title}</Text>
        </Card>
      </View>
    </TouchableNativeFeedback>
  }
}

const styles = StyleSheet.create({
  item: {
    width: (Dimensions.get('window').width - 20) / 2,
    elevation: 20,
  },
  img: {
    width: (Dimensions.get('window').width - 30) / 2,
    height: 200
  },
  title: {
    width: (Dimensions.get('window').width - 30) / 2,
    fontSize: 12,
    padding: 5
  },
  hertIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 10,
  }
});