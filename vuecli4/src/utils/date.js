

let formatDate = (time, fmt) => {
  if (!time) return '--';
  let date = new Date(time);
  return fd(date, fmt || 'yyyy-MM-dd hh:mm:ss');
}

function fd(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
// 时间格式 ‘MM-dd hh:mm’
let MDHMtime = (time, fmt) => {
  if (!time) return '';
  let date = new Date(time);
  return fd(date, fmt || 'MM-dd hh:mm');
}



/**
 * 昨天 今天 明天
 * dates: 不传或0今日, -1昨日，1明日
 * 返回一天开始时间
 */
let GetDates = (dates) => {
  let date = new Date();
  let n = dates || 0;
  date.setDate(date.getDate() + n);
  return new Date(new Date(date.toLocaleDateString()).getTime());
}

/**
 * 本周
 */
let GetWeeks = () => {
  var date=new Date();    
  var s=new Date(date-(date.getDay()-1)*86400000);
  var e=new Date((s/1000+6*86400)*1000);
  return [s, e]
}

  export {
    formatDate,
    MDHMtime,
    GetDates,
    GetWeeks
  }