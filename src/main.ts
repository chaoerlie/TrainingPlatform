import  { createApp } from 'vue'
import App from './App.vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//import { useRouter } from 'vue-router';
import router from './router'
import {add} from "xe-utils";
let userInfo={
    username:'',
    password:'',
    myToken:'234',
    test:1
}

let addition={
    classId:1,
    homeworkId:1,
    teachingDate:""
}

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$userInfo = userInfo
app.config.globalProperties.$addition=addition







app.use(ElementPlus)
app.use(router)

const vm= app.use(VXETable).mount('#app')





