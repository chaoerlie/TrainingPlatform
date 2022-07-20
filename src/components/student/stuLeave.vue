<template>
  <div>
    <div class="zyx" style="font-size: x-large">请假管理</div>
    <el-alert
      title="公告栏:请同学们根据需求提交申请并实时关注事务进度"
      class="zyx"
      style="margin-left:25%;width: 50%;justify-content: center"
      :closable="false"
      type="info">
    </el-alert>

    <div>
      <el-tabs v-model="activeName"  @tab-click="handleClick">

        <el-tab-pane class="zyx" label="请假申请" name="first" >
          <div style="margin-bottom: 30px">请完善你的请假信息并提交</div>
          <div style="display:flex;justify-content: center">
            <el-form ref="form"  label-width="100px" :model="form"  style="width: 50%">
              <el-form-item label="发起人">
                <el-input v-model="form.studentName"></el-input>
              </el-form-item>
              <el-form-item label="学号">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="form.phoneNumber"></el-input>
              </el-form-item>
              <el-form-item label="学院">
                <el-select v-model="form.department" placeholder="请选择学院">
                  <el-option label="软件学院" value="软件学院"></el-option>
                  <el-option label="口腔医学院" value="口腔医学院"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="离校时间">
                <el-col :span="11">
                  <el-date-picker
                      type="date" placeholder="选择日期"
                      format="YYYY 年 MM 月 DD 日"
                      value-format="YYYY-MM-DD"
                      v-model="form.startDate" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
              </el-form-item>
              <el-form-item label="预计返校时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期"
                                  format="YYYY 年 MM 月 DD 日"
                                  value-format="YYYY-MM-DD"
                                  v-model="form.endDate" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
              </el-form-item>

              <!--          <el-form-item class="block" label="请假期间">-->
              <!--            <el-date-picker-->
              <!--              v-model="value1"-->
              <!--              type="datetimerange"-->
              <!--              range-separator="至"-->
              <!--              start-placeholder="开始日期"-->
              <!--              end-placeholder="结束日期">-->
              <!--            </el-date-picker>-->
              <!--          </el-form-item>-->

              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.reason"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即申请</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>


        <el-tab-pane class="zyx" label="处理中" name="second">
          <div
            style="display: flex;flex-direction: row;justify-content: center"
            v-for="(leaveRcd,index) in leaveRecord"
          >

            <el-card
              v-if="leaveRcd.progress!=4&&leaveRcd.progress!=3&&leaveRcd.teacherStatus!='REJECTED'&&leaveRcd.engineerStatus!='REJECTED'"
              class="box-card" style="width: 50%;margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <el-tag style="float: left">处理中</el-tag>
                <span style="font-weight: bold;font-size: 20px">请假条</span>
                <el-button
                  style="float: right; padding: 5px 5px" type="warning" @click="open(index)" disabled>我要销假</el-button>
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

            <el-card
              v-if="leaveRcd.progress==3&&leaveRcd.teacherStatus!='REJECTED'&&leaveRcd.engineerStatus!='REJECTED'"
              class="box-card" style="width: 50%;margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <el-tag style="float: left">处理中</el-tag>
                <span  style="font-weight: bold;font-size: 20px">请假条</span>
                <el-button
                  style="float: right; padding: 5px 5px" type="warning" @click="open(index)">我要销假</el-button>
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


        <el-tab-pane class="zyx" label="已完成" name="third">
          <div
            style="display: flex;flex-direction: row;justify-content: center"
            v-for="leaveRcd in leaveRecord"
          >
            <el-card
              v-if="leaveRcd.progress==4"
              class="box-card" style="width: 50%;margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <el-tag type="success" style="float: left">已完成</el-tag>
                <span  style="font-weight: bold;font-size: 20px">请假条</span>
                <el-button style="float: right; padding: 5px 5px" type="warning" @click="open" disabled>我要销假</el-button>
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
                :space="100" :active="leaveRcd.progress"  :align-center="true" style="justify-content: center;font-size: 10px"
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

        <el-tab-pane class="zyx" label="已驳回" name="fourth">
          <div
            style="display: flex;flex-direction: row;justify-content: center"
            v-for="leaveRcd in leaveRecord"
          >
            <el-card
              v-if="leaveRcd.engineerStatus=='REJECTED'||leaveRcd.teacherStatus=='REJECTED'"
              class="box-card" style="width: 50%;margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <el-tag type="danger" style="float: left">已驳回</el-tag>
                <span  style="font-weight: bold;font-size: 20px">请假条</span>
                <el-button style="float: right; padding: 5px 5px" type="warning" @click="open" disabled>我要销假</el-button>
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
                :space="100" :active="leaveRcd.progress-1"  :align-center="true" style="justify-content: center;font-size: 10px"
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
      </el-tabs>
    </div>



  </div>
</template>

<script>
import axios from "axios";
import {VXETable} from "vxe-table";

export default {
  name: "zh",
  data() {
    return{
      activeName:'second',
      value1: '',
      form: {
        name: '',
        number: '',
        phoneNumber: '',
        department: '',
        startDate: '',
        endDate: '',
        reason: '',
        progress:1,
      },
      //一个form相当于一个请假条  一次提交一个form
      leaveRecord:[

      ]
    }
  },

  computed: {},
  methods: {
    refresh(){

      let that=this
      axios.get('/api/v1/attendance/leave')
          .then(function (response) {
                console.log(response)
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
    onSubmit() {
      let that=this
      console.log('submit!');
      //this.leaveRecord.push(this.form)
      console.log(this.leaveRecord);
      axios.post('/api/v1/attendance/leave',{
        startDate:that.form.startDate,
        endDate:that.form.endDate,
        reason:that.form.reason,
        phoneNumber:that.form.phoneNumber,
        department:that.form.department
      })
          .then(function (response) {
                VXETable.modal.message({ content: response.data.data, status: 'success' })
                that.form={}
               that.refresh()
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
    },
    open(index) {
      // console.log(index)
      let that=this
      this.$confirm('是否确认销假?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.put('/api/v1/attendance/leave/reportBack',{
          leaveRecordId:that.leaveRecord[index],
        })
            .then(function (response) {
                  VXETable.modal.message({ content: response.data.data, status: 'success' })
                }
            )
            .catch(function(error) { // 请求失败处理
              console.log(error);
            });
        that.refresh()
        // this.leaveRecord[index].status=4
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




