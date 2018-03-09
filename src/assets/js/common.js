/**
 * Created by sunjinjin on 2017/8/31.
 */
export function urlToObj () { // https://www.baidu.com/baidu?tn=monline_3_dg&ie=utf-8&wd=window.location.search+%E5%8F%96%E5%8F%82%E6%95%B0
  let paramsArr = window.location.search.substr(1).split('&') // ['tn=monline_3_dg', 'ie=utf-8', 'wd=window.location.search+%E5%8F%96%E5%8F%82%E6%95%B0']
  let obj = {}
  paramsArr.forEach((item) => {
    let arr = item.split('=')
    let key = decodeURIComponent(arr[0])
    let val = decodeURIComponent(arr[1])
    obj[key] = val
  })
  return obj
}
