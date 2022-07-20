<template>
  <div >
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
        <p v-if="headLineData.todayTodo==null" style="color: black;font-size: larger">
          暂无任务
        </p>
        <p v-if="headLineData.todayTodo!=null" style="color: black;font-size: larger">
          有任务
        </p>
      </div>
      <div>
        <p style="color: black;font-size: smaller">
          当前阶段
        </p>
        <p style="color: black;font-size: larger">
          Day {{ headLineData.stage }}
        </p>

      </div>
      <div>
        <p style="color: black;font-size: smaller">
          代码行数
        </p>
        <p style="color: black;font-size: larger">
          {{ headLineData.lineCount }} 行
        </p>


      </div>

      <div>
        <p style="color: black;font-size: smaller">
          项目名称
        </p>
        <p style="color: black;font-size: larger">
          {{ headLineData.name }}
        </p>

      </div>
      <div>
        <p style="color: black;font-size: smaller">
          开发语言
        </p>
        <p style="color: black;font-size: larger">
          {{ headLineData.language }}
        </p>
      </div>

    </div>

  <div class="management">
    <div class="codePlan">
      <div class="code">
          <div style="display: flex;flex-direction: row;justify-content: space-between;">
            <p style="margin-left: 10px;">
              代码质量
            </p>
            <p style="margin-right: 10px;color: gray;font-size: small;">
              查看更多>
            </p>
          </div>
      </div>
      <div class="plan">
        <div style="display: flex;flex-direction: row;justify-content: space-between;">
          <p style="margin-left: 10px;">
            教学计划
          </p>
          <p style="margin-right: 10px;color: gray;font-size: small;">
            查看更多>
          </p>
        </div>
      </div>

    </div>
    <div class="calender">
      <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
        <p style="margin-left: 10px;">
          日程表
        </p>
        <p style="margin-right: 10px;color: gray;font-size: small;">
          查看更多>
        </p>
      </div>
    </div>

  </div>
  <div class="study">
    <div class="score">
      <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
        <p style="margin-left: 10px;">
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
    <div class="content">
      <div style="display: flex;flex-direction: row;justify-content: space-between; align-items: center">
        <p style="margin-left: 10px;">
          项目选题
        </p>
        <p style="margin-right: 10px;color: gray;font-size: small;">
          查看更多>
        </p>
      </div>
    </div>
    <div class="statistics">
      <div style=" display: flex;flex-direction: row;justify-content: space-between;align-items: center">
        <p style="margin-left: 10px;">
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
      <p style="margin-left: 10px;">
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
      <p style="margin-left: 10px;">
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
        name: '云驾约',
        language: 'java',
        lineCount: 200
      },
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
        userName: 'zhw'
      }

  },
  methods: {
    test() {
      this.headLineData.todayTodo = 1
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
    navigateTo(url){
      window.open(url)
    }

  },
  mounted() {
    this.getLoadEcharts1();
    this.getLoadEcharts2();
    this.getLoadEcharts3();
  },
}
</script>

<style scoped>
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
  background: linear-gradient(#409EEF,white,white,white, white, white);
}

.headline div:nth-child(2) {
  background: linear-gradient(#efb540,white,white,white, white, white);
}

.headline div:nth-child(3) {
  background: linear-gradient(#ff9aa3,white,white,white, white, white);
}

.headline div:nth-child(4) {
  background: linear-gradient(#c78eff,white,white,white, white, white);
}

.headline div:nth-child(5) {
  background: linear-gradient(#6cfa34,white,white,white, white, white);
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
  background-color: #42b983;
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
background-color: #409EEF;
  margin-bottom: 10px;
}
.plan{
  flex: 1;
  background-color: #788c3f;

}
.study{
  display: flex;

}
.score{
  flex: 1;
  aspect-ratio: 1;
  background-color:white;
  margin: 10px;
}
.content{
  flex: 1;
  aspect-ratio: 1;
  background-color: #C6F3F8;
  margin: 10px;
}
.statistics{
  flex: 1;
  aspect-ratio: 1;
  background-color: white;
  flex-direction: column;
  margin: 10px;
}
.submit{
  background-color: white;
  aspect-ratio: 3;
  margin: 10px;
}
.library{
  aspect-ratio: 5;
  background-color: white;
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


</style>