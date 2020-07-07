// 波斯历转公历方法名称为：persianToGregorian(datetimeValue)
// 公历转波斯历方法名称为：calendarToPersian(datetimeValue)
// datetimeValue的格式为：YYYY-MM-DD hh:mm:ss(2005-11-11 12:12:12)
// ---------------------------------------------------------
//The following variables is applied to Persian calendar convertion
var JULIAN_EPOCH_MILLIS = -210866803200000;
var ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;
var EPOCH = 1948321;

/**********************************************************
函数名称：calendarToPersian
函数说明：公历转换为波斯历
传入参数：datetimeValue:需要进行转换的公历日期值
返回：转换后的日历值
***********************************************************/
function calendarToPersian(datetimeValue) {
  var yearValue = datetimeValue.substring(0, 4); //Year value
  var monthValue = datetimeValue.substring(5, 7) * 1; //Month value
  var dayValue = datetimeValue.substring(8, 10) * 1; //Day value
  monthValue -= 1;
  var persianDate = getPersianDay(yearValue, monthValue, dayValue);
  persianDate.month += 1;
  persianDate.month = persianDate.month.toString().length == 1 ? "0" + persianDate.month : persianDate.month;
  persianDate.day = persianDate.day.toString().length == 1 ? "0" + persianDate.day : persianDate.day;

  return persianDate.year + "-" + persianDate.month + "-" + persianDate.day + " " + datetimeValue.substring(11, datetimeValue.length);
}
/**********************************************************
函数名称：persianToGregorian
函数说明：转换波斯历为公历
传入参数：datetimeValue:需要进行转换的波斯历日期值
返回：转换后的日历值
***********************************************************/
function persianToGregorian(datetimeValue) {
  var persiaYear = datetimeValue.substring(0, 4) * 1; //Year value
  var persiaMonth = datetimeValue.substring(5, 7) * 1; //Month value
  var persiaDay = datetimeValue.substring(8, 10) * 1; //Day value
  persiaMonth -= 1;
  var julianDay = setJulianDay(pj(persiaYear > 0 ? persiaYear : persiaYear + 1, persiaMonth, persiaDay));
  julianDay.month = julianDay.month.toString().length == 1 ? "0" + julianDay.month : julianDay.month;
  julianDay.day = julianDay.day.toString().length == 1 ? "0" + julianDay.day : julianDay.day;
  return julianDay.year + "-" + julianDay.month + "-" + julianDay.day + " " + datetimeValue.substring(11, datetimeValue.length);
}
/**********************************************************
函数名称：getPersianDay
函数说明：根据输入的日期获得Persia日期值
传入参数：year,month,day
返回：转换后的日历值
***********************************************************/
function getPersianDay(year, month, day) {
  var julianDay = getJulianDay(year, month, day);
  var r = jp(julianDay);
  var y1 = y(r);
  var m1 = m(r);
  var d1 = d(r);
  y1 = y1 > 0 ? y1 : y1 - 1;
  var persiaDate = new Object();
  persiaDate.year = y1;
  persiaDate.month = m1;
  persiaDate.day = d1;
  return persiaDate;
}
/**********************************************************
函数名称：getJulianDay
函数说明：根据输入的日期获得公历日期值
传入参数：year,month,day
返回：转换后的日历值
***********************************************************/
function getJulianDay(year, month, day) {
  return div(new Date(year, month, day, 8, 1, 1) - JULIAN_EPOCH_MILLIS, ONE_DAY_MILLIS);
}
/**********************************************************
函数名称：setJulianDay
函数说明：根据输入的日期获得公历日期值
传入参数：julianDay
返回：转换后的日历值
***********************************************************/
function setJulianDay(julianDay) {
  var current = new Date();
  var year = current.getFullYear();
  var month = current.getMonth() + 1;
  var day = current.getDate();

  var datetimevalue = JULIAN_EPOCH_MILLIS + julianDay * ONE_DAY_MILLIS + mod(new Date(year, month, day, 8, 1, 1) - JULIAN_EPOCH_MILLIS, ONE_DAY_MILLIS);
  current = new Date(datetimevalue);
  var julianDate = new Object();
  julianDate.year = current.getFullYear();
  julianDate.month = eval(current.getMonth() + 1);
  julianDate.day = current.getDate();
  return julianDate;
}
/**********************************************************
函数名称：jp
函数说明：公历转换为波斯历
传入参数：julianDay
返回：转换后的日历值
***********************************************************/
function jp(j) {
  var a = j - pj(475, 0, 1);
  var b = div(a, 1029983);
  var c = mod(a, 1029983);
  var d = c != 1029982 ? div(2816 * c + 1031337, 1028522) : 2820;
  var year = 474 + 2820 * b + d;
  var f = (1 + j) - pj(year, 0, 1);
  var month = f > 186 ? Math.ceil((f - 6) / 30) - 1 : Math.ceil(f / 31) - 1;
  var day = j - (pj(year, month, 1) - 1);
  return (year << 16) | (month << 8) | day;
}
/**********************************************************
函数名称：pj
函数说明：波斯历转换为公历
传入参数：y,m,d
返回：转换后的日历值
***********************************************************/
function pj(y, m, d) {
  var a = y - 474;
  var b = mod(a, 2820) + 474;
  return (EPOCH - 1) + 1029983 * div(a, 2820) + 365 * (b - 1) + div(682 * b - 110, 2816) + (m > 6 ? 30 * m + 6 : 31 * m) + d;
}

function div(a, b) {
  return Math.floor(a / b);
}

function mod(a, b) {
  return (a - b * Math.floor(a / b));
}

function y(r) {
  return r >> 16;
}

function m(r) {
  return (r & 0xff00) >> 8;
}

function d(r) {
  return (r & 0xff);
}

export {
  calendarToPersian,
  persianToGregorian,
  getJulianDay
}