<template>

  <div >
    <h1> 小组列表 </h1>
    <div>
      <vxe-toolbar>
        <template #buttons>
          <div style=" width: 100%; display: flex;justify-content: space-between">
            <div>
              <vxe-button icon="fa fa-plus" @click="refresh()">刷新</vxe-button>
              <vxe-button icon="fa fa-plus" @click="insertEvent">新建小组</vxe-button>
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

            </div>

          </div>
        </template>

      </vxe-toolbar>


    </div>

    <vxe-table
        v-loading="loading"
        border
        resizable
        show-overflow
        ref="xTable"
        height="550"
        :row-config="{isHover: true}"
        :data="tableData"
        @cell-dblclick="cellDBLClickEvent">
      <vxe-column type="seq" width="40"></vxe-column>
      <vxe-column field="groupName" title="小组名称"></vxe-column>
      <vxe-column field="groupId" title="小组Id"></vxe-column>
      <vxe-column field="students.length" title="小组人数"></vxe-column>
      <vxe-column title="操作" show-overflow>
        <template #default="{ row }">
          <vxe-button type="text"   @click="editEvent(row)"><i style="font-size: 20px" class="vxe-icon--edit-outline"></i></vxe-button>
          <vxe-button type="text"  @click="removeEvent(row)"><i style="font-size: 20px" class="vxe-icon--error"></i></vxe-button>
        </template>
      </vxe-column>
    </vxe-table>
  </div>

  <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
    <template #default>
      <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">

        <vxe-form-item title="Basic information" title-align="left" :title-width="200" :span="24" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
        <vxe-form-item field="classId" title="班级id" :span="24" :item-render="{}">

          <vxe-input v-model="classId"  disabled></vxe-input>
        </vxe-form-item>
        <vxe-form-item field="className" title="小组名称" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.className" placeholder="请输入名称"></vxe-input>
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
      submitLoading: false,
      tableData: [
        {
          groupId:12,
          groupName:'jff'
        }
      ],
      selectRow: null,
      showEdit: false,
      classId:1,
      teacherList:[

      ],
      classList:[
        {
          classId:1
        }
      ],
      engineerList:[

      ],
      formData: {
        groupName:null,
        classId:null,
        managerId:null,
        projectId:null,
        requirementAnalysisScore:null,
        designScore:null,
        projectDevelopmentScore:null,
        projectReportScore:null,
        qualityScore:null
      },
      formRules: {
        username: [
          { required: true, message: '请输入名称' },
          { min: 3, max: 5, message: '长度在 2 到 5 个字符' }
        ],
        userId: [
          { required: true, message: '请输入Id' }
        ]
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      loading:true,
      className:'绿洲平台'
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

      console.log(`新值：${value}`);
      console.log(`旧值：${oldValue}`);
    }
  },
  methods: {

    refresh(){
      console.log(23423)
      console.log(this.classId)
      let that=this
      that.loading=true
      //获取老师列表
      axios.get('/api/v1/manage/user/list')
          .then(function (response) {
                console.log(response)
                console.log(response.data.data)
                let temp=response.data.data
                let teacherlist=[]
                let engineerlist=[]
                for(let i=0;i<temp.length;i++)
                {
                  if(temp[i].role=='ROLE_TEACHER')
                  {
                    teacherlist.push(
                        {
                          label:temp[i].username,
                          id:temp[i].userId
                        }
                    )
                  }
                  if(temp[i].role=='ROLE_ENGINEER')
                  {
                    engineerlist.push({
                      label:temp[i].username,
                      id:temp[i].userId
                    })
                  }
                }
                that.engineerList=engineerlist
                that.teacherList=teacherlist
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
      //获取小组列表
      console.log(23423)
      console.log(that.classId)
      axios.get('/api/v1/manage/group/list?classId='+that.classId)
          .then(function (response) {
                console.log(response)
                let temp=JSON.parse(JSON.stringify(response.data.data))
                that.tableData=temp
                that.page.totalResult=that.tableData.length
                console.log(that.tableData)
                that.loading=false
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
      //获取班级列表
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
        groupName:null,
        classId:this.classId,
        managerId:null,
        projectId:null,
        requirementAnalysisScore:null,
        designScore:null,
        projectDevelopmentScore:null,
        projectReportScore:null,
        qualityScore:null
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent (row) {
      this.formData = {
        groupName:row.groupName,
        classId:row.classId,
        managerId:row.managerId,
        projectId:row.projectId,
        requirementAnalysisScore:row.requirementAnalysisScore,
        designScore:row.designScore,
        projectDevelopmentScore:row.projectDevelopmentScore,
        projectReportScore:row.projectReportScore,
        qualityScore:row.qualityScore
      }
      this.selectRow = row
      this.showEdit = true
    },
    async removeEvent (row) {
      //row是一个json
      console.log(row)
      let that = this
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      const $table = this.$refs.xTable
      if (type === 'confirm') {
        $table.remove(row)
        axios.delete('/api/v1/manage/group?groupId='+row.groupId,)
            .then(function (response) {
                  console.log('删除成功')
                  that.$message({
                    message: response.data.data,
                    type: 'success'
                  });
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
      console.log(this.formData)
      setTimeout(() => {
        const $table = that.$refs.xTable
        that.submitLoading = false
        that.showEdit = false
        if (that.selectRow) {
//修改表单
          console.log('edit')
          axios.put('/api/v1/manage/group',{
            classId:that.classId,
            groupName:that.formData.groupName,
            managerId:that.formData.managerId,
            projectId:that.formData.projectId,
            requirementAnalysisScore:that.formData.requirementAnalysisScore,
            designScore:that.formData.designScore,
            projectDevelopmentScore:that.formData.projectDevelopmentScore,
            projectReportScore:that.formData.projectReportScore,
            qualityScore:that.formData.qualityScore
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

          axios.post('/api/v1/manage/group',{
            classId:that.classId,
            groupName:that.formData.groupName
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