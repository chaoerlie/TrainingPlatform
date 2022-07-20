<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu >
          <el-menu-item index="1">个人主页</el-menu-item>
          <el-menu-item index="2">教学计划</el-menu-item>
          <el-menu-item index="3">项目信息</el-menu-item>
          <el-menu-item index="4">请假系统</el-menu-item>
          <el-menu-item index="5">个人信息</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px;">
        <img style="width: 20px" src="https://img-blog.csdnimg.cn/20201014180756926.png?x-oss-process=image/resize,m_fixed,h_64,w_64" />
        <div class="toolbar" style="text-align: right; font-size: 12px">

          <el-dropdown>
            <el-icon style="margin-right: 8px; "
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看资料</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>123</span>
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
import table2 from '/src/components/table.vue'
import router from "../../router";
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods:{
    member(){
      router.push('member')
    },
    classInfo(){
      router.push('classInfo')
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
