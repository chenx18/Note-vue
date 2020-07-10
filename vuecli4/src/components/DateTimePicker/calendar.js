/*
Jalali (Shamsi) Calendar Date Picker Version 1.00 (JavaScript)
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Written By : Amin Habibi Shahri
E-mail : habibiamin@gmail.com
Homepage: http://habibiamin.googlepages.com
*/

/*  Modulus function which works for non-integers.  */

function mod(a, b) {
    return a - (b * Math.floor(a / b));
}

function jwday(j) {
    return mod(Math.floor((j + 1.5)), 7);
}

var Weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

// Is a given year in the Gregorian calendar a leap year ?

function leap_gregorian(year) {
    return ((year % 4) == 0) && (!(((year % 100) == 0) && ((year % 400) != 0)));
}

// Determine Julian day number from Gregorian calendar date

var GREGORIAN_EPOCH = 1721425.5;

function gregorian_to_jd(year, month, day) {
    return (GREGORIAN_EPOCH - 1) +
        (365 * (year - 1)) +
        Math.floor((year - 1) / 4) +
        (-Math.floor((year - 1) / 100)) +
        Math.floor((year - 1) / 400) +
        Math.floor((((367 * month) - 362) / 12) +
        ((month <= 2) ? 0 :
            (leap_gregorian(year) ? -1 : -2)
        ) +
        day);
}

// Calculate Gregorian calendar date from Julian day

function jd_to_gregorian(jd) {
    var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,yindex, year, yearday, leapadj;
    wjd = Math.floor(jd - 0.5) + 0.5;
    depoch = wjd - GREGORIAN_EPOCH;
    quadricent = Math.floor(depoch / 146097);
    dqc = mod(depoch, 146097);
    cent = Math.floor(dqc / 36524);
    dcent = mod(dqc, 36524);
    quad = Math.floor(dcent / 1461);
    dquad = mod(dcent, 1461);
    yindex = Math.floor(dquad / 365);
    year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
    if (!((cent == 4) || (yindex == 4))) {
        year++;
    }
    yearday = wjd - gregorian_to_jd(year, 1, 1);
    leapadj = ((wjd < gregorian_to_jd(year, 3, 1)) ? 0 :
        (leap_gregorian(year) ? 1 : 2)
    );
    var month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
    var day = (wjd - gregorian_to_jd(year, month, 1)) + 1;

    return new Array(year, month, day);
}

// Is a given year a leap year in the Persian calendar ?
// 在波斯历法中，某一年是闰年吗？

function leap_persian(year) {
    return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
}

// Determine Julian day from Persian date

var PERSIAN_EPOCH = 1948320.5;
var PERSIAN_WEEKDAYS = ["دوشنبه", "یکشنبه","چهارشنبه", "سه شنبه","شنبه", "جمعه", "پنج شنبه"];

function persian_to_jd(year, month, day) {
    var epbase, epyear;
    epbase = year - ((year >= 0) ? 474 : 473);
    epyear = 474 + mod(epbase, 2820);
    return day + ((month <= 7) ?
        ((month - 1) * 31) :
        (((month - 1) * 30) + 6)) +
        Math.floor(((epyear * 682) - 110) / 2816) + (epyear - 1) * 365 +
        Math.floor(epbase / 2820) * 1029983 + (PERSIAN_EPOCH - 1);
}

// Calculate Persian date from Julian day

function jd_to_persian(jd) {
    var year, month, day, depoch, cycle, cyear, ycycle,aux1, aux2, yday;
    jd = Math.floor(jd) + 0.5;
    depoch = jd - persian_to_jd(475, 1, 1);
    cycle = Math.floor(depoch / 1029983);
    cyear = mod(depoch, 1029983);
    if (cyear == 1029982) {
        ycycle = 2820;
    } else {
        aux1 = Math.floor(cyear / 366);
        aux2 = mod(cyear, 366);
        ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) + aux1 + 1;
    }
    year = ycycle + (2820 * cycle) + 474;
    if (year <= 0) {
        year--;
    }
    yday = (jd - persian_to_jd(year, 1, 1)) + 1;
    month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
    day = (jd - persian_to_jd(year, month, 1)) + 1;
    return new Array(year, month, day);
}

// 波斯日历转公历
//تاریخ میلادی برمیگرداند
function calcPersian(year, month, day) {
    var date, j;
    j = persian_to_jd(year, month, day);
    date = jd_to_gregorian(j);
    var weekday = jwday(j);
    return new Array(date[0], date[1], date[2], weekday);
}

// Perform calculation starting with a Gregorian date
// 公历 转 波斯日历
//تاریخ شمسی را بر می گرداند
function calcGregorian(year, month, day) {
    month--;
    var j, weekday;
    //  Update Julian day
    j = gregorian_to_jd(year, month + 1, day) +
        (Math.floor(0 + 60 * (0 + 60 * 0) + 0.5) / 86400.0);
    //  Update Persian Calendar
    var perscal = jd_to_persian(j);
    weekday = jwday(j);
    return new Array(perscal[0], perscal[1], perscal[2], weekday);
}

// 当前公历-年月日周（[2020, 7, 9, 4]）
const getTodayGregorian = (val) => {
    var t = val? new Date(val):new Date();
    var y = t.getYear();
    if (y < 1000) y += 1900;
    return [y, t.getMonth() + 1, t.getDate(), t.getHours(), t.getMinutes(), t.getDay()];
}

// 当前波斯日历
const GetTodayCalendarInPersian = (val) => {
    var t = val? new Date(val):new Date();
    var today = getTodayGregorian(val);
    var persian = calcGregorian(today[0], today[1], today[2]);
    var obj = {
        year: persian[0],
        month:persian[1], 
        date: persian[2], 
        hour: t.getHours(), 
        minute: t.getMinutes(), 
        day: t.getDay() 
    }
    return obj;
}

export {
  GetTodayCalendarInPersian,
  getTodayGregorian,
  leap_persian,
  calcPersian
}
