import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import "element-ui/lib/theme-chalk/index.css"

// 插件和全局对象设置
Vue.use(ElementUI);//注册ElementUI插件
//把axios设置为所有vue组件实例的成员属性，以后可以使用this.$axios使用异步请求
Vue.prototype.$axios= axios;
Vue.config.productionTip = false

// 创建全局过滤器
Vue.filter("date",(val)=>{
  //把bigint转换为yyyy-mm-dd
  // 创建日期对象
  var date=new Date(val);
  // 获取年月日
  var yy=date.getFullYear();
  var mm=date.getMonth()+1;
  mm = mm>9?mm:"0"+mm;
  var dd=date.getDate();
  dd = dd>9?dd:"0"+dd;
  return yy+"-"+mm+"-"+dd;
})
Vue.filter("datetime",(val)=>{
  //把bigint转换为yyyy-mm-dd hh:mm:ss
  //把bigint转换为yyyy-mm-dd
  // 创建日期对象
  var date=new Date(val);
  // 获取年月日
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  var h=date.getHours();
  var mi=date.getMinutes();
  var s=date.getSeconds();
  // 拼接字符串
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  h<10&&(h="0"+h);
  mi<10&&(mi="0"+mi);
  s<10&&(s="0"+s);

  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})
Vue.filter("currency",(val)=>{
  //把int转换为￥xx.yy
  return "￥"+val.toFixed(2);
})
Vue.filter("tableStatus",(val)=>{
  if(val==1) return "空闲";
  else if(val==2) return "预定";
  else if(val==3) return "占用";
  else return "其他";
})





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
