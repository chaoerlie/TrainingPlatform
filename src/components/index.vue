<template>
  <div style="border-radius: 0; ">
<!--    <div class="info">-->
<!--      <div >-->
<!--        <img class="avatar" src="https://img-blog.csdnimg.cn/20201014180756926.png?x-oss-process=image/resize,m_fixed,h_64,w_64" />-->
<!--      </div>-->
<!--      <div class="detailinfo">-->
<!--        <p>Hi <strong>{{userName}}</strong> </p>-->
<!--        <p> 欢迎回来 </p>-->
<!--      </div>-->
<!--      <p style="margin-right: 10px;color: gray;font-size: small;">-->
<!--        查看更多>-->
<!--      </p>-->
<!--    </div>-->
    <div class="headline">

      <div v-on:click='test()'>
        <p style="color: black;font-size: smaller">
          今日任务
        </p>
        <p  style="color: black;font-size: large">
          学习springBoot框架
        </p>
      </div>
      <div>
        <p style="  color: black;font-size: smaller">
          当前阶段
        </p>
        <p style="color: black;font-size: large">
          Day {{ headLineData.stage }}
        </p>

      </div>
      <div>
        <p style="color: black;font-size: smaller">
          代码行数
        </p>
        <p style="color: black;font-size: large">
          {{ headLineData.lineCount }} 行
        </p>


      </div>

      <div>
        <p style="color: black;font-size: smaller">
          项目名称
        </p>
        <p style="color: black;font-size: large">
          {{ headLineData.name }}
        </p>

      </div>
      <div>
        <p style="color: black;font-size: smaller">
          开发语言
        </p>
        <p style="color: black;font-size: large">
          {{ headLineData.language }}
        </p>
      </div>

    </div>

  <div class="management">
    <div class="codePlan">
      <div class="code">
          <div style="display: flex;flex-direction: row;justify-content: space-between;">
            <p style="margin-left: 29px;">
              代码质量
            </p>
            <p style="margin-right: 10px;color: gray;font-size: small;">
              查看更多>
            </p>
          </div>
        <div class="STchartContainer" style="align-items: center; display: flex;">
          <div id='echart4'></div>
        </div>
      </div>
      <div class="plan" style="text-align: center">
        <div style="display: flex;flex-direction: row;justify-content: space-between;">
          <p style="margin-left: 29px;margin-top: 12px">
            教学计划
          </p>
          <p style="margin-right: 10px;color: gray;font-size: small;">
            查看更多>
          </p>
        </div>
        <h3 > 今日任务: </h3>
        <p> 学习springBoot框架 </p>
        <h3> 今日作业: </h3>
        <p style="color: red"> 待提交 </p>


      </div>

    </div>
    <div class="calender" style="text-align: left">
<!--      <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">-->
<!--        <p style="margin-left: 18px;margin-top: 8px">-->
<!--          日程表-->
<!--        </p>-->
<!--        <p style="margin-right: 10px;color: gray;font-size: small;">-->
<!--          查看更多>-->
<!--        </p>-->
<!--      </div>-->
      <div style="display: flex;flex-direction: row;justify-content: space-between; align-items: center">
        <p style="margin-left: 29px;">
          项目选题
        </p>
        <p style="margin-right: 10px;color: gray;font-size: small;">
          查看更多>
        </p>
      </div>
      <h3 style="margin: 5px">项目名称:</h3>
      <p style="margin: 5px"> 驾培宝 </p>
      <h3 style="margin: 5px">项目难度:</h3>
      <p style="margin: 5px"><el-icon><StarFilled /></el-icon><el-icon><StarFilled /></el-icon><el-icon><StarFilled /></el-icon><el-icon><StarFilled /></el-icon><el-icon><Star /></el-icon></p>
      <h3 style="margin: 5px">项目描述:</h3>
      <p style="margin: 5px ;font-weight: lighter"> 随着驾校学员的增多，驾校与教练的工作量增大，传统的口头或消息预约方式会带来许多不便。学员在与教练通过微信或电话预约时，很可能会出现因为未及时接收对方的消息导致预约周期增长或预约失效，或是因为不清楚对方的时间安排而无法做出有效的预约。为解决这些因预约带来的麻烦，我们准备开发基于教练与学生双端的驾校预约系统，让教练将自己的开课时间安排可视化地展示出来，学生可以根据自己的时间选择适合自己的时间与练车方式。
      </p>
    </div>

  </div>
  <div class="study">
    <div class="score">
      <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
        <p style="margin-left: 29px;">
          阶段成绩
        </p>
        <p style="margin-right: 10px;color: gray;font-size: small;">
          作业提交>
        </p>
      </div>
      <div class="SCchartContainer" style="align-items: center; display: flex;">
        <div id='echart3'></div>
      </div>


    </div>
    <div class="statistics">
      <div style=" display: flex;flex-direction: row;justify-content: space-between;align-items: center">
        <p style="margin-left: 29px;">
          代码统计
        </p>
        <p style="margin-right: 10px;color: gray;font-size: small;">
          查看更多>
        </p>
      </div>
      <div class="STchartContainer" style="align-items: center; display: flex;">
        <div id='echart'></div>
      </div>
    </div>
  </div>
  <div class="submit">
    <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
      <p style="margin-left: 29px;margin-top: 12px">
        代码提交情况
      </p>
      <p style="margin-right: 10px;color: gray;font-size: small;">
        查看更多>
      </p>
    </div>
    <div class="SBchartContainer" style="align-items: center; display: flex; ">
      <div id='echart2'></div>
    </div>
  </div>

  <div class="library">
    <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
      <p style="margin-left: 19px;margin-top: 8px">
        知识库
      </p>
      <p style="margin-right: 10px;color: gray;font-size: small;">
        查看更多>
      </p>
    </div>
    <div style="display: flex;justify-content: space-evenly">


        <div @click="navigateTo('https://img1.baidu.com/it/u=1157018303,217422893&fm=253&fmt=auto&app=138&f=JPG?w=232&h=217')" style="width: 7%;display: flex;flex-direction: column">
          <img style="width: 100%;aspect-ratio: 1" src="https://img1.baidu.com/it/u=1157018303,217422893&fm=253&fmt=auto&app=138&f=JPG?w=232&h=217" />
          Eclipse
        </div>

      <div @click="navigateTo('https://www.jetbrains.com/idea/')" style="width: 7%;display: flex;flex-direction: column">
        <img style="width: 100%;aspect-ratio: 1" src="https://img1.baidu.com/it/u=3290395696,45955254&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500" />
        Idea
      </div>
      <div @click="navigateTo('https://code.visualstudio.com/')" style="width: 7%;display: flex;flex-direction: column">
        <img style="width: 100%;aspect-ratio: 1" src="https://img2.baidu.com/it/u=2210660981,2636807341&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500" />
        VSCode
      </div>
      <div @click="navigateTo('https://www.jetbrains.com/webstorm/')" style="width: 7%;display: flex;flex-direction: column">
        <img style="width: 100%;aspect-ratio: 1" src="https://img0.baidu.com/it/u=788127124,3958246363&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500" />
        WebStorm
      </div>

    </div>



  </div>

  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "index",
  data() {
    return {
      headLineData: {
        todayTodo: null,
        stage: 1,
        name: '驾培宝',
        language: 'java html',
        lineCount: 5774
      },
      attdendances: [
        {time: '2022-07-11', exactTime: '09:21:21', status: 'signed'},
        {time: '2022-07-12', exactTime: '09:21:21', status: 'late'},
        {time: '2022-07-13', exactTime: '', status: 'absence'},
        {time: '2022-07-14', exactTime: '', status: 'dayoff'},
        {time: '2022-07-15', exactTime: '09:21:21', status: 'signed'},
        {time: '2022-07-16', exactTime: '09:21:21', status: 'signed'},
      ],
      SToptions:{
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: 'zhw'
              },
              {
                value: 234,
                name: 'ljy'
              },
              {
                value: 148,
                name: 'hys'
              },
              {
                value: 148,
                name: 'zh'
              }
            ],
            radius: '50%'
          }
        ],

      },
      SBoptions: {
        legend: {
          data: ['zhw', 'ljy', 'hys', 'zh'],
        },
          xAxis: {
            type: 'category',
            data: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],   // x轴数据
            name: '日程',
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18
            }
          },
          yAxis: {
            type: 'value',
            name: '代码量',
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18
            }
          },
          label: {},
          tooltip: {
            trigger: 'axis'   // axis   item   none三个值
          },
          series: [
            {
              name: 'zhw',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
            },
            {
              name: 'ljy',
              data: [620, 711, 823, 934, 1445, 1456, 1178],
              type: 'line'
            },
            {
              name: 'hys',
              data: [612, 920, 1140, 1160, 1190, 1234, 1321],
              type: 'line'
            },
            {
              name: 'zh',
              data: [234, 320, 453, 567, 789, 999, 1200],
              type: 'line'
            }
          ]


        },
      SCoptions : {
      //配置维度的最大值

      radar: {
      name: {
      show: true,
        fontSize: 10,
        color: 'red',

       },
      //   雷达图的指示器，用来指定雷达图中的多个变量（维度）
      indicator: [
        { name: '需求分析', max: '100' },
        { name: '分析设计', max: '100' },
        { name: '项目开发', max: '100' },
        { name: '项目答辩', max: '100' },
      ],
        //radius: 60,// 圆的半径，数组的第一项是内半径，第二项是外半径。
        startAngle: 45,
        // 坐标系起始角度，也就是第一个指示器轴的角度。[ default: 90 ]

      shape: 'circle', //对雷达图形设置成一个圆形,可选 circle:圆形,polygon:多角形(默认)
    },
      series: [
    {
      type: 'radar',
      label: {
      show: true, //显示数值
    },
      areaStyle: {}, //每个雷达图形成一个阴影的面积
      data: [
    {
      name: '我的成绩',
      value: [70, 80, 88, 62],
    },
      ],
    },
      ],

        tooltip : {
          trigger:'axis'},

    },
      SAoptions:{
        xAxis: {
          data: ['可维护性', '可读性', '可扩展性', '灵活性', '可复用性']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [89, 69, 70, 80, 74]
          }
        ],

        tooltip : {
          trigger:'axis'},
      },




        userName: 'zhw'
      }

  },
  methods: {
    test() {
      this.headLineData.todayTodo = 1
    },
    dealMyDateTime(v) {
      console.log(v)
      let len = this.attdendances.length
      let res = ""
      for (let i = 0; i < len; i++) {
        if(this.attdendances[i].time == v)
        {res = this.attdendances[i].exactTime
          break}
      }
      return res
    },
    dealMyDateStatus(v) {
      console.log(v)
      let len = this.attdendances.length
      let res = ""
      for(let i=0; i<len; i++){
        if(this.attdendances[i].time == v) {
          if(this.attdendances[i].status=='signed') this.attdendances[i].status='已签到'
          else if(this.attdendances[i].status=='late') this.attdendances[i].status='迟到'
          else if(this.attdendances[i].status=='absence') this.attdendances[i].status='缺勤'
          else if(this.attdendances[i].status=='dayoff') this.attdendances[i].status='请假'
          res = this.attdendances[i].status
          break
        }
      }
      return res
    },
    getLoadEcharts1() {
      var myChart = echarts.init(document.getElementById('echart'));
      myChart.setOption(
          this.SToptions
      );
    },
    getLoadEcharts2() {
      var myChart = echarts.init(document.getElementById('echart2'));
      myChart.setOption(
          this.SBoptions
      );
    },
    getLoadEcharts3() {
      var myChart = echarts.init(document.getElementById('echart3'));
      myChart.setOption(
          this.SCoptions
      );
    },
    getLoadEcharts4() {
      var myChart = echarts.init(document.getElementById('echart4'));
      myChart.setOption(
          this.SAoptions
      );
    },
    navigateTo(url){
      window.open(url)
    }
  },
  mounted() {
    this.getLoadEcharts1();
    this.getLoadEcharts2();
    this.getLoadEcharts3();
    this.getLoadEcharts4();
  },
}
</script>

<style scoped>
/*@import url("//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css");*/

div{
  border-radius: 20px;
}
.info{
  display: flex;
  flex-direction: row;
  text-align: left;
  aspect-ratio: 20;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 5px;
}
.avatar{
  aspect-ratio: 1;
  height: 100%;
  border-radius: 50%;
}
.avatar2{

  height: 20px;
  width: 20px;
  border-radius: 50%;
}
.detailinfo{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
}


.headline {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.headline div {
  flex-direction: column;
  display: flex;
  flex: 1;
  margin: 10px;
  aspect-ratio: 2;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
}

.headline div:nth-child(1) {
  background-image: url("https://s1.ax1x.com/2022/07/18/job37V.png");
  background-repeat: no-repeat;
}

.headline div:nth-child(2) {

  background-image: url("https://s1.ax1x.com/2022/07/18/jobytO.png");
  background-repeat: no-repeat;
}

.headline div:nth-child(3) {
  background-image: url("https://s1.ax1x.com/2022/07/18/jobg9e.png");
  background-repeat: no-repeat;
}

.headline div:nth-child(4) {
  background-image: url("https://s1.ax1x.com/2022/07/18/job21H.png");
  background-repeat: no-repeat;
}

.headline div:nth-child(5) {
  background-image: url("https://s1.ax1x.com/2022/07/18/jobRcd.png");
  background-repeat: no-repeat;
}

.management {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.management div {
  border-radius: 20px;

}
.calender{
  flex: 2;
  aspect-ratio: 1;
  background-image: url("https://s1.ax1x.com/2022/07/19/jTV9IS.png");
  background-repeat: no-repeat;
  margin: 10px;
}
.codePlan{
  flex-direction: column;
  display: flex;
  flex: 3;
  aspect-ratio: 1.5;

  margin: 10px;
}
.code{
  flex:1;
  background-image: url("https://s1.ax1x.com/2022/07/19/jTZDtU.png");
  background-repeat: no-repeat;
  margin-bottom: 10px;
}
.plan{
  flex: 1;
  background-image: url("https://s1.ax1x.com/2022/07/19/jTe75T.png");
  background-repeat: no-repeat;

}
.study{
  display: flex;

}
.score{
  flex: 1;
  aspect-ratio: 1;
  background-image: url("https://s1.ax1x.com/2022/07/19/jTZDtU.png");
  background-repeat: no-repeat;
  margin: 10px;
}
.content{
  flex: 1;
  aspect-ratio: 1;
  background-image: url("https://s1.ax1x.com/2022/07/19/jTZDtU.png");
  background-repeat: no-repeat;
  margin: 10px;
}
.statistics{
  flex: 1;
  aspect-ratio: 1;
  flex-direction: column;
  background-image: url("https://s1.ax1x.com/2022/07/19/jTZDtU.png");
  background-repeat: no-repeat;
  margin: 10px;
}
.submit{
  aspect-ratio: 3;
  background-image: url("https://s1.ax1x.com/2022/07/19/jTmrQJ.png");
  background-repeat: no-repeat;
  margin: 10px;
}
.library{
  aspect-ratio: 5;
  background-color: white;
  background-image: url("https://s1.ax1x.com/2022/07/19/jTV9IS.png");
  background-repeat: no-repeat;
  margin: 10px;
}
.STchartContainer{
  width: 100%;
  height: 100%;
}
.SBchartContainer{
  width: 100%;
  height: 100%;
}
.SCchartContainer{
  width: 100%;
  height: 100%;
}
#echart {
  width: 100%;
  height: 100%;
}
#echart2 {
  width: 100%;
  height: 100%;
}
#echart3 {
  width: 100%;
  height: 100%;
}
#echart4 {
  width: 100%;
  height: 120%;
}
#echart5 {
  width: 100%;
  height: 100%;
}


</style>