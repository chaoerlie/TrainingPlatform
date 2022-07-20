<template>
<!--  <el-radio-group v-model="role" >-->
<!--    <el-radio-button label="manager">Left</el-radio-button>-->
<!--    <el-radio-button label="teacher">Right</el-radio-button>-->
<!--    <el-radio-button label="top">Top</el-radio-button>-->
<!--  </el-radio-group>-->
  <div  class="body">
  <div style="height: 670px;display: flex;justify-content: center;align-items: center;flex-direction: column">
<div style="margin-top: 20px">
  <div style="flex-direction: column; text-align: center;margin: 20px;display: flex;justify-content: center;align-items: center" >
    <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        style="width: 300px"
    >
      <el-form-item label="用户名" class="item">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="密码" class="item">
        <el-input type="password" v-model="formLabelAlign.password" />
      </el-form-item>
    </el-form>
    <div style="margin-top:8px;width: 80%; flex-direction: row;justify-content: space-around;display: flex">
      <el-button @click="submit" style="width: 80px" type="primary" >
        <div style="height: 100%;display: flex;align-items: center;justify-content: center;text-align: center">
          登录
        </div>
      </el-button>
      <el-button @click="submit" style="width: 80px" type="primary">注册</el-button>
    </div>

  </div>
</div>
  </div>
  </div>
</template>

<script>

import axios from "axios";
import {apiGetUserInfo} from "../apis/user";
import router from "../router";

export default {
  data(){
    return{
      hys:8,
      labelPosition : ('right'),
      role:'teacher',
      formLabelAlign:{
        name: '1001',
        password: 'kkkzoz',
      }
    }
  },
  methods:{
    cl(){
      console.log(this.formLabelAlign.name)
    },
    click(){
      this.hys++
    },
    submit(){
      apiGetUserInfo({
        username:this.formLabelAlign.name,
        password:this.formLabelAlign.password
      }).then((res) => {
        console.log(res)
        localStorage.setItem('token',res.data.token)
        console.log(localStorage.getItem('token'))
        axios.get('api/v1/user/role')
            .then(function (response) {
              console.log(response)
                  console.log(response.data.data);
                  if(response.data.data=='ROLE_ADMIN')
                  {
                    router.push('/admin/member')
                  }
                  if(response.data.data=='ROLE_ENGINEER')
                  {
                    router.push('/engineer/groupInfo')
                  }
                 if(response.data.data=='ROLE_TEACHER')
                 {
                    router.push('/teacher/leave')
                 }
                  if(response.data.data=='ROLE_STUDENT'){
                    router.push('/student/index')
                  }
                  if(response.data.data=='ROLE_MANAGER'){
                    router.push('/student/index')
                  }

                }
            )
            .catch(function(error) { // 请求失败处理
              console.log(error);
            });
      })

    },
    submit2(){
      console.log(this.$userInfo.test)
      this.$userInfo.test=this.$userInfo.test+1,
          console.log(this.$userInfo.test)
    }
  }


}

</script>

<style>

.body
{
  background-image:url('https://s1.ax1x.com/2022/07/19/jTgI3V.jpg');
  background-repeat: no-repeat;
  height: 100%;
  background-size: 100% 100%;
}
.item .el-form-item__label{
  color:#FFFFFF;
  font-weight:500;
  font-size:15px
}

</style>
