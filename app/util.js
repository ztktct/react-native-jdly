
export const request = async function (url, data = {}) {
  try{
    const resp = await fetch(url)
    return await resp.json()
  }catch(e){
    console.log(e)
  }
}

export const getQueryParam = (url) => {
  // 获取URL中?之后的字符
  var queryString = url.split('?')[1];
  str = queryString ? queryString : '';

  // 以&分隔字符串
  var arr = str.split("&");
  var obj = new Object();

  // 将每一个数组元素以=分隔并赋给obj对象    
  for (var i = 0; i < arr.length; i++) {
    var tmp_arr = arr[i].split("=");
    obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
  }
  return obj;
}