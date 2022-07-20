<template>
  <div>
    <div class="zyx" style="font-size: x-large" @click="test">请假管理</div>

    <el-alert
      title="公告栏:请工程师们根据详情认真审批请假事务"
      class="zyx"
      style="margin-left:25%;width: 50%;justify-content: center"
      :closable="false"
      type="info">
    </el-alert>

    <div>
    <el-tabs v-model="activeName"  @tab-click="handleClick">

      <el-tab-pane  class="zyx" label="待处理" name="first">
        <div
          style="display: flex;flex-direction: row;justify-content: center"
          v-for="(leaveRcd,index) in leaveRecord"
        >
          <el-card
            v-if="leaveRcd.progress==1&&leaveRcd.engineerStatus=='WAITING'"
            class="box-card" style="width: 50%;margin-bottom: 20px">
            <div slot="header" class="clearfix">
              <el-tag style="float: left">待处理</el-tag>
              <span style="font-weight: bold;font-size: 20px">请假条</span>
              <el-button style="float: right;padding: 5px 5px" type="warning"  @click="reject(index)">驳回申请</el-button>
              <el-button style="float: right; padding: 5px 5px;margin-right: 20px" type="primary" @click="pass(index)">通过申请</el-button>

            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              发起人：{{leaveRcd.studentName}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              联系方式：{{leaveRcd.phoneNumber}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              学院：{{leaveRcd.department}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              请假理由：{{leaveRcd.reason}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              请假时间：{{leaveRcd.startDate}} 至 {{leaveRcd.endDate}}
            </div>
            <div class="zyx" style="text-align: left;font-size: small">流程跟踪:</div>
            <el-steps
              :space="100" :active="leaveRcd.progress"
              :align-center="true"
              style="justify-content: center;font-size: 10px"
              simple
              finish-status="success"
            >
              <!-- 后端传代表状态的数字，每次刷新获取状态并修改-->
              <el-step title="已提交申请"></el-step>
              <el-step title="工程师审核"></el-step>
              <el-step title="老师审核"></el-step>
              <el-step title="已销假"></el-step>
            </el-steps>
          </el-card>
        </div>
      </el-tab-pane>


      <el-tab-pane class="zyx" label="已驳回" name="second">
        <div
          style="display: flex;flex-direction: row;justify-content: center"
          v-for="leaveRcd in leaveRecord"
        >
          <el-card
            v-if="leaveRcd.engineerStatus=='REJECTED'"
            class="box-card" style="width: 50%;margin-bottom: 20px">
            <div slot="header" class="clearfix">
              <el-tag type="danger" style="float: left">已驳回</el-tag>
              <span  style="font-weight: bold;font-size: 20px">请假条</span>
              <el-button style="float: right;padding: 5px 5px" type="warning" disabled>驳回申请</el-button>
              <el-button style="float: right; padding: 5px 5px;margin-right: 20px" type="primary" @click="pass(index)" disabled>通过申请</el-button>
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              发起人：{{leaveRcd.studentName}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              联系方式：{{leaveRcd.phoneNumber}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              学院：{{leaveRcd.department}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              请假理由：{{leaveRcd.reason}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              请假时间：{{leaveRcd.startDate}} 至 {{leaveRcd.endDate}}
            </div>
            <div class="zyx" style="text-align: left;font-size: small">流程跟踪:</div>
            <el-steps :space="100" :active="leaveRcd.progress-1"  :align-center="true"
                      style="justify-content: center;font-size: 10px"
                      simple
                      process-status="error"
                      finish-status="success"
            >
              <!-- 后端传代表状态的数字，每次刷新获取状态并修改-->
              <el-step title="已提交申请"></el-step>
              <el-step title="工程师审核"></el-step>
              <el-step title="老师审核"></el-step>
              <el-step title="已销假"></el-step>
            </el-steps>
          </el-card>
        </div>
      </el-tab-pane>

      <el-tab-pane class="zyx" label="已通过" name="third">
        <div
          style="display: flex;flex-direction: row;justify-content: center"
          v-for="(leaveRcd,index) in leaveRecord"
        >
          <el-card
            v-if="leaveRcd.engineerStatus=='APPROVED'"
            class="box-card" style="width: 50%;margin-bottom: 20px">
            <div slot="header" class="clearfix">
              <el-tag type="success" style="float: left">已通过</el-tag>
              <span  style="font-weight: bold;font-size: 20px">请假条</span>
              <el-button style="float: right;padding: 5px 5px" type="warning" disabled>驳回申请</el-button>
              <el-button style="float: right; padding: 5px 5px;margin-right: 20px" type="primary" @click="pass(index)" disabled>通过申请</el-button>
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              发起人：{{leaveRcd.studentName}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              联系方式：{{leaveRcd.phoneNumber}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              学院：{{leaveRcd.department}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              请假理由：{{leaveRcd.reason}}
            </div>
            <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
              请假时间：{{leaveRcd.startDate}} 至 {{leaveRcd.endDate}}
            </div>
            <div class="zyx" style="text-align: left;font-size: small">流程跟踪:</div>
            <el-steps :space="100" :active="leaveRcd.progress"  :align-center="true"
                      style="justify-content: center;font-size: 10px"
                      simple
                      finish-status="success"
            >
              <!-- 后端传代表状态的数字，每次刷新获取状态并修改-->
              <el-step title="已提交申请"></el-step>
              <el-step title="工程师审核"></el-step>
              <el-step title="老师审核"></el-step>
              <el-step title="已销假"></el-step>
            </el-steps>
          </el-card>
        </div>
      </el-tab-pane>

    </el-tabs>
    </div>



  </div>
</template>

<script>
import router from "../../router";
import axios from "axios";
import {VXETable} from "vxe-table";

export default {
  name: "zh",
  data() {
    return{
      activeName:'first',
      // value1: '',
      // form: {
      //   name: '',
      //   number: '',
      //   phone: '',
      //   department: '',
      //   leaveTimeDay: '',
      //   leaveTimeHour: '',
      //   backTimeDay: '',
      //   backTimeHour: '',
      //   desc: '',
      //   status:1,
      // },
      // //一个form相当于一个请假条  一次提交一个form
      leaveRecord:[
        {leaveRecordId:1,studentName:"zh",desc:"耍朋友",status:4,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus:"approved",engineerStatus:"approved"},
        {leaveRecordId:2,studentName:"zyx",desc: "耍朋友",status:2,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus: "rejected",engineerStatus: "waiting"},
        {leaveRecordId:3,studentName:"hz",desc: "打游戏",status:2,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus: "approved",engineerStatus: "waiting"},
        {leaveRecordId:4,studentName:"hys",desc:"打NBA",status: 1,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus: "waiting",engineerStatus: "waiting"},
        {leaveRecordId:5,studentName:"cgf",desc:"睡觉",status: 1,phone:18090000531,department:"口腔医学院",leaveTimeDay:"2022-1-1",backTimeDay:"2022-4-2",teacherStatus: "waiting",engineerStatus: "waiting"},
        {leaveRecordId:6,studentName:"zhw",desc: "写代码",status: 3,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus: "approved",engineerStatus: "rejected"}
      ]
    }
  },

  computed: {},
  methods: {
    test(){
      console.log(this.leaveRecord)
    },
    refresh(){

      let that=this
      axios.get('/api/v1/attendance/leave')
          .then(function (response) {
                let temp=JSON.parse(JSON.stringify(response.data.data))
                that.leaveRecord=temp
                console.log(that.leaveRecord)
                that.loading=false
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
    },
    pass(index) {
      // console.log(index)
      console.log(index)
      console.log(this.leaveRecord[index])
      let temp=JSON.parse(JSON.stringify(this.leaveRecord[index]))
      console.log(temp)
      let that=this
      that.$confirm('是否通过申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        console.log({
          leaveRecordId:temp.id,
          status:'APPROVED'
        })
        axios.put('/api/v1/attendance/leave',{
          leaveRecordId:temp.id,
          status:'APPROVED'
        })
            .then(function (response) {
              VXETable.modal.message({ content: response.data.data, status: 'success' })
              that.refresh()
            }
            )
            .catch(function(error) { // 请求失败处理
              console.log(error);
            });
        // this.leaveRecord[index].status=3
        // this.leaveRecord[index].engineerStatus='approved'

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    reject(index) {
      console.log(index)
      console.log(this.leaveRecord[index])
      let temp=JSON.parse(JSON.stringify(this.leaveRecord[index]))
      let that=this
      this.$confirm('是否驳回申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log({
          leaveRecordId:temp.id,
          status:'REJECTED',
        })
        axios.put('/api/v1/attendance/leave',{
          leaveRecordId:temp.id,
          status:'REJECTED',
        })
            .then(function (response) {
                  VXETable.modal.message({ content: response.data.data, status: 'success' })
              that.refresh()
                }
            )
            .catch(function(error) { // 请求失败处理
              console.log(error);
            });
        // this.leaveRecord[index].status=3
        // this.leaveRecord[index].engineerStatus='rejected'

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }

  },
  mounted: function () {

    this.refresh()
  }
}
</script>

<style scoped>

.zyx {
  margin: 15px;
}

.zh{
  margin-bottom: 10px;
}

</style>




