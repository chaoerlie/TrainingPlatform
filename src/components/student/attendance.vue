<template>
  <div>
    <div class="zyx" style="font-size: x-large">学生查看考勤记录</div>
    <el-alert
      title="公告栏:请同学们准时打卡"
      class="zyx"
      style="margin-left:25%;width: 50%;justify-content: center"
      :closable="false"
      type="info">
    </el-alert>

    <el-calendar>
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p>
          {{ data.day.split('-').slice(1).join('-') }}<br />{{dealMyDateStatus(data.day)}}<br />{{dealMyDateTime(data.day)}}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "zh",
  data() {
    return {
      //状态分为 signed late absence dayoff
      attdendances: [
        {time: '2022-07-11', exactTime: '09:21:21', status: 'signed'},
        {time: '2022-07-12', exactTime: '09:21:21', status: 'late'},
        {time: '2022-07-13', exactTime: '', status: 'absence'},
        {time: '2022-07-14', exactTime: '', status: 'dayoff'},
        {time: '2022-07-15', exactTime: '09:21:21', status: 'signed'},
        {time: '2022-07-16', exactTime: '09:21:21', status: 'signed'},
      ],
    }
  },
  computed: {},
  methods: {
    dealMyDateTime(v) {
      console.log(v)
      let len = this.attdendances.length
      let res = ""
      for (let i = 0; i < len; i++) {
        if(this.attdendances[i].time == v)
        {res = this.attdendances[i].exactTime
        break}
      }
      return res
    },
    dealMyDateStatus(v) {
      console.log(v)
      let len = this.attdendances.length
      let res = ""
      for(let i=0; i<len; i++){
        if(this.attdendances[i].time == v) {
          if(this.attdendances[i].status=='signed') this.attdendances[i].status='已签到'
          else if(this.attdendances[i].status=='late') this.attdendances[i].status='迟到'
          else if(this.attdendances[i].status=='absence') this.attdendances[i].status='缺勤'
          else if(this.attdendances[i].status=='dayoff') this.attdendances[i].status='请假'
          res = this.attdendances[i].status
          break
        }
      }
      return res
    }
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

 .is-selected {
   color: #73e5fa;
 }

</style>




