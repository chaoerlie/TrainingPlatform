<template>
  <div>
    <vxe-modal v-model="showEdit" :title="'编辑&保存'" width="800" min-width="600" min-height="300"  resize destroy-on-close>
      <template #default>
        <vxe-form :data="formData" title-align="right" title-width="100" @submit="submitEvent">

          <vxe-form-item title="Basic information" title-align="left" :title-width="200" :span="24" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
          <vxe-form-item field="dayName" title="教学天名称" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.name" placeholder="请输入名称"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="description" title="教学天描述" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.description" placeholder="请输入描述"></vxe-input>
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

    <vxe-modal v-model="showEdit2" :title="'布置作业'" width="800" min-width="600" min-height="300"  resize destroy-on-close>
      <template #default>
        <vxe-form :data="formData2" title-align="right" title-width="100" @submit="submitEvent2">

          <vxe-form-item title="Basic information" title-align="left" :title-width="200" :span="24" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
          <vxe-form-item field="name" title="作业名称" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.name" placeholder="请输入名称"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="content" title="作业描述" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.content" placeholder="请输入描述"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="deadline" title="截止时间" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.deadline" placeholder="截止日期选择" type="datetime"></vxe-input>
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
    <div  style="margin-left: 5%;margin-bottom:20px;border-style: none;text-align: left">
      <div style="margin-top:10px;margin-bottom:10px;font-size: 20px ">教学计划:</div>
      <div style="margin-bottom:10px;margin-left: 2% ">名称:     {{teachingPlanName}}</div>
      <div style="margin-bottom:10px;margin-left: 2%  ">描述信息:    {{teachingPlanDescription}}</div>
    </div>
    <div id="tab">
      <div style="display: flex" class="tab-tit">
        <a
            v-for="(item,index) in teachingPlan"
            :key="index"
            :class="{'cur': isActive==index+1,active:(isActive==index+1?true:false)}"
            style="flex: 1"
            href="javascript:"
            @click="isActive=index+1;currentDay=item.des"
        >
          Day {{index+1}}
        </a>
      </div>

      <div class="zh" style="border-style: none">
        <div  :is="currentDay" style="text-align: left;border-style: none">

          <div style="display: flex;flex-direction: row;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px">
            <div style="border: none; width: 50%">
              <div style="border-style: none;margin-bottom: 20px">{{teachingPlan[isActive-1].teachingDate}}&nbsp;&nbsp;&nbsp;&nbsp;教学天详情</div>
              <div style="margin-left: 7%;border-style:none;font-size: 15px;margin-bottom: 15px" >名称:  {{teachingPlan[isActive-1].name}}</div>
              <div style="margin-left: 7%;border-style: none;font-size: 15px">描述信息    {{teachingPlan[isActive-1].description}}</div>
            </div>
          </div>
          <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px">
            <zyx style="border-style: none">
              <div style="border-style: none">每日作业</div>
              <div v-for="(homework,index) in teachingPlan"
                   style="border-style: none">
                <div v-if="isActive==index+1" style="border-style: none">
                  <div v-for="(dayhmwk,index2) in homework.dayhm" style="margin-bottom:20px;display: flex;flex-direction: row;width: 97%;align-items: center;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                    <div style="width: 50%;border:none">
                      <div style="border:none">{{dayhmwk.questionContent}}</div>
                      <div style="border:none">deadline:   {{dayhmwk.deadline}}</div>
                    </div>
                    <div style="border: none;color: red;width: 100px" v-if="!isok[index2]"> 未提交 </div>
                    <div style="border: none;color: green;width: 100px" v-else> 已提交 </div>
                    <div style="border-style: none;width: 50%;text-align: end">
                      <el-button @click="getFile(dayhmwk.homeworkId,index2)" style="margin-top: 10px" type="primary" size="small">
                        <i class="el-icon-upload"></i>提交作业
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>

            </zyx>
          </div>


          <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top: 30px">
            <div style="border-style: none;">每日材料</div>
            <div style="border-style: none;">
              <div v-for="(material,index) in teachingPlan"
                   style="border-style: none;width: 30%"
              >
                <div style="border-style: none"
                     v-if="isActive==index+1">
                  <div v-for="daymtrl in material.daymt"
                       style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 5px;margin: 20px">
                    <el-link @click="jumptoDownload(daymtrl.url)"  style="font-size: 16px;margin-left: 1%">{{daymtrl.name}}</el-link>
                  </div>
                </div>
              </div>

              <div style="border: none; width: 98%;flex-direction: column;display: flex;justify-content: center;align-items: end">
                <el-button @click="addMT" style="margin-top: 10px" type="primary">
                  <i class="el-icon-upload"></i>上传资料
                </el-button>
                <input type="file" ref="file" style="display:none" @change="handleFileUpload2($event)">
              </div>
            </div>
          </div>

        </div>
      </div>


    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";
import VXETable from "vxe-table";

export default {
  name: "Tab",
  data() {
    return{
      showEdit:false,
      currentDay: 'Day1',
      isActive: 1,
      active:'',
      fileList:[],
      formData: {
        id:null,
        teachingPlanId:null,
        name:null,
        description:null,
        teachingDate:null
      },

      teachingPlan:[
        {id:1,day:1,des:'Day1',
          dayhm: [{
            hm:"完成hm1中内容并发送邮件提交",
            id:9}
          ],
          daymt:
              [{mt:"material1",url:'http://www.baidu.com'},
                {mt:"material111",url:'http://www.baidu.com'}
              ],url:'http://www.baidu.com'
        },
        {id:2,day:2,des:'Day2',dayhm: [{hm:"完成hm2中内容并发送邮件提交"},{hm:"观看vue框架教学视频"}],daymt:[{mt:"material2"},{mt:"material111"}],url:'https://www.runoob.com/css3/css3-flexbox.html'},
        {id:3,day:3,des:'Day3',dayhm: [{hm:"完成hm3中内容并发送邮件提交"},{hm:"观看vue框架教学视频"}],daymt:[{mt:"material3"},{mt:"material111"}],url:'https://blog.csdn.net'},
        {id:4,day:4,des:'Day4',dayhm: [{hm:"完成hm4中内容并发送邮件提交"},{hm:"观看vue框架教学视频"}],daymt:[{mt:"material4"},{mt:"material111"}],url:'https://blog.csdn.net'},
        {id:5,day:5,des:'Day5',dayhm: [{hm:"完成hm5中内容并发送邮件提交"},{hm:"观看vue框架教学视频"}],daymt:[{mt:"material5"},{mt:"material111"}],url:'https://blog.csdn.net'},
        {id:6,day:6,des:'Day6',dayhm: [{hm:"完成hm6中内容并发送邮件提交"},{hm:"观看vue框架教学视频"}],daymt:[{mt:"material6"},{mt:"material111"}],url:'https://blog.csdn.net'},
        {id:7,day:7,des:'Day7',dayhm: [{hm:"完成hm7中内容并发送邮件提交"},{hm:"观看vue框架教学视频"}],daymt:[{mt:"material7"},{mt:"material111"}],url:'https://blog.csdn.net'},
        {id:8,day:8,des:'Day8',dayhm: [{hm:"完成hm8中内容并发送邮件提交"},{hm:"观看vue框架教学视频"}],daymt:[{mt:"material8"},{mt:"material111"}],url:'https://blog.csdn.net'},
        {id:9,day:9,des:'Day9',dayhm: [{hm:"完成hm9中内容并发送邮件提交"},{hm:"观看vue框架教学视频"}],daymt:[{mt:"material9"},{mt:"material111"}],url:'https://blog.csdn.net'},
        {id:10,day:10,des:'Day10',dayhm: [{hm:"完成hm10中内容并发送邮件提交"},{hm:"观看vue框架教学视频"}],daymt:[{mt:"material10"},{mt:"material111"}],url:'https://blog.csdn.net'},
      ],
      teachingPlanId:1,
      teachingPlanName:'计划',
      teachingPlanDescription:'这是一个计划',
      classList:[

      ],
      classId:1,
      showEdit2:false,
      formData2:{

      },
      homeworkId:0,
      isok:[false,false,false,false,false,false],
      index:0
    }
  },


  computed: {},
  watch: {
    //监听内容
    classId(value,oldValue) {
      console.log(this.fileList)
      let that = this
      // 第一个参数为新值，第二个参数为旧值，不能调换顺序
      for(let i=0;i<this.classList.length;i++)
      {
        if(this.classList[i].classId==value)
          this.className=this.classList[i].className
      }
      console.log(`新值：${value}`);
      console.log(`旧值：${oldValue}`);
      //获取教学计划
      axios.get('/api/v1/manage/class?classId='+this.classId)
          .then(function (response) {
                console.log(response)
                let temp=JSON.parse(JSON.stringify(response.data.data))
                that.teachingPlanId=temp.teachingPlanId
                //查看具体教学天
                axios.get('/api/v1/plan?teachingPlanId='+that.teachingPlanId)
                    .then(function (response) {
                          console.log('teachingPlan=')
                          console.log(response)
                          let temp=JSON.parse(JSON.stringify(response.data.data[0]))
                          that.teachingPlanDescription=temp.description
                          that.teachingPlanName=temp.name
                          that.name=temp.name
                          //每一天，对应data中一个json对象
                          let newtemp=temp.teachingDays
                          that.teachingPlan=newtemp
                          for(let i=0;i<newtemp.length;i++)
                          {
                            //改
                            newtemp[i].des=newtemp[i].teachingDate,
                                //每天有name,teachingdate,teachingplan
                                newtemp[i].daymt=[]
                            //获取material
                            axios.get('/api/v1/material?teachingDayId='+newtemp[i].id)
                                .then(function (response) {
                                      console.log('teachingDay'+newtemp[i].id)
                                      console.log(response)
                                      newtemp[i].daymt=response.data.data
                                      //获取homework
                                      console.log('classId='+that.classId+"  date="+newtemp[i].teachingDate)
                                      axios.get('/api/v1/homework?classId='+that.classId+'&teachingDate='+newtemp[i].teachingDate)
                                          .then(function (response) {
                                                console.log(response)
                                                newtemp[i].dayhm=response.data.data
                                                that.teachingPlan=newtemp
                                              }
                                          )
                                          .catch(function(error) { // 请求失败处理
                                            console.log(error);
                                          });
                                    }
                                )
                                .catch(function(error) { // 请求失败处理
                                  console.log(error);
                                });

                          }
                          that.teachingPlan=newtemp

                        }
                    )
                    .catch(function(error) { // 请求失败处理
                      console.log(error);
                    });
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });


    },
    isActive(value,oldValue){
      console.log(value+"    "+oldValue)
    }
  },

  methods: {
    attendance(){
      this.$addition.date=this.teachingPlan[this.isActive-1].teachingDate
      this.$addition.classId=this.classId
      router.push('attendance')
    },
    judgeHomework(homeworkId){
      this.$addition.homeworkId=homeworkId
      router.push('homework')
    },
    postHomework(){
      this.formData2={
        name:null,
        classId:this.classId,
        publishTime:this.teachingPlan[this.isActive-1].teachingDate,
        deadline:null,
        content:null
      }
      this.showEdit2=true
    },

    addMT(){
      console.log(this.teachingPlan)
      this.$refs.file.click()
    },
    // 获取文件
    handleFileUpload2(event){
      // 阻止发生默认行为
      event.preventDefault();
      let formData = new FormData()
      let file = this.$refs.file.files[0]
      formData.append('uploadFile',file)
      this.onUpload2(formData)
    },
// 上传文件
    onUpload2 (formData) {
      console.log('teachingDayId:'+this.teachingPlan[this.isActive-1].id)
      console.log(formData)

      let that=this
      axios.post('/api/v1/material/'+that.teachingPlan[this.isActive-1].id,
          formData,{
            headers:{
              'Content-type' : 'multipart/form-data',
            }
          })
          .then(function (response) {
                VXETable.modal.message({ content: response.data.data, status: 'success' })
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
    },
    editDay(){
      console.log(this.isActive)
      this.formData={
        id:this.teachingPlan[this.isActive-1].id,
        teachingPlanId:this.teachingPlanId,
        name:this.teachingPlan[this.isActive-1].name,
        description:this.teachingPlan[this.isActive-1].description,
        teachingDate:this.teachingPlan[this.isActive-1].teachingDate
      }
      this.showEdit=true
    },
    getDays(){
      let that=this
      axios.get('/api/v1/manage/class?classId='+this.classId)
          .then(function (response) {
                console.log(response)
                let temp=JSON.parse(JSON.stringify(response.data.data))
                that.teachingPlanId=temp.teachingPlanId
                //查看具体教学天
                axios.get('/api/v1/plan?teachingPlanId='+that.teachingPlanId)
                    .then(function (response) {
                          console.log('teachingPlan')
                          console.log(response)
                          let temp=JSON.parse(JSON.stringify(response.data.data[0]))
                          that.teachingPlanDescription=temp.description
                          that.teachingPlanName=temp.name
                          that.name=temp.name
                          //每一天，对应data中一个json对象
                          let newtemp=temp.teachingDays
                          that.teachingPlan=newtemp
                          for(let i=0;i<newtemp.length;i++)
                          {
                            //改
                            newtemp[i].des=newtemp[i].teachingDate,
                                //每天有name,teachingdate,teachingplan
                                console.log('我的ID：'+newtemp[i].id)
                            //获取material
                            axios.get('/api/v1/material?teachingDayId='+newtemp[i].id)
                                .then(function (response) {
                                      console.log(response)
                                      newtemp[i].daymt=response.data.data
                                      //获取homework
                                      axios.get('/api/v1/homework?classId='+newtemp[i].id+'&teachingDate='+newtemp[i].teachingDate)
                                          .then(function (response) {
                                                console.log('homework')
                                                console.log(response)
                                                newtemp[i].dayhm=response.data.data
                                                that.teachingPlan=newtemp
                                              }
                                          )
                                          .catch(function(error) { // 请求失败处理
                                            console.log(error);
                                          });
                                    }
                                )
                                .catch(function(error) { // 请求失败处理
                                  console.log(error);
                                });

                          }
                          that.teachingPlan=newtemp

                          setTimeout(function (){that.teachingPlan=newtemp},2000);
                        }
                    )
                    .catch(function(error) { // 请求失败处理
                      console.log(error);
                    });
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });

    },
    getClassList(){
      let that=this
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
    refresh(){
      this.getClassList()
      this.getDays()
    },
    jumptoDownload(url){
      window.open(url)
      //window.location.href = 'http://www.baidu.com';
    },
    submitEvent(){
      this.showEdit=false
      let that=this
      console.log(this.formData)
      axios.put('/api/v1/plan/day',that.formData)
          .then(function (response) {
                console.log('success')
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });

    },
    submitEvent2(){
      this.showEdit2=false
      let that=this
      console.log(this.formData2)
      axios.post('/api/v1/homework',that.formData2)
          .then(function (response) {
                console.log('success')
                VXETable.modal.message({ content: response.data.data, status: 'success' })
                that.refresh()
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
    },
    deleteHomework(id){
      let that=this
      that.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/api/v1/homework',{
          data: {
            homeworkId: id
          }
        })
            .then(function (response) {
                  console.log('success')
                  VXETable.modal.message({ content: response.data.data, status: 'success' })
                  that.refresh()
                }
            )
            .catch(function(error) { // 请求失败处理
              console.log(error);
            });
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消操作'
        });
      });

    },
    getFile (homeworkId,index) {

      this.homeworkId=homeworkId
      this.index=index
      this.$refs.file.click()
    },
// 获取文件
    handleFileUpload(event){
      // 阻止发生默认行为
      event.preventDefault();
      let formData = new FormData()
      let file = this.$refs.file.files[0]
      formData.append('uploadFile',file)
      console.log(formData.get('file'))
      this.onUpload(formData)
    },
// 上传文件
    onUpload (formData) {
      console.log(formData)
      let that=this
      axios.put('/api/v1/homework/submit/'+this.homeworkId,
          formData,{
            headers:{
              'Content-type' : 'multipart/form-data',
            }
          })
          .then(function (response) {
                console.log(response)
            that.isok[that.index]=true
              }
          )
          .catch(function(error) { // 请求失败处理
            console.log(error);
          });
    },
    //新加的method

  },
  mounted: function () {
    this.refresh()
  },

}
</script>
<style scoped>
/*@import url("//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css");*/
#tab{
  width: 90%;
  margin: 0 auto;
}
.tab-tit{
  font-size: 0;
  width: 100%;
}
.tab-tit a{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  background: #ccc;
  color: midnightblue;
  text-decoration: none;
}
.tab-tit .cur{
  background: #c9ef6a;
  color: #fff;
}
.zh div{
  border: 1px solid #ccc;
  margin: 10px;
  /*border-style: none;*/
}

.zh zyx{
  border: 1px solid #ccc;
}

</style>




