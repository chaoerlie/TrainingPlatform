<template>

    <div >
      <h1> 班级列表 </h1>
      <vxe-toolbar>
        <template #buttons>
          <vxe-button icon="fa fa-plus" @click="insertEvent()">新增班级</vxe-button>
          <vxe-button icon="fa fa-plus" @click="refresh()">刷新</vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-table
          v-loading="loading"
          border
          resizable
          show-overflow
          ref="xTable"
          height="540"
          :row-config="{isHover: true}"
          :data="tableData"
          @cell-dblclick="cellDBLClickEvent">
        <vxe-column type="seq" width="40"></vxe-column>
        <vxe-column field="className" title="班级名称"></vxe-column>
        <vxe-column field="classId" title="班级Id"></vxe-column>
        <vxe-column field="teacherName" title="教师名称"></vxe-column>
        <vxe-column field="engineerName" title="工程师名称"></vxe-column>
        <vxe-column title="操作" show-overflow>
          <template #default="{ row }">
            <vxe-button type="text"   @click="editEvent(row)"><i style="font-size: 20px" class="vxe-icon--edit-outline"></i></vxe-button>
            <vxe-button type="text"  @click="removeEvent(row)"><i style="font-size: 20px" class="vxe-icon--error"></i></vxe-button>
          </template>
        </vxe-column>
      </vxe-table>  </div>
  <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
    <template #default>
      <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
        <vxe-form-item title="Basic information" title-align="left" :title-width="200" :span="24" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
        <vxe-form-item field="className" title="班级名称" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.className" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="teacherId" title="教师id" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="data.teacherId" transfer>
              <vxe-option v-for="item in teacherList" :key="item.value" :value="item.id" :label="item.id+'               '+item.label"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item field="engineerId" title="工程师id" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="data.engineerId" transfer>
              <vxe-option v-for="item in engineerList" :key="item.value" :value="item.id" :label="item.id+'               '+item.label"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item field="teachingPlanId" title="教学计划id" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="data.teachingPlanId" transfer>
              <vxe-option v-for="item in teachingPlanList" :key="item.value" :value="item.id" :label="item.id+'               '+item.label"></vxe-option>
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
      submitLoading: false,
      tableData: [
        {
          classId: 2,
          className: "2班",
          teacherId: 1,
          teacherName: "hedan"
        }
      ],
      selectRow: null,
      showEdit: false,
      roleList: [
        { label: '学生', value: 0 },
        { label: '老师', value: 1 },
        { label: '工程师', value: 2 },
        { label: '管理员', value: 3}
      ],
      teacherList:[

      ],
      engineerList:[

      ],
      teachingPlanList:[

      ],
      formData: {
        className:null,
        teacherId: null,
        classId:null,
        engineerId:null,
        teachingPlanId:null
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
      loading:true
    }
  },
  methods: {
    getPlanList(){
      let that=this
      //获取计划列表
      axios.get('/api/v1/plan/all')
          .then(function (response) {
                console.log(89798)
                console.log(response)
                console.log(response.data.data)
                let temp=response.data.data
            for(let i=0;i<temp.length;i++)
            {
              that.teachingPlanList.push({
                label:temp[i].name,
                id:temp[i].teachingPlanId
              })
            }

              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
    },
    refresh(){
      let that=this
      that.loading=true
      //获取老师列表
      axios.get('/api/v1/manage/user/list')
          .then(function (response) {
                console.log(89798)
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
      this.getPlanList()
      //获取班级列表
      axios.get('/api/v1/manage/class/list')
          .then(function (response) {
                console.log(response)
                let temp=JSON.parse(JSON.stringify(response.data.data))
                that.tableData=temp
                that.page.totalResult=that.tableData.length
                that.loading=false
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
        className:null,
        classId: null,
        teacherId: null,
        engineerId:null,
        teachingPlanId: null
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent (row) {
      this.formData = {
        className:row.className,
        teacherId: row.teacherId,
        classId: row.classId,
        teachingPlanId: row.teachingPlanId,
        engineerId: row.engineerId
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
        axios.delete('/api/v1/manage/class?classId='+row.classId,)
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
      console.log(this.formData)
      setTimeout(() => {
        const $table = that.$refs.xTable
        that.submitLoading = false
        that.showEdit = false
        if (that.selectRow) {
//修改表单
          console.log('edit')
          axios.put('/api/v1/manage/class',{
            classId:that.formData.classId,
            className:that.formData.className,
            teacherId: that.formData.teacherId,
            engineerId:that.formData.engineerId,
            teachingPlanId:that.formData.teachingPlanId
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

          axios.post('/api/v1/manage/class',{
            className:that.formData.className,
            teacherId: that.formData.teacherId,
            engineerId:that.formData.engineerId,
            teachingPlanId:that.formData.teachingPlanId
          })
              .then(function (response) {

                    VXETable.modal.message({ content:response.data.data, status: 'success' })
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
    let that=this
    this.refresh()
  }



}


</script>

<style scoped>

</style>