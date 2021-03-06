import Vue from 'vue'
import {
  Button,
  Icon,
  Picker,
  Search,
  Step,
  Steps,
  DatetimePicker,
  Popup,
  Stepper,
  Lazyload,
  RadioGroup,
  Loading ,
  Radio,
  Swipe,
  Tag,
  Tab,
  Tabs,
  SwipeItem,
  Slider,
  NumberKeyboard,
  Panel,
  Toast,
  Dialog,
  Uploader,
  Tabbar,
  TabbarItem,
  Field,
  Cell,
  CellGroup,
  Collapse, CollapseItem,
  Sku,
  Checkbox, CheckboxGroup,
  Rate
} from 'vant'
import '~/vant-css/lib/index.css';
// import 'vant/lib/vant-css/index.css'

Vue
  .use(Button)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Icon)
  .use(Tag)
  .use(Rate)
  .use(Step)
  .use(Steps)
  .use(Sku)
  .use(RadioGroup)
  .use(CollapseItem)
  .use(Collapse)
  .use(Radio)
  .use(Tab)
  .use(Loading)
  .use(Picker)
  .use(Tabs)
  .use(Popup)
  .use(Stepper)
  .use(Search)
  .use(DatetimePicker)
  .use(Lazyload, {
    loading: '/loading.gif',
    error: '/loading-error.png',
    attempt: 1
  })
  .use(Swipe)
  .use(SwipeItem)
  .use(Slider)
  .use(Toast)
  .use(Uploader)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Panel)
  .use(Field)
  .use(Cell)
  .use(NumberKeyboard)
  .use(CellGroup)
  .use(Dialog);
Vue.prototype.$loading = () => {
  return Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    message: '加载中'
  });
}
Vue.prototype.$alert = (message,title="提醒")=>{
  return Dialog.alert({
    title,
    message
  })
}
