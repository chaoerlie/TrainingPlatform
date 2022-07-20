<template>
  <link href="/src/assets/buttons.min.css" rel="stylesheet" type="text/css" />
  <link href="/src/assets/open-props.min.css" rel="stylesheet" type="text/css" />
  <link href="/src/assets/normalize.min.css" rel="stylesheet" type="text/css" />
  <div style="margin-top: 20px">
    <div style="width: 60%;display: flex;flex-direction: row;margin-left: 100px">
      <el-avatar :size="100"> {{ things[0].role }} </el-avatar>
      <div style="margin-top: 25px;margin-left: 20px;font-size:30px">
        {{things[0].username}}
      </div>
    </div>
  </div>
  <ul style="height: 400px">
    <div class="box card" style="height: 100px">
      <p>{{ things[0].name }}</p>
      <button type="button" size="small" @click="toggleShowThing(0)">...</button>
    </div>
    <Transition name="slide-fade">
      <div v-if="things[0].isShow">
        <div class="rcorners1 card loaded" style="flex-direction:column">
          <textdiv style="text-align: left">
            姓名：{{ things[0].username }}
          </textdiv>
          <textdiv style="text-align: left">
            角色：{{ things[0].role }}
          </textdiv>
          <textdiv style="text-align: left">
            邮箱：{{ things[0].email }}
          </textdiv>
        </div>
      </div>
    </Transition>
    <div class="box card" style="height: 100px">
      <p>{{ things[1].name }}</p>
      <button type="submit" @click="toggleShowThing(1)">...</button>
    </div>
    <Transition name="slide-fade">
      <div v-if="things[1].isShow">
        <div class="rcorners1 card loaded" style="flex-direction:column">
          <textdiv style="text-align: left">
            班级：{{ things[1].className }}
          </textdiv>
          <textdiv style="text-align: left">
            老师：{{ things[1].teacherName }}
          </textdiv>
          <textdiv style="text-align: left">
            工程师：{{ things[1].engineerName }}
          </textdiv>
        </div>
      </div>
    </Transition>
    <div class="box card" style="height: 100px">
      <p>{{ things[2].name }}</p>
      <button type="submit" @click="toggleShowThing(2)">...</button>
    </div>
    <Transition name="slide-fade">
      <div v-if="things[2].isShow">
        <div class="rcorners2 card loaded" style="flex-direction:column">
          <textdiv style="text-align: left">
            项目名称：{{ things[2].projectName }}
          </textdiv>
          <textdiv style="text-align: left">
            项目状态：{{ things[2].projectStatus }}
          </textdiv>
          <textdiv style="text-align: left">
            项目描述：{{ things[2].description }}
          </textdiv>
          <textdiv style="text-align: left">
            语言：{{ things[2].language }}
          </textdiv>
          <textdiv style="text-align: left">
            项目难度：{{ things[2].degreeOfDifficulty }}
          </textdiv>
          <textdiv style="text-align: left">
            代码行数：{{ things[2].lineOfCode }}
          </textdiv>
          <textdiv style="text-align: left">
            代码质量：{{ things[2].qualityOfCode }}
          </textdiv>
        </div>
      </div>
    </Transition>
    <div class="box card" style="height: 100px">
      <p>{{ things[3].name }}</p>
      <button type="submit" @click="toggleShowThing(3)">...</button>
    </div>
    <Transition name="slide-fade">
      <div v-if="things[3].isShow">
        <div class="rcorners2 card loaded" style="flex-direction:column">
          <textdiv style="text-align: left">
            作业成绩：{{ things[3].homeworkScore }}
          </textdiv>
          <textdiv style="text-align: left">
            需求分析成绩：{{ things[3].requirementAnalysisScore }}
          </textdiv>
          <textdiv style="text-align: left">
            项目发展成绩：{{ things[3].developmentScore }}
          </textdiv>
          <textdiv style="text-align: left">
            设计成绩：{{ things[3].designScore }}
          </textdiv>
          <textdiv style="text-align: left">
            项目报告成绩：{{ things[3].reportScore }}
          </textdiv>
          <textdiv style="text-align: left">
            总成绩：{{ things[3].totalScore }}
          </textdiv>
        </div>
      </div>
    </Transition>
  </ul>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      things: [
        {name: '个人信息', isShow: false, username: 'hys', email: 'yolun@5773.com', role: '学生'},
        {name: '班级信息', isShow: false, className: '1班', teacherName: 'zh', engineerName: 'zyx'},
        {
          name: '项目信息',
          isShow: false,
          projectName: '驾培宝',
          projectStatus: 'unfinished',
          degreeOfDifficulty: 5,
          language: 'java',
          description: '驾校辅助小程序'
            ,
          lineOfCode: 1000,
          qualityOfCode: 100
        },
        {
          name: '成绩',
          isShow: false,
          homeworkScore: 100,
          requirementAnalysisScore: 100,
          designScore: 100,
          developmentScore: 100,
          reportScore: 100,
          totalScore: 100
        }
      ]
    }
  },
  methods: {
    toggleShowThing(index) {
      this.things[index].isShow = !this.things[index].isShow
      console.log("success")
    }
  }

}
</script>

<style scoped>
/*@import './src/assets/normalize.min.css';*/
/*@import './src/assets/open-props.min.css';*/
.box {
  background: #fff;
  margin: 20px auto;
  width: 70%;
  height: 30px;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


p, h3 {
  margin: 0;
  padding: 0;
}

ul {
  height: 1000px;
  background: #fff;
}

.rcorners1 {
  margin: 20px auto;
  border-radius: 15px;
  background: #fff;
  padding: 20px;
  width: 70%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rcorners2 {
  margin: 20px auto;
  border-radius: 15px;
  background: #fff;
  padding: 20px;
  width: 70%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

textdiv {
  width: 100%;
  height: 40px;

}

.card {
  box-shadow: var(--shadow-3);


}

.loaded {
  animation: var(--animation-slide-in-right) forwards;
}



.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(400px);
  opacity: 0;
}



</style>
