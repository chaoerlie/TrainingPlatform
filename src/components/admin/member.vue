<template>
  <h1> 用户管理 </h1>
  <vxe-toolbar>
    <template #buttons>
      <vxe-button icon="fa fa-plus" @click="insertEvent()">新增用户</vxe-button>
      <vxe-button icon="fa fa-plus" @click="refresh()">刷新</vxe-button>
    </template>

  </vxe-toolbar>
  <vxe-table
      v-loading="loading"
      border
      resizable
      show-overflow
      ref="xTable"
      height="500"
      :row-config="{isHover: true}"
      :data="tableData.slice( (page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)"
      :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
      @cell-dblclick="cellDBLClickEvent">
    <vxe-column type="seq" width="40" ></vxe-column>
    <vxe-column field="username" title="Name" sortable></vxe-column>
    <vxe-column field="userId" title="Id" sortable></vxe-column>
    <vxe-column field="role" title="Role" sortable :filters="[{value:'学生',label:'学生'},{value:'老师',label:'老师'},{value:'工程师',label:'工程师'}]"></vxe-column>
    <vxe-column title="操作" show-overflow>
      <template #default="{ row }">
        <vxe-button type="text"   @click="editEvent(row)"><i style="font-size: 20px" class="vxe-icon--edit-outline"></i></vxe-button>
        <vxe-button type="text"  @click="removeEvent(row)"><i style="font-size: 20px" class="vxe-icon--error"></i></vxe-button>
      </template>
    </vxe-column>
  </vxe-table>
  <vxe-pager
      align="left"
      background
      :current-page.sync="page.currentPage"
      :page-size.sync="page.pageSize"
      :total="page.totalResult"
      :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
      @page-change="handlePageChange">
  </vxe-pager>

  <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
    <template #default>
      <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
        <vxe-form-item title="Basic information" title-align="left" :title-width="200" :span="24" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
        <vxe-form-item field="username" title="Name" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.username" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>

        <vxe-form-item field="userId" title="Id" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.userId" placeholder="请输入id"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="role" title="Role" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-select v-model="data.role" transfer>
              <vxe-option v-for="item in roleList" :key="item.value" :value="item.label" :label="item.label"></vxe-option>
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
        // { userId: 10001, username: 'zhw', role: '教师', sex: '0', class: 28 },
        // { userId: 10002, username: 'ljy', role: '教师', sex: '1', class: 22 },
        // { userId: 10004, username: 'zh', role: '教师', sex: '1', class: 23 },
        // { userId: 10005, username: 'zh', role: '教师', sex: '1', class: 23 },
        // { userId: 10006, username: 'zh', role: '教师', sex: '1', class: 23 },
        // { userId: 10007, username: 'zh', role: '教师', sex: '1', class: 23 },
        // { userId: 10008, username: 'zh', role: '教师', sex: '1', class: 23 },
        // { userId: 10009, username: 'zh', role: '教师', sex: '1', class: 23 },
        // { userId: 10010, username: 'zh', role: '教师', sex: '1', class: 23 },
        // { userId: 10011, username: 'zh', role: '教师', sex: '1', class: 23 },
      ],
      selectRow: null,
      showEdit: false,
      roleList: [
        { label: '学生', value: 0 },
        { label: '老师', value: 1 },
        { label: '工程师', value: 2 },
        { label: '管理员', value: 3}
      ],
      formData: {
        username:null,
        userId: 677,
        role: null,
      },
      formRules: {
        username: [
          { required: true, message: '请输入名称' },
        ],
        userId: [
          { required: true, message: '请输入Id' }
        ]
      },
      page: {
        currentPage: 1,
        pageSize: 100,
        totalResult: 0
      },
      loading:true
    }
  },
  methods: {
    refresh(){
      let that=this
      that.loading=true
      axios.get('/api/v1/manage/user/list')
          .then(function (response) {
            console.log(89798)
                console.log(response)
                console.log(response.data.data)
                let temp=JSON.parse(JSON.stringify(response.data.data))
                for(let i=0;i<temp.length;i++)
                {
                  temp[i].role=convertE2C(temp[i].role)
                  console.log(convertE2C(temp[i].role))
                }
                that.tableData=temp
                that.page.totalResult=that.tableData.length
                that.loading=false
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
    },

    handlePageChange ({ currentPage, pageSize }) {
      this.page.currentPage = currentPage
      this.page.pageSize = pageSize
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
    let that=this
    this.refresh()
  }



}


</script>

<style scoped>

</style>