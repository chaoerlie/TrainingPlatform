<template>
  <vxe-toolbar>
    班级分配
    <template #buttons >
      <div style=" width: 100%; display: flex;justify-content: space-between">
        <div>
          <vxe-button icon="fa fa-plus" @click="refresh()">刷新</vxe-button>
          <vxe-button icon="fa fa-plus" @click="assign()">分配</vxe-button>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: center;align-items: center">
          班级:
          <vxe-select style="margin-left: 10px"  v-model="assignClassId" transfer>
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
    <vxe-column field="classId" title="班级id" sortable ></vxe-column>
  </vxe-table>

</template>
<script>
import VXETable from 'vxe-table'
import axios from "axios";
import router from "../../router";
import {convertC2E, convertE2C} from "../../apis/user";

export default {
  data () {
    return {
      submitLoading: false,
      tableData: [
      ],
      classList:[],
      selectRow: null,
      showEdit: false,
      loading:true,
      assignClassId:null,
      isAssigned:"0",
      className:''
    }
  },
  watch: {
    //监听内容
    assignClassId(value,oldValue) {
      // 第一个参数为新值，第二个参数为旧值，不能调换顺序
      for(let i=0;i<this.classList.length;i++)
      {
        if(this.classList[i].classId==value)
          this.className=this.classList[i].className
      }

      console.log(`新值：${value}`);
      console.log(`旧值：${oldValue}`);
    }
  },
  methods: {
    CheckboxMethod({ row }){
      if(this.isAssigned=="0")
      return row.classId==0
      else
      {
        return row.classId>0
      }
    },
    assign(){
      if (this.assignClassId==null)
      {
        this.$message({
          message: '未选择分配的班级哦',
          type: 'warning'
        });
        return
      }

      const $table = this.$refs.xTable
      const selectRecords = $table.getCheckboxRecords()
      console.log(selectRecords)
      const studentList=[]
      for(let i=0;i<selectRecords.length;i++)
      {
        studentList.push(selectRecords[i].studentId)
      }
      console.log(studentList)
      let that=this

      if(that.isAssigned==0)
      {
        axios.post('/api/v1/manage/class/student',{
          classId:that.assignClassId,
          studentIds: studentList
        })
            .then(function (response) {
              console.log(123)
              console.log(response)
              VXETable.modal.message({ content: response.data.data, status: 'success' })
                  that.refresh()
                }
            )
            .catch(function(error) { // 请求失败处理
              console.log(error);
            });
      }
      else {
        //修改已分配的
        axios.put('/api/v1/manage/class/student',{
          classId:that.assignClassId,
          studentIds: studentList
        })
            .then(function (response) {
              VXETable.modal.message({ content: response.data.data, status: 'success' })
                  that.refresh()
                }
            )
            .catch(function(error) { // 请求失败处理
              console.log(error);
            });
      }



    },
    refresh(){
      let that=this
      that.loading=true
      axios.get('/api/v1/manage/student')
          .then(function (response) {
                console.log(response)
                console.log(response.data.data)
                let temp=JSON.parse(JSON.stringify(response.data.data))
                that.tableData=temp
                that.loading=false
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });

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
    },

    cellDBLClickEvent ({ row }) {
      this.editEvent(row)
    },
    insertEvent () {
      this.formData = {
        username: '',
        role: '',
        userId:''
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent (row) {
      this.formData = {
        username: row.username,
        userId:row.userId,
        role: row.role,
      }
      this.selectRow = row
      this.showEdit = true
    },
    async removeEvent (row) {
      //row是一个json
      console.log(row)
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      const $table = this.$refs.xTable

      if (type === 'confirm') {

        $table.remove(row)
        axios.delete('/api/v1/manage/user?userId='+row.userId,)
            .then(function (response) {
                  console.log('删除成功')
              VXETable.modal.message({ content: response.data.data, status: 'success' })
                  this.refresh()
                }
            )
            .catch(function(error) { // 请求失败处理
              console.log(error);
            });
      }

    },
    submitEvent () {
      let that = this
      this.submitLoading = true
      setTimeout(() => {
        const $table = that.$refs.xTable
        that.submitLoading = false
        that.showEdit = false
        if (that.selectRow) {
//修改表单
          axios.put('/api/v1/user',{
            username:that.formData.username,
            userId:that.formData.userId,
            email:'00090980',
            password:that.formData.userId%10000,
            role:convertC2E(that.formData.role)
          })
              .then(function (response) {
                    VXETable.modal.message({ content: response.data.data, status: 'success' })
                    Object.assign(that.selectRow, that.formData)
                    console.log(that.formData)
                    that.refresh()
                  }
              )
              .catch(function(error) { // 请求失败处理
                console.log(error);
              });

        } else {
          //新增元素
          console.log({
            username:that.formData.username,
            userId:that.formData.userId,
            email:'00090980',
            password:that.formData.userId%10000,
            role:convertC2E(that.formData.role)
          })
          axios.post('/api/v1/user/register',{
            username:that.formData.username,
            userId:that.formData.userId,
            email:'00090980',
            password:that.formData.userId%10000,
            role:convertC2E(that.formData.role)
          })
              .then(function (response) {
                    VXETable.modal.message({ content: response.data.data, status: 'success' })
                    $table.insert(that.formData)
                    that.refresh()
                  }
              )
              .catch(function(error) { // 请求失败处理
                console.log(error);
              });


        }
      }, 500)
    }
  },
  mounted() {
    this.refresh()
  }



}


</script>

<style scoped>

</style>