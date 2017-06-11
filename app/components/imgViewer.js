import React, { Component } from 'react';
import {
    Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer'

export default class ImgViewer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const imgList = this.props.images.map(img => {
            return { url: img }
        })
        return (
            <Modal visible={this.props.visible}
                transparent={true}
                onRequestClose={this.props.onRequestClose}
                animationType='fade'>
                <ImageViewer index={this.props.number} imageUrls={imgList} />
            </Modal>
        )
    }
}