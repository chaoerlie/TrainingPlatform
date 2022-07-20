<template>
  <link href="/src/assets/open-props.min.css" rel="stylesheet" type="text/css"/>
  <div style="margin-top: 70px;margin-bottom: 20px">
    <mydiv class="hero" style="text-align: center;margin-top: 30px;margin-bottom: 40px">
      作业中心
    </mydiv>
  </div>
  <div style="width: 70%;margin:0px auto">
    <vxe-table
        border
        resizable
        height="500"
        :row-config="{isCurrent: true, isHover: true}"
        :data="tableData"
        @cell-click="cellClickEvent">
      <vxe-column>
        <vxe-button status="primary" content="作业评估" @click="ClickEvent"></vxe-button>
      </vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="studentName" title="学生姓名"></vxe-column>
      <vxe-column field="score" title="作业分数"></vxe-column>
      <vxe-column field="submitStatus" title="提交状态"></vxe-column>
      <vxe-column title="操作">
        <template #default="{ row }">
          <template v-if="row.contentUrl==null">
            <vxe-button status="primary" content="打开作业" @click="download" disabled></vxe-button>
          </template>
          <template v-else>
            <vxe-button status="primary" content="打开作业" @click="download(row.contentUrl)"></vxe-button>
          </template>
        </template>
        </vxe-column>
    </vxe-table>
  </div>
  <vxe-modal v-model="showEdit" :title="'分数评估'" width="800" min-width="600" min-height="300" :loading="submitLoading"
             resize destroy-on-close>
    <template #default>
      <vxe-form :data="tempData" title-align="right" title-width="100" @submit="submitEvent">
        <vxe-form-item field="score" title="分数" :span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-input v-model="data.score" placeholder="请输入分数"></vxe-input>
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
import axios from "axios";
import {convertC2E, convertE2CForStatus, convertE2CForSubmit} from "../../apis/user";
import VXETable from "vxe-table";

export default {
  name: "homework",
  data() {
    return {
      showDetails: false,
      detailData: [],
      submitLoading: false,
      homeworkId: 9,
      tableData: [],
      showEdit: false,
      tempData: []
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.homeworkId=this.$addition.homeworkId
      let that = this

      that.loading = true
      axios.get('/api/v1/homework/record?homeworkId=' + this.homeworkId)
          .then(function (response) {
                console.log(response)
                console.log(response.data.data)
                let temp = JSON.parse(JSON.stringify(response.data.data))
                for (let i = 0; i < temp.length; i++) {
                  temp[i].submitStatus = convertE2CForSubmit(temp[i].submitStatus)
                  console.log(convertE2CForSubmit(temp[i].submitStatus))
                }
                that.tableData = temp
                console.log(temp)
                that.page.totalResult = that.tableData.length
                that.loading = false
              }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
    },
    meanNum(list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    ClickEvent() {
      this.showEdit = true
    },
    cellClickEvent({row}) {

      this.tempData = row
      console.log(this.tempData)
    },
    download(url) {
      if (url!=null) {
        window.open(url)
      }
    },
    submitEvent() {
      let that = this
      this.submitLoading = true
      setTimeout(() => {
        const $table = that.$refs.xTable
        that.submitLoading = false
        that.showEdit = false//修改表单
        axios.put('/api/v1/homework/mark', {
          homeworkRecordId: that.tempData.homeworkRecordId,
          score: that.tempData.score,
        })
            .then(function (response) {
                  VXETable.modal.message({content: '保存成功', status: 'success'})
                  Object.assign(that.selectRow, that.tableData)
                  console.log(that.tableData)
                  that.refresh()
                }
            )
            .catch(function (error) { // 请求失败处理
              console.log(error);
            });


      }, 500)
    }
  }
}
</script>

<style scoped>
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}

/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}

.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}

.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}

/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}

mydiv {
  width: 90%;
  height: 50px;
}

.hero {
  line-height: var(--font-lineheight-1);
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-9);
  font-family: var(--font-sans);
}
</style>