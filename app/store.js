import {
    AsyncStorage
} from 'react-native'

import { observable, action } from 'mobx' 

const FAVORITE_LIST = 'my_favorites'

class Store {
    // 收藏列表
    @observable favoriteList = []

    constructor(){
        // 初始化收藏列表
        this.getFavorite().then(result => {
            this.favoriteList = result
        })
    }

    // 获取收藏
    @action getFavorite = async function () {
        try {
            const result = await AsyncStorage.getItem(FAVORITE_LIST)
            return JSON.parse(result) || []
        } catch (e) {
            console.warn('get favorite filed because of ', e)
            return []
        }
    }

    // 收藏
    @action addFavorite = async function (item) {
        const hasAlready = this.favoriteList.find(fa => +fa.pid === +item.pid)
        if (!hasAlready) {
            this.favoriteList.push(item)
            await AsyncStorage.setItem(FAVORITE_LIST, JSON.stringify(this.favoriteList))
        }
        return this.favoriteList
    }
    
    // 取消收藏
    @action delFavorite = async function (item) {
        const hasAlready = this.favoriteList.findIndex(fa => +fa.pid === +item.pid)
        if (hasAlready !== -1) {
            this.favoriteList.splice(hasAlready, 1)
            await AsyncStorage.setItem(FAVORITE_LIST, JSON.stringify(this.favoriteList))
        }
        return this.favoriteList
    }
}

export default new Store()