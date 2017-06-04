import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer'
export default class ImgViewer extends Component {
    render(){
        const imgList = this.props.navigation.state.params.images.map(img => {
            return { url: img }
        })
        return (
            <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={imgList}/>
            </Modal>
        )
    }
}
