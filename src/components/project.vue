<template>
  <link href="/src/assets/buttons.min.css" rel="stylesheet" type="text/css"/>
  <link href="/src/assets/open-props.min.css" rel="stylesheet" type="text/css"/>
  <link href="/src/assets/normalize.min.css" rel="stylesheet" type="text/css"/>
  <div>
    <vxe-modal v-model="showEdit" :title="'修改/申请'" width="800" min-width="600" min-height="300" :loading="submitLoading"
               resize destroy-on-close>
      <template #default>
        <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
          <vxe-form-item title="Project information" title-align="left" :title-width="200" :span="24"
                         :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
          <vxe-form-item field="name" title="项目名称：" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.name" placeholder="请输入项目名称"></vxe-input>
            </template>
          </vxe-form-item>

          <vxe-form-item field="difficulty" title="难度系数：" :span="24" :item-render="{}">
            <template #default={data}>
              <vxe-select v-model="data.difficulty" placeholder="请选择难度系数">
                <vxe-option value="1" label="1"></vxe-option>
                <vxe-option value="2" label="2"></vxe-option>
                <vxe-option value="3" label="3"></vxe-option>
                <vxe-option value="4" label="4"></vxe-option>
                <vxe-option value="5" label="5"></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item field="technologyRequirement" title="所用技术：" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.technologyRequirement" placeholder="请输入所用技术"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="language" title="开发语言：" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.language" placeholder="请输入开发语言"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="description" title="项目描述：" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.description" placeholder="请输入项目描述"></vxe-input>
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
<div style="text-align: center">
  <div class="box card" style="flex-direction: column ;width: 70%">
    <mydiv class="hero" style="text-align: center;margin-top: 30px;margin-bottom: 40px">
      项目中心
    </mydiv>

    <mydiv class="text1" style="text-align: left;margin-bottom: 20px;display: flex;flex-direction: row">
      <div style="font-weight: bold;color: #00d9f5;font-size: 40px">|</div>
      <div style="margin-top: 10px">项目选题</div>
      <button @click="editEvent" type="button" class="text2" style="margin-left: 400px">修改</button>
      <button @click="insertEvent" type="button" class="text2" style="margin-left: 20px">申请</button>
    </mydiv>
    <div
        style="width:90%;border-radius: var(--radius-conditional-3);border: var(--border-size-1) solid var(--gray-5);">
      <mydiv class="text2"
             style="text-align: left;margin-left: 80px;display:flex;flex-direction: row;margin-top: 20px">
        <div style="width: 40%">
          项目名称：{{ project.name }}
        </div>
        <div style="width: 40%">
          难度系数：{{ project.degreeOfDifficulty }}
        </div>
      </mydiv>
      <mydiv class="text2" style="text-align: left;margin-left:80px;display:flex;flex-direction: row">
        <div style="width: 40%">
          所用技术：{{ project.technologyRequirement }}
        </div>
        <div style="width: 40%">
          开发语言：{{ project.language }}
        </div>
      </mydiv>
      <div class="text2" style="text-align: left;margin-left: 80px;display:flex;flex-direction: column;width: 90%">
        <div style="width: 80%;height: 150px">
          项目描述：{{ project.description }}
        </div>
      </div>
    </div>
    <mydiv class="text1"
           style="margin-top:20px;text-align: left;margin-bottom: 20px;display: flex;flex-direction: row">
      <div style="font-weight: bold;color: #00d9f5;font-size: 40px">|</div>
      <div style="margin-top: 10px">项目组配置</div>
    </mydiv>
    <mydiv class="text2"
           style="margin-bottom:20px;height: 300px;display: flex;flex-direction: column;;border-radius: var(--radius-conditional-3);border: var(--border-size-1) solid var(--gray-5);">
      <div style="text-align: left;margin-left: 50px;margin-bottom: 20px;margin-top: 10px">
        小组成员:
      </div>
      <li v-for="student in students" :key="student.name"
          style="display: flex;flex-direction: row;padding: 10px;text-align: left;">
        <div style="margin-left:80px;width: 30%">
          姓名:{{ student.name }}
        </div>
        <div style="" class="relative">
          邮箱:{{ student.email }}
        </div>
      </li>

    </mydiv>
    <mydiv class="text1" style="text-align: left;margin-bottom: 20px;display: flex;flex-direction: row">
      <div style="font-weight: bold;color: #00d9f5;font-size: 40px">|</div>
      <div style="margin-top: 10px">项目进度</div>
    </mydiv>
    <div
        style="width:90%;border-radius: var(--radius-conditional-3);border: var(--border-size-1) solid var(--gray-5);">
      <mydiv class="text2" style="text-align: left;margin-left: 80px;display:flex;flex-direction: row">
        <div style="width: 40%;margin-top: 20px;margin-bottom: 20px">
          项目状态：{{ project.status }}
        </div>
      </mydiv>
      <mydiv class="text2"
             style="text-align: left;margin-left:80px;display:flex;flex-direction: row;margin-top: 20px">
        <div style="width: 40%">
          总代码文件：{{ project.countOfFile }}
        </div>
        <div style="width: 40%">
          开发语言：{{ project.language }}
        </div>
      </mydiv>
      <mydiv class="text2" style="text-align: left;margin-left:80px;display:flex;flex-direction: row">
        <div style="width: 40%">
          代码质量：{{ project.qualityOfCode }}
        </div>
      </mydiv>
    </div>
    <mydiv class="text1"
           style="margin-top:20px;text-align: left;margin-bottom: 20px;display: flex;flex-direction: row">
      <div style="font-weight: bold;color: #00d9f5;font-size: 40px">|</div>
      <div style="margin-top: 10px">项目阶段成绩</div>
    </mydiv>
    <div
        style="width:90%;height:120px;border-radius: var(--radius-conditional-3);border: var(--border-size-1) solid var(--gray-5);">
      <mydiv class="text2" style="text-align: left;margin-left:80px;display:flex;flex-direction: row">
        <div style="width: 40%;margin-top: 20px">
          需求分析成绩：{{ group.requirementAnalysisScore }}
        </div>
        <div style="width: 40%;margin-top: 20px">
          发展成绩：{{ group.developmentScore }}
        </div>
      </mydiv>
      <mydiv class="text2" style="text-align: left;margin-left:80px;display:flex;flex-direction: row">
        <div style="width: 40%;margin-top: 20px">
          设计成绩：{{ group.designScore }}
        </div>
        <div style="width: 40%;margin-top: 20px">
          项目报告成绩：{{ group.reportScore }}
        </div>
      </mydiv>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import axios from "axios";
import {convertC2E} from "../apis/user";
import VXETable from "vxe-table";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      project: {
        name: 'PlatForm',
        degreeOfDifficulty: 5,
        technologyRequirement: "SpringBoot",
        language: 'java',
        description: 'henqiang',
        status: '待审核',
        countOfFile: 10,
        lineOfCode: 1000,
        qualityOfCode: 100
      },
      students: [
        {
          name: 'yolun',
          email: '1046477352@qq.com'
        },
        {
          name: 'hys',
          email: 'yolun@qq.com'
        }
      ],
      group: {
        requirementAnalysisScore: 100,
        designScore: 100,
        developmentScore: 100,
        reportScore: 100,
      },
      cacheData:{
        id:1,
        name: 'Platform',
        degreeOfDifficulty: 5,
        technologyRequirement: 'SpringBoot',
        language: 'java',
        description: '随着驾校学员的增多，驾校与教练的工作量增大，传统的口头或消息预约方式会带来许多不便。学员在与教练通过微信或电话预约时，很可能会出现因为未及时接收对方的消息导致预约周期增长或预约失效，或是因为不清楚对方的时间安排而无法做出有效的预约。为解决这些因预约带来的麻烦，我们准备开发基于教练与学生双端的驾校预约系统，让教练将自己的开课时间安排可视化地展示出来，学生可以根据自己的时间选择适合自己的时间与练车方式。'
      },
      formData: {
        id:1,
        name: 'Platform',
        degreeOfDifficulty: 5,
        technologyRequirement: 'SpringBoot',
        language: 'java',
        description: '随着驾校学员的增多，驾校与教练的工作量增大，传统的口头或消息预约方式会带来许多不便。学员在与教练通过微信或电话预约时，很可能会出现因为未及时接收对方的消息导致预约周期增长或预约失效，或是因为不清楚对方的时间安排而无法做出有效的预约。为解决这些因预约带来的麻烦，我们准备开发基于教练与学生双端的驾校预约系统，让教练将自己的开课时间安排可视化地展示出来，学生可以根据自己的时间选择适合自己的时间与练车方式。'
      },
      formRules: {
        name: [
          {required: true, message: '请输入项目名称'},
        ],
        difficulty: [
          {required: true, message: '请选择难度系数'},
        ],
        technologyRequirement: [
          {required: true, message: '请输入所用技术'}
        ],
        language: [
          {required: true, message: '请输入开发语言'}
        ],
        description: [
          {required: true, message: '请输入项目描述'}
        ]
      },
      selectRow: null,
      showEdit: false,
      submitLoading: false
    }
  },
  methods: {
    refresh(){
      let that=this
      console.log(234)
      axios.get('/api/v1/project')
          .then(function (response) {
                that.project=response.data.data
              }
          )
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
    },
    insertEvent() {
      this.formData = {
        name: '',
        degreeOfDifficulty: '',
        technologyRequirement: '',
        language: '',
        description: '',
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent(){
      this.formData={
        name:this.cacheData.name,
        degreeOfDifficulty: this.cacheData.degreeOfDifficulty,
        technologyRequirement: this.cacheData.technologyRequirement,
        language: this.cacheData.language,
        description: this.cacheData.description
      }
      this.selectRow = true
      this.showEdit = true
    },
    submitEvent() {
      let that = this
      this.submitLoading = true
      setTimeout(() => {
        const $table = that.$refs.xTable
        that.submitLoading = false
        that.showEdit = false
        if (that.selectRow) {
          //修改表单
          axios.put('/api/v1/project', {
            projectId:that.formData.id,
            name:that.formData.name,
            degreeOfDifficulty: that.formData.degreeOfDifficulty,
            technologyRequirement: that.formData.technologyRequirement,
            language: that.formData.language,
            description: that.formData.description
          })
              .then(function (response) {
                    VXETable.modal.message({content: '修改成功', status: 'success'})
                    Object.assign(that.selectRow, that.formData)
                    console.log(that.formData)
                    that.refresh()
                  }
              )
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });

        } else {
          //新增元素
          console.log({
            name:this.cacheData.name,
            degreeOfDifficulty: this.cacheData.degreeOfDifficulty,
            technologyRequirement: this.cacheData.technologyRequirement,
            language: this.cacheData.language,
            description: this.cacheData.description
          })
          axios.post('/api/v1/project', {
            name:that.formData.name,
            degreeOfDifficulty: that.formData.degreeOfDifficulty,
            technologyRequirement: that.formData.technologyRequirement,
            language: that.formData.language,
            description: that.formData.description
          })
              .then(function (response) {
                console.log(response)
                    VXETable.modal.message({content: '新增申请成功', status: 'success'})
                    $table.insert(that.formData)
                    that.refresh()
                  }
              )
              .catch(function (error) { // 请求失败处理
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

@import '/src/assets/buttons.min.css';
@import '/src/assets/open-props.min.css';

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.box {
  background: #fff;
  margin: 20px auto;
  width: 60%;
  height: 1500px;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.card {
  box-shadow: var(--shadow-4);

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

.text1 {
  line-height: var(--font-lineheight-1);
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-9);
  font-family: var(--font-mono);
}

.text2 {
  line-height: var(--font-lineheight-1);
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-9);
  font-family: var(--font-mono);
}

.relative {
  position: relative;
  left: 200px;
}
</style>
