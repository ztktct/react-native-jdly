import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity
} from 'react-native';
import { Card, CardItem } from 'native-base'
import Dimensions from 'Dimensions';
import { request } from '../util'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.pid !== r2.pid });
export default class ListPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'JDLY',
        headerStyle: {
            backgroundColor: '#00bcd4'
        },
        headerTitleStyle:{
            color: '#fff'
        }
    });
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds
        }
        this._list = []
        this._page = 0
        this._isLoading = false
    }
    getListByPage = async () => {
        if (this._isLoading) return
        this._page++
        this._isLoading = true
        const list = await request('http://45.248.69.240:3001/api/index?page=' + this._page)
        this._list = this._list.concat(list)
        this.setState({
            dataSource: ds.cloneWithRows(this._list)
        })
        this._isLoading = false
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
                    renderRow={(rowData) => (
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigate('Detail', {
                            title: rowData.title,
                            id: rowData.pid
                        })}>
                            <View style={styles.item}>
                                <Card>
                                    <Image source={{ uri: rowData.imgSrc }} style={styles.img} />
                                    <Text numberOfLines={2} style={styles.title}>{rowData.title}</Text>
                                </Card>
                            </View>
                        </TouchableOpacity>
                    )}
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
    },
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
    }
});
