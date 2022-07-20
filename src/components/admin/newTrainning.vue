<template>

  <div >
    <h1> 教学计划列表 </h1>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增教学计划</vxe-button>
        <vxe-button icon="fa fa-plus" @click="refresh()">刷新</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
        v-loading="loading"
        border
        resizable
        show-overflow
        ref="xTable"
        :row-config="{isHover: true}"
        :data="tableData"
        @cell-dblclick="cellDBLClickEvent">
      <vxe-column type="seq" width="40"></vxe-column>
      <vxe-column field="planName" title="计划名称"></vxe-column>
      <vxe-column field="planId" title="计划Id"></vxe-column>
      <vxe-column field="startTime" title="起始时间"></vxe-column>
      <vxe-column field="endTime" title="终止时间"></vxe-column>
      <vxe-column title="操作" show-overflow>
        <template #default="{ row }">
          <vxe-button type="text"   @click="editEvent(row)"><i style="font-size: 20px" class="vxe-icon--edit-outline"></i></vxe-button>
          <vxe-button type="text"  @click="removeEvent(row)"><i style="font-size: 20px" class="vxe-icon--error"></i></vxe-button>
        </template>
      </vxe-column>
    </vxe-table>  </div>
  <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" height="600" min-width="600" min-height="500" :loading="submitLoading" resize destroy-on-close>
    <template #default>
      <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="120" @submit="submitEvent">
        <vxe-form-item title="Basic information" title-align="left" :title-width="200" :span="24" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
        <vxe-form-item field="planName" title="教学计划名称" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.planName" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="description" title="教学计划描述" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.description" placeholder="请输入描述"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="startTime" title="起始时间" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.startTime" placeholder="起始日期选择" type="date"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item field="endTime" title="结束时间" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.endTime" placeholder="结束日期选择" type="date"></vxe-input>
          </template>
        </vxe-form-item>
        <!--        <vxe-form-item field="teachingPlanId" title="教学计划id" :span="24" :item-render="{}">-->
        <!--          <template #default="{ data }">-->
        <!--            <vxe-select v-model="data.teachingPlanId" transfer>-->
        <!--              <vxe-option v-for="item in teachingPlanList" :key="item.value" :value="item.id" :label="item.id+'               '+item.label"></vxe-option>-->
        <!--            </vxe-select>-->
        <!--          </template>-->
        <!--        </vxe-form-item>-->
        <vxe-form-item  align="center" title-align="left" :span="24">
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
          planId:1,
          planName:'234',
          description:'234',
          startTime:'2021-1-1',
          endTime:'2022-1-1'
        }
      ],
      selectRow: null,
      showEdit: false,
      formData: {
        planId:1,
        planName:'',
        description:'',
        startTime:'',
        endTime:''
      },
      formRules: {
        planName: [
          { required: true, message: '请输入名称' },
        ],
        description: [
          { required: true, message: '请输入描述' }
        ],
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
    refresh(){
      let that=this
      that.loading=true

      axios.get('/api/v1/plan/all')
          .then(function (response) {
                console.log(89798)
                console.log(response)
                console.log(response.data.data)
            let temp=[]
                for(let i=0;i<response.data.data.length;i++)
                {
                  temp.push({
                    planId:response.data.data[i].teachingPlanId,
                    planName:response.data.data[i].name,
                    description:response.data.data[i].description,
                    startTime:response.data.data[i].startDate,
                    endTime:response.data.data[i].endDate
                  })
                }
                that.tableData=temp
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
    that.loading=false
    },
    cellDBLClickEvent ({ row }) {
      this.editEvent(row)
    },
    insertEvent () {
      this.formData = {
        planId:null,
        planName:null,
        description:null,
        startTime:null,
        endTime:null
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent (row) {
      this.formData = {
        planId:row.planId,
        planName:row.planName,
        description:row.description,
        startTime:row.startTime,
        endTime:row.endTime
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
        axios.delete('/api/v1/plan?teachingPlanId='+row.planId,)
            .then(function (response) {
                  console.log('删除成功')
              console.log(response)
              console.log(response.data.data)
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
          console.log({
            id:that.formData.planId,
            name:that.formData.planName,
            description:that.formData.description,
            startDate:that.formData.startTime,
            endDate:that.formData.endTime
          })
          axios.put('/api/v1/plan',{
            id:that.formData.planId,
            name:that.formData.planName,
            description:that.formData.description,
            startDate:that.formData.startTime,
            endDate:that.formData.endTime
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
            name:that.formData.planName,
            description:that.formData.description,
            startDate:that.formData.startTime,
            endDate:that.formData.endTime
          })
          axios.post('/api/v1/plan',{
            name:that.formData.planName,
            description:that.formData.description,
            startDate:that.formData.startTime,
            endDate:that.formData.endTime
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