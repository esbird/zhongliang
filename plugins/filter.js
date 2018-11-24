import Vue from 'vue'
import dayjs from 'dayjs'
export function dateFormat (date,formatStr) {
  
  return dayjs(date).format(formatStr);
}
function judgeState(val){
  let state ='';
  switch(val){
    case 0:
      state ='审核中';
      break;
    case 1:
      state ='审核通过';
      break;
    case 2:
      state="审核不通过";
      break;
    default:
      break;
  }
  return state;

}
function judgeLevel(val){
  let state ='';
  switch(val){
    case 0:
      state ='1级会员';
      break;
    case 1:
      state ='2级会员';
      break;
    case 2:
      state="3级会员";
      break;
    default:
      break;
  }
  return state;
}

const filters = {
  dateFormat,
  judgeState,
  judgeLevel
}

export default filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})