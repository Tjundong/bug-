<template>
  <div class="anal4">
    <div class="heads">宝华实验学校2019年上学期七年级期末考试</div>
    <div class="anal-main">
      <div class="subjectFullScoreSettings"  v-if="from.subjectFullScoreSettings.flag">
        <div class="bgColor-head">{{from.subjectFullScoreSettings.name}}</div>
        <div class="subjectFullScoreSettings-main">
          <div v-for="item in from.subjectFullScoreSettings.value" :key="item.name" class="Settings-main">
            {{item.name}}：<el-input-number
              v-model="item.value"
              :min="0"
              :max="120"
              label="描述文字"
            ></el-input-number>
          </div>
          <span>总分满分：{{sum}}</span>
        </div>
      </div>
      <div class="scoreMain">
        <div class="bgColor-head" v-if="from.scoreValiditySettings.flag || from.caliberOfMissingTestStatistics.flag || from.caliberOf0PointsStatistics.flag">分析报表基础设置</div>
        <div class="scoreValiditySettings marginTop" v-if="from.scoreValiditySettings.flag">
          <div class="bgCOLOR-head">{{from.scoreValiditySettings.name}}</div>
          <div class="scoreValiditySettings-main">
            <el-checkbox-group v-model="from.scoreValiditySettings.value">
        <el-checkbox label="1">将0分设置为缺考</el-checkbox>
              <el-checkbox label="2">将缺考有分设置为不缺考</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="scoreValiditySettings" v-if="from.caliberOfMissingTestStatistics.flag">
          <div class="bgCOLOR-head">{{from.caliberOfMissingTestStatistics.name}}</div>
          <div class="scoreValiditySettings-main">
            <el-checkbox-group v-model="from.caliberOfMissingTestStatistics.value">
              <el-checkbox label="1">科目缺考不参与科目统计计算</el-checkbox>
              <el-checkbox label="2">科目缺考不参与总科目计算</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="scoreValiditySettings"  v-if="from.caliberOf0PointsStatistics.flag">
          <div class="bgCOLOR-head">{{from.caliberOf0PointsStatistics.name}}</div>
          <div class="scoreValiditySettings-main">
            <el-checkbox-group v-model="from.caliberOf0PointsStatistics.value">
              <el-checkbox label="1">0分不参与科目统计计算</el-checkbox>
              <el-checkbox label="2">0分不参与总分统计计算</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="advanced">
        <div class="bgColor-head"  v-if="from.firstClassSettings.flag || from.limitedNumberOfPeople.flag || from.roundingNumberSetting.flag">分析报表高级设置 <span v-html="show" @click="cliKshow"></span></div>
        <div class="scoreValiditySettings marginTop" v-show="shows">
          <div class="paddingLR" v-if="from.firstClassSettings.flag">
          <div class="bgCOLOR-head">{{from.firstClassSettings.name}}</div>
            <div class="firstClassSettings">
              <div class="firstClassSettings-left">
                    
                学生成绩人数等级：<el-select v-model="from.firstClassSettings.defaultOption" :placeholder="from.firstClassSettings.defaultOption" @change="changeFirst">
                  <el-option
                    v-for="item in from.firstClassSettings.options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="firstClassSettings-right">
                <div class="ings-right" v-for="item in from.firstClassSettings.value" :key="item.name">
               {{item.name}}：
               <el-input-number v-model="item.value" 
               controls-position="right" 
               :min="1" 
               :max="100 - handleChange + item.value" 
               size="small">
               </el-input-number>
                </div>
              </div>
            </div>
            <div class="limitedNumberOfPeople" v-if="from.limitedNumberOfPeople.flag">
              {{from.limitedNumberOfPeople.name}}：<el-checkbox-group v-model="from.limitedNumberOfPeople.value">
                <el-checkbox label="1">可以超过人数比例限制</el-checkbox>
                <el-checkbox label="2">不得超过人数比例限制</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="limitedNumberOfPeople margRig"  v-if="from.roundingNumberSetting.flag">
             {{from.roundingNumberSetting.name}}：<el-checkbox-group v-model="from.roundingNumberSetting.value">
                <el-checkbox label="1">小数四舍五入</el-checkbox>
                <el-checkbox label="2">小数全舍</el-checkbox>
                <el-checkbox label="3">小数全入</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="levelSettings">
          <div class="bgCOLOR-head" v-if="from.levelSettings.flag">{{from.levelSettings.name}}</div>
          <div class="levelSettings-main">
            <div class="levelSettings-left">
              学生成绩分数等级：<el-select v-model="from.levelSettings.defaultOption" :placeholder="from.levelSettings.defaultOption"  @change="changeLevel">
                <el-option
                  v-for="item in from.levelSettings.options"
                  :key="item.value"
                  :label="item.name"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <div class="levelSettings-right">
            <div class="Settings-right" v-for="item in from.levelSettings.value" :key="item.name">
               {{item.name}}：<el-input v-model="item.value"></el-input>
               <!-- <el-input-number v-model="item.value" 
               controls-position="right" 
               :min="1" 
               :max="100" 
               size="small">
               </el-input-number> -->
              </div>
            </div>
          </div>
          </div>
          <div class="subjectScoreInterval" v-if="from.subjectScoreInterval.flag">
          <div class="bgCOLOR-head">{{from.subjectScoreInterval.name}}</div>
            <div class="subjectScoreInterval-top">
              <div class="subjectScoreInterval-topL">
                分数段间隔数量：<el-input-number
                  v-model="from.subjectScoreInterval.defaultOption"
                  :min="0"
                  :max="100"
                ></el-input-number>
              </div>
              <div class="subjectScoreInterval-topR">
                <el-input v-model="item.value"  v-for="item in from.subjectScoreInterval.value" :key="item.name"></el-input>
              </div>
            </div>
            <div class="subjectScoreInterval-but">*分数段间隔数量填写之后，系统会自动为您
              生成相应数量的间隔，并将总分自动拆分
            </div>
          </div>
          <div class="subjectTotalScoreSetting"  v-if="from.subjectTotalScoreSetting.flag">
          <div class="bgCOLOR-head">{{from.subjectTotalScoreSetting.name}}</div>
          <div class="subjectTotalScoreSetting-main">
            <div class="subjectTotalScoreSetting-topL">
                总分：
              </div>
              <div class="subjectTotalScoreSetting-topR">
                <div v-for="item in from.subjectTotalScoreSetting.value" :key="item.name">
                {{item.name}}<el-input v-model="item.value"></el-input>
                </div>
              </div>
          </div>
              
          </div>
          <!-- v-if="from.academicQualitySetting.flag" -->
          <div class="academicQualitySetting" >
          <div class="bgCOLOR-head">{{from.academicQualitySetting.name}}</div>
          <div class="academicQualitySetting-main">

          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {getall} from '@/assets/api/homeapi'
export default {
  name: "Anal4",
  data() {
    return {
      from:{
        academicQualitySetting:{},
        caliberOf0PointsStatistics:{},
        caliberOfMissingTestStatistics:{},
        firstClassSettings:{},
        levelSettings:{},
        limitedNumberOfPeople:{},
        roundingNumberSetting:{},
        scoreValiditySettings:{},
        subjectFullScoreSettings:{},
        subjectScoreInterval:{},
        subjectTotalScoreSetting:{},
      },
      num: "",
      checkList: "",
      value: "",
      show:"展开<i class='el-icon-arrow-down' />",
      shows:false,
    };
  },
  mounted(){
    this.rout()
  },
  computed:{
    sum(){
     const {subjectFullScoreSettings} = this.from;
     return  subjectFullScoreSettings.value.map(item => item.value).reduce((a,b) => a + b)
    },
       handleChange(){
      const {firstClassSettings} = this.from;
     return firstClassSettings.value && firstClassSettings.value.map(item => item.value).reduce((a,b) => a+b)
     console.log(firstClassSettings.value.map(item => item.value));
    },
  },
  methods: {
    ...mapMutations("userStor", {
      routs: "routs",
    }),
    next(val) {
      this.routs(val);
    },
    cliKshow(){
      this.show == "展开<i class='el-icon-arrow-down' />" ? 
     this.show = "收起<i class='el-icon-arrow-up' />"  : 
     this.show = "展开<i class='el-icon-arrow-down' />";
      this.shows = !this.shows
    },
    async rout(){
      let from = await getall('/setting')
      this.from = from.data.data
      const {scoreValiditySettings ,caliberOfMissingTestStatistics ,caliberOf0PointsStatistics,limitedNumberOfPeople,roundingNumberSetting} = this.from;
     scoreValiditySettings.value = scoreValiditySettings.value && scoreValiditySettings.value.split(',');
     caliberOfMissingTestStatistics.value = caliberOfMissingTestStatistics.value && caliberOfMissingTestStatistics.value.split(',');
     caliberOf0PointsStatistics.value = caliberOf0PointsStatistics.value && caliberOf0PointsStatistics.value.split(',');
     limitedNumberOfPeople.value = limitedNumberOfPeople.value && limitedNumberOfPeople.value.split(',');
     roundingNumberSetting.value = roundingNumberSetting.value && roundingNumberSetting.value.split(',');
      console.log(this.from);
    },
    changeLevel(val){
   const {levelSettings} = this.from;
      levelSettings.value = val.name.split('、').reduce((a,b,index) => {
        a.push({
          name:b,
          value:val.value.split(',')[index]
        });
        return a
      },[])
    },
    changeFirst(val){
      const {firstClassSettings} = this.from;
      firstClassSettings.value = val.split(',').reduce((a,b) => {
        a.push({
          name:b,
          value:0
        });
        return a
      },[])
    }
  },
};
</script>

<style lang='scss'>
.anal4 {
  height: 100%;
  display: flex;
  flex-direction: column;
  .heads {
    background-color: white;
    padding: 10px;
    text-align: center;
    font-size: 19px;
    font-weight: bold;
    border-radius: 0 0 5px 5px;
  }
  .anal-main {
    // flex: 1;
    height: 620px;
    background-color: white;
    margin-top: 10px;
    padding: 10px 20px;
    // box-sizing: border-box;
    overflow-y: scroll;
      &::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  &::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color:  #17c7bba8;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
  }
  &::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 10px;
  }
    .bgColor-head {
      display: flex;
      justify-content: space-between;
      padding: 0 32px;
      color: white;
      height: 35px;
      line-height: 35px;
      background: linear-gradient(to left, #17c7ba 30%, #10bd78 100%);
      &>span{
        cursor: pointer;
      }
    }
    .bgCOLOR-head {
      font-size: 12px;
      padding: 0 26px;
      background-color: #f0f9f6;
      border: 1px #d8e8e2 solid;
      height: 26px;
      line-height: 26px;
    }
    .subjectFullScoreSettings {
      .subjectFullScoreSettings-main {
        display: flex;
        padding: 0 32px;
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        .Settings-main{
          margin-right: 50px;
        }
        .el-input-number {
          width: 100px;
          line-height: 30px;
          .el-input {
            .el-input__inner {
              padding: 0 !important;
            }
          }
          .el-input__inner {
            height: 32px;
            line-height: 32px;
          }
          .el-input-number__decrease,
          .el-input-number__increase {
            width: 23px;
          }
        }
      }
    }
    .scoreMain {
      .marginTop {
        margin-top: 10px;
      }
      .scoreValiditySettings {
        padding: 0 32px;
        .scoreValiditySettings-main {
          padding: 12px 26px;
        }
      }
    }
    .advanced {
      .marginTop {
        margin-top: 10px;
      }
      .scoreValiditySettings {
        padding: 0 32px;
        .paddingLR {
          .firstClassSettings {
            display: flex;
            padding: 12px 26px;
            font-size: 13px;
            .el-select {
              width: 150px;
              .el-input__inner {
                width: 150px;
                height: 30px;
              }
              .el-input__icon {
                line-height: 30px !important;
              }
            }
            .firstClassSettings-right {
              margin-left: 65px;
              display: flex;
              align-items: center;
              .ings-right{
                margin-right: 22px;
                .el-input-number--small{
                  width: 100px;
                }
              }
              // .el-input {
              //   width: 70px;
              //   height: 30px;
              //   .el-input__inner {
              //     padding: 0 3px;
              //     height: 30px;
              //     line-height: 30px;
              //   }
              // }
            }
          }
          .limitedNumberOfPeople {
            display: flex;
            font-size: 13px;
            padding-left: 10px;
            margin: 0 26px;
            margin-bottom: 10px;
            height: 35px;
            line-height: 35px;
            background-color: #f2f2f2;
            .el-checkbox-group{
              margin-left: 60px;
            }
          }
          .margRig{
            .el-checkbox-group{
              margin-left: 34px;
            }
          }
        }
        .levelSettings {
          padding: 12px 0;
            font-size: 12px;

          .levelSettings-main{
            margin-top: 10px;
          display: flex;
            padding: 0 26px;
            align-items: center;
             .el-select {
            width: 220px;
            .el-input__inner {
              width: 220px;
              height: 30px;
            }
            .el-input__icon {
              line-height: 30px !important;
            }
          }
          .levelSettings-right {
            margin-left: 50px;
            display: flex;
            align-items: center;
            .Settings-right{
                margin-right: 22px;
                // .el-input-number--small{
                //   width: 100px;
                // }
            .el-input {
              width: 70px;
              height: 30px;
              .el-input__inner {
                padding: 0 3px;
                height: 30px;
                line-height: 30px;
              }
            }

              }
          }
          }
         
        }
        .subjectScoreInterval {
                  margin-bottom: 10px;
          .subjectScoreInterval-top {
                  padding: 0 32px;

            display: flex;
            height: 50px;
            align-items: center;
            justify-content: space-between;
            .subjectScoreInterval-topL {
              font-size: 12px;
              .el-input-number {
                width: 100px;
                line-height: 30px;
                .el-input {
                  .el-input__inner {
                    padding: 0 !important;
                  }
                }
                .el-input__inner {
                  height: 32px;
                  line-height: 32px;
                }
                .el-input-number__decrease,
                .el-input-number__increase {
                  width: 23px;
                }
              }
            }
            .subjectScoreInterval-topR {
              width: 795px;
              height: 36px;
              line-height: 36px;
              background-color: #f2f2f2;
              .el-input {
                width: 70px;
                height: 30px;
                .el-input__inner {
                  padding: 0 3px;
                  height: 30px;
                  line-height: 30px;
                }
              }
            }
          }
          .subjectScoreInterval-but{
            color: #ea565d;
            font-size: 12px;
          }
        }
        .subjectTotalScoreSetting{
            .subjectTotalScoreSetting-main{
          padding: 15px 26px;
          display: flex;
            align-items: center;

            }
            .subjectTotalScoreSetting-topL {
              width: 80px;
              font-size: 12px;
              .el-input-number {
                width: 100px;
                line-height: 30px;
                .el-input {
                  .el-input__inner {
                    padding: 0 !important;
                  }
                }
                .el-input__inner {
                  height: 32px;
                  line-height: 32px;
                }
                .el-input-number__decrease,
                .el-input-number__increase {
                  width: 23px;
                }
              }
            }
            .subjectTotalScoreSetting-topR {
              width: 100%;
              height: 36px;
              line-height: 36px;
              background-color: #f2f2f2;
              display: flex;
              font-size: 12px;
              align-items: center;
              padding-left: 5px;
              .el-input {
                width: 70px;
                height: 30px;
                margin: 0 18px 0 5px;
                .el-input__inner {
                  padding: 0 3px;
                  height: 30px;
                  line-height: 30px;
                }
              }
            }


        }
      }
    }
  }
}
</style>