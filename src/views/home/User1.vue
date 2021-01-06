<template>
  <div class="User1">
    <div class="bears1">
      <div class="head">
        <el-steps :active="list.step" finish-status="success">
          <el-step title="分析类型确定"></el-step>
          <el-step title="分析成绩导入"></el-step>
          <el-step title="报表类型选择"></el-step>
          <el-step title="报表参数设置"></el-step>
        </el-steps>
      </div>
      <div class="main">
      <!-- <router-view></router-view> -->
      <Anal ref="anal" v-if='this.list.step === 0' />
      <Anal2 ref="anal2" v-else-if="this.list.step === 1" />
      <Anal3 ref="anal3" v-else-if="this.list.step === 2" />
      <Anal4 ref="anal4" v-else-if="this.list.step === 3" />
      </div>
    </div>
    <div class="base">
      <el-button  @click="next(-1)" :class="this.list.step === 0 ? 'step' : 'stteps'">{{this.list.step === 0 ? '删除分析' : '上一步'}}</el-button><el-button  @click="next(1)" class="next">{{this.list.step === 4 ? '完成' : '下一步'}}</el-button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import {mapState , mapMutations} from 'vuex'
import Anal from '@/views/home/user/Anal.vue'
import Anal2 from '@/views/home/user/Anal2.vue'
import Anal3 from '@/views/home/user/Anal3.vue'
import Anal4 from '@/views/home/user/Anal4.vue'
export default {
  name: "User1",
  data(){
    return {
      resFrom:{0:'anal',1:'anal2',2:'anal3',3:'anal4'}
    }
  },
  components:{
    Anal:Anal,
  Anal2:Anal2,
  Anal3:Anal3,
  Anal4:Anal4
  },
  computed:{
    ...mapState('userStor',{
      list : (state) => state.list
    }),
  },
  methods:{
    next(val) {
      this.$refs[this.resFrom[this.list.step]].next(val);
      // this.routs(val)
    }
  },

};
</script>

<style lang='scss'>
.User1 {
  display: flex;
  flex-direction: column;
  height: 100%;
  .bears1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    padding: 10px;
    padding-right: 25px;
    box-sizing: border-box;
    .head{
      width: 100%;
      background-color: white;
      border-radius: 5px;
       .el-steps {
      width: 950px;
      margin: 10px auto;
      
    }
    }
    .main{
      flex: 1;
      box-sizing: border-box;
      overflow: hidden;
    }
   
  }
  .base {
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    display: flex;
 justify-content: flex-end;
 padding-right: 25px;
 align-items: center;
    .step{
           padding: 10px 25px;
             background-color: #d54141;
      color: white;
      border: none;
      }
      .stteps{
           padding: 10px 25px;
         background-color: white;
      color: #1dbd84;
      border: 1px #1dbd84 solid;
      }
      .next{
           padding: 10px 25px;
      background: linear-gradient(to left, #17c7ba 30%, #10bd78 100%);
      border: 1px #1dbd84 solid;
      color: white;
      }
  }

}
</style>