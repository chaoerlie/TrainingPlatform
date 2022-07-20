<template>
  <el-container class="layout-container-demo" style="height: 100%" >
    <el-aside width="180px" >
      <el-image
          style="width: 100%; height: 9%;margin-bottom: -5px"
          :src="url"
          :fit="fit"></el-image>
      <el-alert
          title="导航栏"
          type="info"
          :closable="false"
          style="height: 4%;"
      >
      </el-alert>
      <el-scrollbar style="height: 87%;">
        <el-menu>
          <el-menu-item index="1" @click="index"><el-icon><HomeFilled /></el-icon>个人主页</el-menu-item>
          <el-menu-item index="2" @click="teachingPlan"><el-icon><Document /></el-icon>教学计划</el-menu-item>
          <el-menu-item index="3" @click="project"><el-icon><Notification /></el-icon>项目信息</el-menu-item>
          <el-menu-item index="4" @click="leave"><el-icon><ChatLineRound /></el-icon>请假系统</el-menu-item>
          <el-menu-item index="5" @click="info"><el-icon><User /></el-icon>个人信息</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px;">
        <div class="toolbar" style="text-align: right; font-size: 12px">

          <el-dropdown>
            <el-icon><Menu /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看资料</el-dropdown-item>
                <el-dropdown-item @click="login">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>设置</span>
        </div>
      </el-header>

      <el-main style="height: 650px">
        <el-scrollbar style="height: 100%">
          <router-view/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from "../../router";
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      url:'https://s1.ax1x.com/2022/07/19/jT7pFS.png'
    }
  },
  methods:{
    login(){
      router.push('/')
    },
    index(){
      router.push('index')
    },
    info(){
      router.push('myInfo')
    },
    teachingPlan(){
      router.push('teachingPlan')
    },
    project(){
      router.push('project')
    },
    leave(){
      router.push('leave')
    }

  }

};
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
