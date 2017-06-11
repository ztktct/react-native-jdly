import {
    AsyncStorage
} from 'react-native'

const FAVORITE_LIST = 'my_favorites'

// 获取收藏
export const getFavorite = async function () {
    try {
        const result = await AsyncStorage.getItem(FAVORITE_LIST)
        return JSON.parse(result) || []
    } catch (e) {
        console.warn('get favorite filed because of ', e)
        return []
    }
}

// 收藏列表
let favoriteList = []
getFavorite().then(result => {
    favoriteList = result
})

// 收藏
export const addFavorite = async function (item) {
    const hasAlready = favoriteList.find(fa => +fa.pid === +item.pid)
    if (!hasAlready) {
        favoriteList.push(item)
        await AsyncStorage.setItem(FAVORITE_LIST, JSON.stringify(favoriteList))
    }
    return favoriteList
}

// 取消收藏
export const delFavorite = async function (item) {
    const hasAlready = favoriteList.findIndex(fa => +fa.pid === +item.pid)
    if (hasAlready !== -1) {
        favoriteList.splice(hasAlready, 1)
        await AsyncStorage.setItem(FAVORITE_LIST, JSON.stringify(favoriteList))
    }
    return favoriteList
}
