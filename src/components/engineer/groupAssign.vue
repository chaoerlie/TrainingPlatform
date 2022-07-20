<template>
  <vxe-toolbar>
    班级分配
    <template #buttons >
      <div style=" width: 100%; display: flex;justify-content: space-between">
        <div>
          <vxe-button icon="fa fa-plus" @click="refresh()">刷新</vxe-button>
          <vxe-button icon="fa fa-plus" @click="assign()">分配</vxe-button>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">分配给:
          <vxe-select style="margin-left: 10px"  v-model="groupId" transfer>
            <vxe-option  v-for="item in groupList" :key="item.groupId" :value="item.groupId" :label="item.groupId">
            </vxe-option>
          </vxe-select>
          <div style="margin-left: 10px">组</div>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
          班级:
          <vxe-select style="margin-left: 10px"  v-model="classId" transfer>
            <vxe-option  v-for="item in classList" :key="item.classId" :value="item.classId" :label="item.classId">
            </vxe-option>
          </vxe-select>
          <div style="margin-left: 10px">{{className}}</div>
        </div>
        <div>
          <vxe-radio-group v-model="isAssigned">
            <vxe-radio-button label="0" content="未分配" ></vxe-radio-button>
            <vxe-radio-button label="1" content="已分配" ></vxe-radio-button>
          </vxe-radio-group>

        </div>

      </div>


    </template>
  </vxe-toolbar>
  <vxe-table
      v-loading="loading"
      border
      resizable
      show-overflow
      ref="xTable"
      height="550"
      :row-config="{isHover: true}"
      :checkbox-config="{ checkMethod: CheckboxMethod}"
      :data="tableData">
    <vxe-column type="checkbox" width="60"></vxe-column>
    <vxe-column type="seq" width="40" ></vxe-column>
    <vxe-column field="name" title="姓名" sortable></vxe-column>
    <vxe-column field="studentId" title="学生id" sortable></vxe-column>
    <vxe-column field="groupId" title="小组id" sortable ></vxe-column>
  </vxe-table>
  <vxe-modal v-model="showEdit" :title="'选择组长id'" width="800" min-width="600" min-height="300" resize destroy-on-close>
    <template #default>
      <vxe-form :data="formData" title-align="right" title-width="100" @submit="submitEvent">

        <vxe-form-item title="Basic information" title-align="left" :title-width="200" :span="24" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
        <vxe-form-item field="classId" title="请选择组长id" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="managerId" transfer>
              <vxe-option v-for="item in formData" :key="item.memberId" :value="item.memberId" :label="item.memberId"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" title-align="left" :span="24">
          <template #default>
            <vxe-button type="submit">提交</vxe-button>
            <vxe-button type="reset">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </template>
  </vxe-modal>


</template>
<script>
import VXETable from 'vxe-table'
import axios from "axios";
import router from "../../router";
import {convertC2E, convertE2C} from "../../apis/user";
export default {
  data () {
    return {
      formData:[
        {
          memberId:8
        }
      ],
      submitLoading: false,
      tableData: [
      ],
      classList:[],
      groupList:[],
      selectRow: null,
      showEdit: false,
      loading:true,
      assignClassId:null,
      classId:1,
      isAssigned:"0",
      className:'绿洲实训',
      managerId:null,
      groupId:1
    }
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
      this.getStudent()
      this.getGroup()
    }
  },
  methods: {
    CheckboxMethod({ row }){
      if(this.isAssigned=="0")
        return row.groupId==0
      else
      {
        return row.groupId>0
      }
    },
    assign(){
      if (this.groupId==null)
      {
        this.$message({
          message: '未选择分配的小组哦',
          type: 'warning'
        });
        return
      }

      const $table = this.$refs.xTable
      const selectRecords = $table.getCheckboxRecords()
      console.log(selectRecords)
      const studentList=[]
      const memberList=[]
      for(let i=0;i<selectRecords.length;i++)
      {
        studentList.push(selectRecords[i].studentId)
        memberList.push({
          memberId:selectRecords[i].studentId
        })
      }
      this.formData=memberList
      console.log(this.formData)
      this.showEdit=true
      console.log(studentList)






    },
    getGroup(){
      let that = this
      axios.get('/api/v1/manage/group/list?classId='+this.classId)
          .then(function (response) {
                console.log(response)
                let temp=JSON.parse(JSON.stringify(response.data.data))
                that.groupList=temp
                console.log(that.groupList)
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });


    },
    getStudent(){
      let that=this

      axios.get('/api/v1/manage/student')
          .then(function (response) {
                console.log(response)
                console.log(response.data.data)
                let temp2=[]
                let temp=JSON.parse(JSON.stringify(response.data.data))
                for(let i=0;i<temp.length;i++)
                {
                  if(temp[i].classId==that.classId)
                    temp2.push(temp[i])
                }
                that.tableData=temp2
                that.loading=false
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
    },
    refresh(){
      let that=this
      that.loading=true
      this.getStudent()
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
      this.getGroup()


    },

    cellDBLClickEvent ({ row }) {
      this.editEvent(row)
    },
    submitEvent () {
      this.submitLoading = true
      let that=this
      let stulist=[]
      for(let i=0;i<this.formData.length;i++)
      {
        stulist.push(this.formData[i].memberId)
      }

        axios.post('/api/v1/manage/group/student',{
          groupId:that.groupId,
          studentIds: stulist,
        })
            .then(function (response) {
                  that.$message({
                    message: response.data.data,
                    type: 'success'
                  });
                  that.showEdit=false
                  that.refresh()
                }
            )
            .catch(function(error) { // 请求失败处理
              console.log(error);
            });


      axios.put('/api/v1/manage/group',{
        managerId: this.managerId
      })
          .then(function (response) {
                that.refresh()
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
      }

  },
  mounted() {
    this.refresh()
  }



}


</script>

<style scoped>

</style>