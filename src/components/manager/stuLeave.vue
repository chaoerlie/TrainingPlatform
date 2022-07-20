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
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="学号">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="学院">
                <el-select v-model="form.colege" placeholder="请选择学院">
                  <el-option label="软件学院" value="ruanjian"></el-option>
                  <el-option label="口腔医学院" value="kouqiang"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="离校时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.leaveTimeDay" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker placeholder="选择时间" v-model="form.leaveTimeHour" style="width: 100%;"></el-time-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="预计返校时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.backTimeDay" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker placeholder="选择时间" v-model="form.backTimeHour" style="width: 100%;"></el-time-picker>
                </el-col>
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
                <el-input type="textarea" v-model="form.desc"></el-input>
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
              v-if="leaveRcd.status!=4&&leaveRcd.status!=3&&leaveRcd.teacherStatus!='rejected'&&leaveRcd.engineerStatus!='rejected'"
              class="box-card" style="width: 50%;margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <el-tag style="float: left">处理中</el-tag>
                <span style="font-weight: bold;font-size: 20px">请假条</span>
                <el-button
                  style="float: right; padding: 5px 5px" type="warning" @click="open(index)" disabled>我要销假</el-button>
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                发起人：{{leaveRcd.name}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                联系方式：{{leaveRcd.phone}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                学院：{{leaveRcd.department}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                请假理由：{{leaveRcd.desc}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                请假时间：{{leaveRcd.leaveTimeDay}} 至 {{leaveRcd.backTimeDay}}
              </div>
              <div class="zyx" style="text-align: left;font-size: small">流程跟踪:</div>
              <el-steps
                :space="100" :active="leaveRcd.status"
                :align-center="true"
                style="justify-content: center;font-size: 10px"
                simple
                finish-status="success"
              >
                <!-- 后端传代表状态的数字，每次刷新获取状态并修改-->
                <el-step title="已提交申请"></el-step>
                <el-step title="老师审核"></el-step>
                <el-step title="工程师审核"></el-step>
                <el-step title="已销假"></el-step>
              </el-steps>
            </el-card>

            <el-card
              v-if="leaveRcd.status==3&&leaveRcd.teacherStatus!='rejected'&&leaveRcd.engineerStatus!='rejected'"
              class="box-card" style="width: 50%;margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <el-tag style="float: left">处理中</el-tag>
                <span  style="font-weight: bold;font-size: 20px">请假条</span>
                <el-button
                  style="float: right; padding: 5px 5px" type="warning" @click="open(index)">我要销假</el-button>
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                发起人：{{leaveRcd.name}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                联系方式：{{leaveRcd.phone}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                学院：{{leaveRcd.department}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                请假理由：{{leaveRcd.desc}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                请假时间：{{leaveRcd.leaveTimeDay}} 至 {{leaveRcd.backTimeDay}}
              </div>
              <div class="zyx" style="text-align: left;font-size: small">流程跟踪:</div>
              <el-steps
                :space="100" :active="leaveRcd.status"
                :align-center="true"
                style="justify-content: center;font-size: 10px"
                simple
                finish-status="success"
              >
                <!-- 后端传代表状态的数字，每次刷新获取状态并修改-->
                <el-step title="已提交申请"></el-step>
                <el-step title="老师审核"></el-step>
                <el-step title="工程师审核"></el-step>
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
              v-if="leaveRcd.status==4"
              class="box-card" style="width: 50%;margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <el-tag type="success" style="float: left">已完成</el-tag>
                <span  style="font-weight: bold;font-size: 20px">请假条</span>
                <el-button style="float: right; padding: 5px 5px" type="warning" @click="open" disabled>我要销假</el-button>
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                发起人：{{leaveRcd.name}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                联系方式：{{leaveRcd.phone}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                学院：{{leaveRcd.department}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                请假理由：{{leaveRcd.desc}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                请假时间：{{leaveRcd.leaveTimeDay}} 至 {{leaveRcd.backTimeDay}}
              </div>
              <div class="zyx" style="text-align: left;font-size: small">流程跟踪:</div>
              <el-steps
                :space="100" :active="leaveRcd.status"  :align-center="true" style="justify-content: center;font-size: 10px"
                simple
                finish-status="success"
              >
                <!-- 后端传代表状态的数字，每次刷新获取状态并修改-->
                <el-step title="已提交申请"></el-step>
                <el-step title="老师审核"></el-step>
                <el-step title="工程师审核"></el-step>
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
              v-if="leaveRcd.engineerStatus=='rejected'||leaveRcd.teacherStatus=='rejected'"
              class="box-card" style="width: 50%;margin-bottom: 20px">
              <div slot="header" class="clearfix">
                <el-tag type="danger" style="float: left">已驳回</el-tag>
                <span  style="font-weight: bold;font-size: 20px">请假条</span>
                <el-button style="float: right; padding: 5px 5px" type="warning" @click="open" disabled>我要销假</el-button>
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                发起人：{{leaveRcd.name}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                联系方式：{{leaveRcd.phone}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                学院：{{leaveRcd.department}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                请假理由：{{leaveRcd.desc}}
              </div>
              <div class="zh" style="margin-left:15px;text-align: left;font-size: small">
                请假时间：{{leaveRcd.leaveTimeDay}} 至 {{leaveRcd.backTimeDay}}
              </div>
              <div class="zyx" style="text-align: left;font-size: small">流程跟踪:</div>
              <el-steps
                :space="100" :active="leaveRcd.status-1"  :align-center="true" style="justify-content: center;font-size: 10px"
                simple
                process-status="error"
                finish-status="success"
              >
                <!-- 后端传代表状态的数字，每次刷新获取状态并修改-->
                <el-step title="已提交申请"></el-step>
                <el-step title="老师审核"></el-step>
                <el-step title="工程师审核"></el-step>
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
export default {
  name: "zh",
  data() {
    return{
      value1: '',
      form: {
        name: '',
        number: '',
        phone: '',
        colege: '',
        leaveTimeDay: '',
        leaveTimeHour: '',
        backTimeDay: '',
        backTimeHour: '',
        desc: '',
        status:1,
      },
      //一个form相当于一个请假条  一次提交一个form
      leaveRecord:[
        {name:"zh",desc:"耍朋友",status:4,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus:"approved",engineerStatus:"approved"},
        {name:"zyx",desc: "耍朋友",status:2,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus: "rejected",engineerStatus: "waiting"},
        {name:"hz",desc: "打游戏",status:2,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus: "approved",engineerStatus: "waiting"},
        {name:"hys",desc:"打NBA",status: 1,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus: "waiting",engineerStatus: "waiting"},
        {name:"cgf",desc:"睡觉",status: 1,phone:18090000531,department:"口腔医学院",leaveTimeDay:"2022-1-1",backTimeDay:"2022-4-2",teacherStatus: "waiting",engineerStatus: "waiting"},
        {name:"zhw",desc: "写代码",status: 3,phone:18090000531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus: "approved",engineerStatus: "rejected"},
        {name:"zja",desc: "生病",status: 3,phone:18094300531,department:"软件学院",leaveTimeDay:"2022-1-2",backTimeDay:"2022-7-21",teacherStatus: "approved",engineerStatus: "approved"}
      ]
    }
  },

  computed: {},
  methods: {
    onSubmit() {
      console.log('submit!');
      this.leaveRecord.push(this.form)
      console.log(this.leaveRecord);
    },
    open(index) {
      // console.log(index)
      this.$confirm('是否确认销假?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '销假成功!'
        });
        this.leaveRecord[index].status=4
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }

  },
  mounted: function () {}
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




