<template>
  <div>
    <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
      班级:
      <vxe-select style="margin-left: 10px"  v-model="classId" transfer>
        <vxe-option  v-for="item in classList" :key="item.classId" :value="item.classId" :label="item.classId">
        </vxe-option>
      </vxe-select>
      <div style="margin-left: 10px">{{className}}</div>
    </div>

  <el-table
    :data="attendances"
    border
    style="width: 100%"
    :highlight-current-row="true"
  >
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      fixed
      prop="studentId"
      label="ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="签到状态"
      width="150"
      :filters="[{ text: '已签到', value: 'SIGNED' }, { text: '迟到', value: 'LATE' },{text: '缺勤',value: 'ABSENCE'},{text: '请假',value: 'DAY_OFF'},{text: '未操作',value: null}]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template v-slot="scope">
        <el-tag
          v-if="scope.row.status=='SIGNED'"
          type="primary"
          disable-transitions>已签到</el-tag>
        <el-tag
          v-if="scope.row.status=='LATE'"
          type="warning"
          disable-transitions>迟到</el-tag>
        <el-tag
          v-if="scope.row.status=='ABSENCE'"
          type="danger"
          disable-transitions>缺勤</el-tag>
        <el-tag
          v-if="scope.row.status=='DAY_OFF'"
          type="info"
          disable-transitions>请假</el-tag>
        <el-tag
          v-if="scope.row.status==null"
          type="success"
          disable-transitions>未操作</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      align="right">
<!--      <template slot="header" v-slot="scope">-->
<!--        <el-input-->
<!--          v-model="search"-->
<!--          size="mini"-->
<!--          placeholder="输入姓名搜索"/>-->
<!--      </template>-->
      <template v-slot="scope"
      >
        <el-button
          size="mini"
          type="primary"
          :disabled="scope.row.status!=null"
          @click="handleSign(scope.$index, scope.row)">签到</el-button>

        <el-button
          size="mini"
          type="warning"
          :disabled="scope.row.status!=null"
          @click="handleLate(scope.$index, scope.row)">迟到</el-button>

        <el-button
          size="mini"
          type="danger"
          :disabled="scope.row.status!=null"
          @click="handleAbsence(scope.$index, scope.row)">缺勤</el-button>

        <el-button
          size="mini"
          type="info"
          :disabled="scope.row.status!=null"
          @click="handleDayoff(scope.$index, scope.row)">请假</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>


<script>
import axios from "axios";
import {VXETable} from "vxe-table";

export default {
  data() {
    return {
      value:true,
      search: '',
      //状态分为 signed late absence dayoff
      attendances:[
      ],
      classId:1,
      date:"2022-07-21"
    }
  },
  computed: {},
  mounted() {
    this.classId=this.$addition.classId,
        this.date=this.$addition.date,
    this.refresh()

  },
  watch: {
    //监听内容
    classId(value,oldValue) {
      // 第一个参数为新值，第二个参数为旧值，不能调换顺序
      for(let i=0;i<this.classList.length;i++)
      {
        if(this.classList[i].classId==value)
          this.className=this.classList[i].className
      }
      this.refresh()
      console.log(`新值：${value}`);
      console.log(`旧值：${oldValue}`);
    }
  },
  methods: {
    refresh(){

      //获取班级；列表
      axios.get('/api/v1/manage/class/list')
          .then(function (response) {
                console.log(response)
                let temp=JSON.parse(JSON.stringify(response.data.data))
                that.classList=temp
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });

      let that=this
      axios.get('/api/v1/attendance?classId='+this.classId+'&date='+this.date)
          .then(function (response) {
                console.log(response)
                let temp=JSON.parse(JSON.stringify(response.data.data))
                that.attendances=temp
                console.log(that.attendances)
                that.loading=false
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });

    },

    handleSign(index, row) {
      console.log(index, row);
      //this.students.push(row.status)
      let len=this.attendances.length
      let stuid=row.studentId
      let temp=JSON.parse(JSON.stringify(this.attendances[index]))
      for(let i=0;i<len;i++){
        if(this.attendances[i].studentId==stuid)
        {
          this.attendances[i].status='SIGNED'
        }
      }
      console.log(this.attendances)
      let that=this
      //put更新后台数据
      axios.put('/api/v1/attendance',{
        id:temp.id,
        status:'SIGNED'
      })
          .then(function (response) {
                VXETable.modal.message({ content: response.data.data, status: 'success' })
                that.refresh()
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
      that.refresh()
    },


    handleLate(index, row) {
      console.log(index, row);
      // this.attendances[index].status='LATE'
      let len=this.attendances.length
      let stuid=row.studentId
      let temp=JSON.parse(JSON.stringify(this.attendances[index]))
      for(let i=0;i<len;i++){
        if(this.attendances[i].studentId==stuid)
        {
          this.attendances[i].status='LATE'
        }
      }
      console.log(this.attendances)
      let that=this
      //put更新后台数据
      axios.put('/api/v1/attendance',{
        id:temp.id,
        status:'LATE'
      })
          .then(function (response) {
                VXETable.modal.message({ content: response.data.data, status: 'success' })
                that.refresh()
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
      that.refresh()
    },
    handleAbsence(index, row) {
      let len=this.attendances.length
      let stuid=row.studentId
      let temp=JSON.parse(JSON.stringify(this.attendances[index]))
      for(let i=0;i<len;i++){
        if(this.attendances[i].studentId==stuid)
        {
          this.attendances[i].status='ABSENCE'
        }
      }
      console.log(this.attendances)
      let that=this
      //put更新后台数据
      axios.put('/api/v1/attendance',{
        id:temp.id,
        status:'ABSENCE'
      })
          .then(function (response) {
                VXETable.modal.message({ content: response.data.data, status: 'success' })
                that.refresh()
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
      that.refresh()
    },
    handleDayoff(index, row) {
      let len=this.attendances.length
      let stuid=row.studentId
      let temp=JSON.parse(JSON.stringify(this.attendances[index]))
      for(let i=0;i<len;i++){
        if(this.attendances[i].studentId==stuid)
        {
          this.attendances[i].status='DAY_OFF'
        }
      }
      console.log(this.attendances)
      let that=this
      //put更新后台数据
      axios.put('/api/v1/attendance',{
        id:temp.id,
        status:'DAY_OFF'
      })
          .then(function (response) {
                VXETable.modal.message({ content: response.data.data, status: 'success' })
                that.refresh()
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
      that.refresh()
    },

    filterTag(value, row) {
      console.log(value,row);
      return row.status === value;
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


</style>




