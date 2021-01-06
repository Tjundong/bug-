<template>
  <div class="bearbox">
    <div class="statement">
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini"  :rules="rules">
        <el-form-item label="分析名称" prop="name">
          <el-input v-model="sizeForm.name"  placeholder="请选择分析名称"></el-input>
        </el-form-item>
        <el-form-item label="学段年级"  prop="stage">
          <el-select v-model="sizeForm.stage" placeholder="请选择学段年级" filterable>
               <el-option
            v-for="(item, key) in stage"
            :key="key"
            :label="item"
            :value="key"
          ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学年份"  prop="time">
          <el-select v-model="sizeForm.time" placeholder="请选择入学年份" filterable>
         <el-option
            v-for="(item, key) in time"
            :key="key"
            :label="item"
            :value="key"
          ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试科目" prop="subject">
          <el-select v-model="sizeForm.subject" placeholder="请选择考试科目" multiple>
               <el-option
            v-for="(item, key) in subject"
            :key="key"
            :label="item"
            :value="key"
          ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试时间" prop="date">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="sizeForm.date"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2"></el-col>
        </el-form-item>
        <el-form-item label="分析类型" prop="type">
          <el-radio-group v-model="sizeForm.type" size="small">
            <el-radio-button  v-for="(item, key) in type"
            :key="key"
            :label="item"
            :value="key"></el-radio-button>
</el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {stage,time,type} from '@/utils/flight'
import {subject} from '@/utils/form'
import { mapMutations} from 'vuex'
export default {
  name: "Anal",
  props:{},
  data() {
    return {
      stage:stage,
      time:time,
      type:type,
      subject:subject,
        rules: {
        name: [{ required: true, message: "请选择分析名称", trigger: "blur" }],
        stage: [{ required: true, message: "请选择学段年级", trigger: "change" }],
        time: [{ required: true, message: "请选择入学年份", trigger: "change" }],
        date: [{ required: true, message: "请选择时间", trigger: "change" }],
        subject: [{ required: true, message: "请选择考试科目", trigger: "change" }],
      },
      sizeForm: {
        name: "",
        stage: "",
        time:'',
        subject:'',
        date: "",
        type: '',
      },
    };
  },
  
  methods: {
       ...mapMutations('userStor',{
      routs:'routs'
    }),
    next(){
      this.resForm()
    },
    resForm(){
         this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.$refs.form);
      this.routs(1)
        } else {
          return false;
        }
      });
    }
  },
  mounted(){
      this.$refs.form.resetFields();
  }
};
</script>

<style lang="scss">
.bearbox {
  box-sizing: border-box;
  height: 100%;
  background-color: white;
  border-radius: 5px;
  margin-top: 10px;
  .statement {
    margin: 0 auto;
    padding-top: 15px;
    width: 820px;
    box-sizing: border-box;
    .el-form {
      width: 558px;
      margin: 0 auto;
      .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label{
        line-height: 45px;
      }
      .el-input--mini .el-input__inner {
        width: 478px;
        height: 45px;
      }
      .el-radio-button--small .el-radio-button__inner {
        padding: 12px 43px;
      }
      .el-form-item--mini.el-form-item,
      .el-form-item--small.el-form-item {
        //   margin-bottom: 0;
        padding-bottom: 18px;
        border-bottom: solid 1px #e4f5f1;
      }
    }
  }
}
</style>