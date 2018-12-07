import Vue from 'vue'
import dayjs from 'dayjs'
import { callbackify } from 'util';
//制保留2位小数，如：2，会在2后面补上00.即2.00
function toDecimal2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}
/**
 * 
 * @param {数值} num 
 * @param {精确位数} accNum 
 */
function toDecimalAcc(num,accNum){

  return num.toFixed(accNum);
}

// 格式化时间
function dateFormat(date, formatStr='YYYY-MM-DD') {
  if (!date) {
    return ''
  }
  return dayjs(date).format(formatStr);
}

function endTime(val, params) {
  return dayjs(parseInt(val)).add(params, "d");
}

function leftDays(val, params) {
  let nowDate = dayjs();
  let day = dayjs(parseInt(val));
  let du = nowDate.diff(day, "day");
  // console.log(du)
  return params - du;
}

function judgeState(val) {
  let state = '';
  switch (val) {
    case 0:
      state = '审核中';
      break;
    case 1:
      state = '审核通过';
      break;
    case 2:
      state = "审核不通过";
      break;
    default:
      break;
  }
  return state;

}

function judgeLevel(val) {
  let state = '';
  switch (val) {
    case 0:
      state = '1级会员';
      break;
    case 1:
      state = '2级会员';
      break;
    case 2:
      state = "3级会员";
      break;
    default:
      break;
  }
  return state;
}

const filters = {
  toDecimalAcc,
  endTime,
  toDecimal2,
  leftDays,
  dateFormat,
  judgeState,
  judgeLevel
}

export default filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
