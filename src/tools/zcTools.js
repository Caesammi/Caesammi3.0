// storage-start

export const setSession = (key, value) => {
  sessionStorage.setItem(key, value)
}

export const getSession = (key) => {
  return sessionStorage.getItem(key) || ''
}

export const removeSession = (key) => {
  return sessionStorage.removeItem(key)
}

export const setLocal = (key, value) => {
  localStorage.setItem(key, value)
}

export const getLocal = (key) => {
  return localStorage.getItem(key) || ''
}

export const removeLocal = (key) => {
  return localStorage.removeItem(key)
}
// storage-end

// 数组对象搜索
export const zcJsonSearch = (arr, key, keyword) => {
  let zcResult = arr.filter((item) => {
    return item[key] === keyword
  })
  if (zcResult[0]) {
    return zcResult
  } else {
    return '无匹配'
  }
}

// 模糊搜索
export const zcFuzzyQuery = (value, key, keyword) => {
  let reg = new RegExp(keyword, 'i'); // i不区分大小写
  let arr = [];
  let index = [];
  if (value[key]) {
    for (let i = 0; i < value.length; i++) {
      if (reg.test(value[i][key])) {
        arr.push(value[i]);
        index.push(i);
      }
    }
  } else {
    return 'error';
  }
  return {arr: arr, index: index};
};

// 翻转字符串
export const zcStringReverse = (value) => {
  return value.split('').reverse().join('')
}

// get拼接字符串
export const zcQs = (url, value) => {
  let param = value
  let query = ''
  Object.keys(param).forEach((item, index) => {
      query += `${index === 0 ? '?' : '&'}${item}=${param[item]}`
  })
  return `${url}${query}`
}

// 判断IOS安卓
export const zcMobileDevice = () => {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    return 'android'
  }
  if (isiOS) {
    return 'ios'
  }
}

// 数组对象排序
export const zcJsonCompare = (value, key) => {
    value.sort((a,b)=>{
      let x1 = a[key];
      let x2 = b[key];
      if (x1 < x2) {
        return -1;
      }
      if (x1 > x2) {
        return 1;
      }
      return 0;
    })
}

// 数字排序
export const zcNumberCompare = (value) => {
  let myCompare = function(a, b) {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
    return 0
  }
    value.sort(myCompare)
}

//汉字排序
export const zcChSort = (arr) => {
  arr.sort((a,b)=>a.localeCompare(b))
}

//忽略大小写排序
export const ignoreUpperSort = (arr) => {
  arr.sort((a, b)=> {
    let x1 = a.toUpperCase();
    let x2 = b.toUpperCase();
    if (x1 < x2) {
      return -1;
    }
    if (x1 > x2) {
      return 1;
    }
    return 0;
  }); // ['apple', 'Google', 'Microsoft']
}

// JSON 数字属性求和
export const zcJsonSum = (value, key) => {
  let preArr = [];
  value.forEach((a, i, n) => {
    preArr.push(n[i][key]);
  });
  return preArr.reduce((prev, cur) => {
    return prev + cur;
  });
};

// 数组去重
export const zcQuchong = (value) => {
  return [...new Set(value)]
}

// 获取时间范围内所有日期数组

export const zcDateArr = (begin, end) => {
  let datetimeparse = (timestamp, format, prefix) => {
    if (typeof timestamp === 'string') {
      timestamp = Number(timestamp)
    }
    // 转换时区
    let currentZoneTime = new Date(timestamp)
    let currentTimestamp = currentZoneTime.getTime()
    let offsetZone = currentZoneTime.getTimezoneOffset() / 60 // 如果offsetZone>0是西区，西区晚
    let offset = null
    // 客户端时间与服务器时间保持一致，固定北京时间东八区。
    offset = offsetZone + 8
    currentTimestamp = currentTimestamp + offset * 3600 * 1000

    let newtimestamp = null
    if (currentTimestamp) {
      if (currentTimestamp.toString().length === 13) {
        newtimestamp = currentTimestamp.toString()
      } else if (currentTimestamp.toString().length === 10) {
        newtimestamp = currentTimestamp + '000'
      } else {
        newtimestamp = null
      }
    } else {
      newtimestamp = null
    }
    let dateobj = newtimestamp ? new Date(parseInt(newtimestamp)) : new Date()
    let YYYY = dateobj.getFullYear()
    let MM = dateobj.getMonth() > 8 ? dateobj.getMonth() + 1 : '0' + (dateobj.getMonth() + 1)
    let DD = dateobj.getDate() > 9 ? dateobj.getDate() : '0' + dateobj.getDate()
    let HH = dateobj.getHours() > 9 ? dateobj.getHours() : '0' + dateobj.getHours()
    let mm = dateobj.getMinutes() > 9 ? dateobj.getMinutes() : '0' + dateobj.getMinutes()
    let ss = dateobj.getSeconds() > 9 ? dateobj.getSeconds() : '0' + dateobj.getSeconds()
    let output = ''
    let separator = '/'
    if (format) {
      separator = format.match(/-/) ? '-' : '/'
      output += format.match(/yy/i) ? YYYY : ''
      output += format.match(/MM/) ? (output.length ? separator : '') + MM : ''
      output += format.match(/dd/i) ? (output.length ? separator : '') + DD : ''
      output += format.match(/hh/i) ? (output.length ? ' ' : '') + HH : ''
      output += format.match(/mm/) ? (output.length ? ':' : '') + mm : ''
      output += format.match(/ss/i) ? (output.length ? ':' : '') + ss : ''
    } else {
      output += YYYY + separator + MM + separator + DD
    }
    output = prefix ? (prefix + output) : output

    return newtimestamp ? output : ''
  }
  let arr1 = begin.split('-')
  let arr2 = end.split('-')
  let arr1_ = new Date()
  let arrTime = []
  arr1_.setUTCFullYear(arr1[0], arr1[1] - 1, arr1[2])
  let arr2_ = new Date()
  arr2_.setUTCFullYear(arr2[0], arr2[1] - 1, arr2[2])
  let unixDb = arr1_.getTime()
  let unixDe = arr2_.getTime()
  for (let k = unixDb; k <= unixDe;) {
    arrTime.push(datetimeparse(k, 'yyyy-MM-DD'))
    k = k + 24 * 60 * 60 * 1000
  }
  console.log(arrTime)
  return arrTime
}

// 返回指定范围内的随机整数
export const uniform = (lo, hi) => {
  return Math.floor(Math.random() * (hi - lo) + lo)
}

// 清空对象
export const zcClearObj = (value) => {
  // eslint-disable-next-line no-return-assign
  // Object.keys(value).forEach((key) => value[key] = '')
  for(let i in value){
    value[i]=''
  }
}
export function parseTime(time, cFormat) {
  if (!time) return false
  if (arguments.length === 0) {
    return false
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    if (('' + time).length === 8 && ('' + time).indexOf('-') === -1 && ('' + time).indexOf('/') === -1) {
      time = time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6, 8)
    }

    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
export function zcGetDate(pastHour, format) {
  if (!format) {
    format = 'yyyy-MM-dd'
  }
  // eslint-disable-next-line no-extend-native
  Date.prototype.Format = function(fmt) {
    let o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      // eslint-disable-next-line eqeqeq
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }
  if (pastHour) {
    // 获取之前的时间
    return new Date(new Date().getTime() - pastHour * 60 * 60 * 1000).Format(format)
  } else {
    return new Date(new Date().getTime()).Format(format)
  }
}

/**
 * 获取传入时间一周的数据
 */
export const zcGetWeek = (date, pastHour, isDay) => {
  if (!isTrue(isDay)) {
    isDay = false
  }
  // eslint-disable-next-line no-extend-native
  Date.prototype.Format = function(fmt) {
    let o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      // eslint-disable-next-line eqeqeq
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }
  if (isDay) {
    return new Date(Date.parse(new Date(date)) + pastHour * 60 * 60 * 1000).Format('yyyy-MM-dd')
  } else {
    return new Date(Date.parse(new Date(date)) + pastHour * 60 * 60 * 1000).Format('yyyy-MM-dd 00:00:00')
  }
}

/**
 * 获取周一的日期
 */
export function getFirstDayOfWeek(date, isDay) {
  if (!isTrue(isDay)) {
    isDay = false
  }
  let weekday = date.getDay() || 7 // 获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
  date.setDate(date.getDate() - weekday + 1)// 往前算（weekday-1）天，年份、月份会自动变化
  if (isDay) {
    return parseTime(date, '{y}-{m}-{d}')
  } else {
    return parseTime(date, '{y}-{m}-{d}') + ' 00:00:00'
  }
}

/**
 * 下载方法
 */
export const fileDownLoad = (url) => {
  let downloadElement = document.createElement('a')
  downloadElement.href = url
  downloadElement.target = '_blank' // 创建
  downloadElement.download = url.substring(url.lastIndexOf('/') + 1, url.length) // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
}


// 时间戳转换成日期
export const timestempToTime = (value) => {
  let date = new Date(value) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + ' ' + h + m + s
}

// 检测是否是null 或 undefined
export const zcUndefined = (value) => {
  return !(value === undefined || value === null)
}

// 深拷贝
export const copy = (obj) => {
  let res = obj.constructor === Array ? [] : {}
  for (const [k, v] of Object.entries(obj)) { // 解构对象键值对
    res[k] = typeof v === 'object' ? copy(v) : v
  }
  return res
}
// 判断回文
export const isPalindrome = (s) => {
  let n = s.length
  for (let i = 0; i < n / 2; i++) { // 循环字符串长度的一半
          //chartAt(i)返回第i个字符
    if (s.charAt(i) !== s.charAt(n - 1 - i)) { // 判断首尾字符是否相等
      return false // 不等返回false
    }
  }
  return true // 全部相等返回true
}

// 判断文件类型
export const getFileType = (fullName) => {
  let dot = fullName.indexOf('.')
  let fileName = fullName.substr(0, dot)
  let fileType = fullName.substr(dot + 1, fullName.length)
  return {
    fileName: fileName,
    fileType: fileType
  }
}

// 打乱一个数组
export const shuffle = (arr) => {
  let n = arr.length
  for(let i = 0; i < n; i++){
    let r = i +  Math.floor(Math.random() * (n - i))
    let temp = arr[i]
    arr[i] = arr[r]
    arr[r] = temp
  }
}

// ----------------------抛硬币第一天-------------------------------
// 返回按照指定几率 返回true/false (抛硬币)
export const RandomBernoulli = (key) => {
  if (typeof key === "number" && key >= 0 && key <= 1) {
    return Math.random() >= key  // Math.Random() 方法中随即返回0-1之间的小数，若超过则返回true 否则返回false
  } else {
    return '无效值'
  }
}

// 计数器类
export class Counter {
  count = 0

  constructor(name) {
    this.name = name
  }

  increment = () => {
    this.count++
  }
  tally = () => {
    return this.count
  }
  toString = () => {
    return this.count.toString()
  }
}

//抛硬币类
export class Flips {
  constructor(name) {
    this.name = name
  }

  main(args) {
    let T = parseInt(args[0])
    let heads = new Counter('heads')
    let tails = new Counter('tails')
    for (let t = 0; t < T; t++) {
      if (RandomBernoulli(0.5)) {
        heads.increment()
      } else {
        tails.increment()
      }
    }
    let d = heads.tally() - tails.tally()
    return {
      heads: heads,
      tails: tails,
      delta: Math.abs(d) //绝对值
    }
  }
}

// ------------------------抛硬币第二天--------------------------------
export const FlipMax = (x, y) => {
  let xt = x.tally()
  let yt = y.tally()
  if (xt > yt) return {
    name: x.name,
    xTally: xt,
    yTally: yt
  }
  else return {
    name: y.name,
    xTally: xt,
    yTally: yt
  }
}

// 猜正反
export class FlipWin {
  constructor(name) {
    this.name = name
  }
  main(arr) {
    let T = parseInt(arr[0])
    let heads = new Counter('heads')
    let tails = new Counter('tails')
    for (let t = 0; t < T; t++) {
      if (RandomBernoulli(0.5)) { // 如果返回为true 正面加1
        heads.increment()
      } else {
        tails.increment()
      }
    }
    if (heads.tally() === tails.tally()) {
      return {
        name: 'Both',
        xTally: T / 2,
        yTally: T / 2
      }
    } else {
      return FlipMax(heads, tails)
    }
  }
}

// -------------抛硬币的第二天开始了掷色子。。。----------
export class Rolls {
  constructor(name) {
    this.name = name
  }
  main(arr) {
    let T = arr[0] // 摇色子的次数
    let SIDES = 6 // 定义六个面
    let rolls = [] // 装筛子面次数的容器
    for (let i = 0; i <= SIDES; i++) {
      rolls.push(new Counter('Side' + i)) // 将6个面的计数器对象填入数组中
    }
    for (let t = 0; t < T; t++) {
      let result = Math.random()*SIDES+1 //从1-6中随机取一个key
      rolls[result].increment() //摇到了面对应的面+1
    }
    let result = [] // 声明结果
    for (let i = 1; i <= SIDES; i++) {
      result.push(rolls[i]) // 将rolls拷贝到结果中
    }
    return result // 返回结果
  }
}
// ------------------抽象数据类型学习第三天-------------------------


// ---------------------reduce-----------------------
// 计算数组中每一个元素出现的次数
export const arrCount = (arr) => {
  return arr.reduce((prev,cur)=>{
    if(cur in prev){ //如果当前项在前一项中，前一项增加1
      prev[cur]++
    }else{
      prev[cur] = 1
    }
    return prev // {key: number} 该返回值为一个数组值次数统计的结构
  },{})
}

//对象数组去重
export const objArrDuplicate = (arr, key) => {
  let newObj = {};
  arr = arr.reduce((preVal, curVal) => {
    newObj[curVal[key]] ? '' : newObj[curVal[key]] = preVal.push(curVal);
    return preVal
  }, [])
  return arr
}

// 对象数组分类
export const objArrGroupBy = (objArr, keyWord) => {
  return objArr.reduce((acc, cur) => {
    let key = cur[keyWord]
    if (!acc[key]) {
      acc[key] = [] // 初始化返回值
    }
    acc[key].push(cur)
    return acc // 每次迭代都将相同的值 push进相同的属性中
  }, {})
}

// 数组对象中的数组合并(不去重)
export const objArrMerge = (objArr, keyWord) => {
  return objArr.reduce((prev,cur)=>{
    return [...prev, ...cur[keyWord]]
  },[])
}

// 数组去重
export const arrDuplicate = (arr) => {
  return arr.reduce((prev, cur)=>{
    if(prev.indexOf(cur) === -1) {
      prev.push(cur)
    }
    return prev
  },[])
}
