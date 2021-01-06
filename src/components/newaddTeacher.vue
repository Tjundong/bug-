<template>
  <el-dialog
    id="Newteacher"
    :title="form.id ? '信息修改' : '添加教师'"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入教师姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="请输入教师手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="学段" prop="stage">
        <el-select v-model="form.stage" placeholder="请选择学段">
          <el-option
            v-for="(item, key) in stage"
            :key="key"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任教科目" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择任教科目">
          <el-option
            v-for="(item, key) in subject"
            :key="key"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="(item, key) in status"
            :key="key"
            :label="item"
            :value="Number(key)"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="base">
      <el-button class="step" @click="cancel"> 取消</el-button
      ><el-button class="next" @click="isok(form)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import LoginVue from "../views/Login.vue";
import { stage, subject, status } from "@/utils/form";
export default {
  name: "Newteacher",
  props: {
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.form.phone)) {
        callback(new Error("请输入教师手机号"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        name: [{ required: true, message: "请输入教师姓名", trigger: "blur" }],
        phone: [
          {
            required: true,
            message: "请输入教师手机号",
            trigger: ["blur", "change"],
          },
          { validator: validatePhone, trigger: "change" },
        ],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [
          { required: true, message: "请选择任教科目", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      stage: stage,
      subject: subject,
      status: status,
      newMassage: {},
      dialogVisible: false,
      form: {},
    };
  },
  methods: {
    cancel() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
      this.form = {};
    },
    operck(val) {
      this.form = { ...val } || {};
      this.dialogVisible = true;
    },
    amend(date) {
      this.form.date = date;
      this.$bus.$emit("getnewMsg", { ...this.form });
      this.dialogVisible = false;
      this.form = {};
      this.$refs.form.resetFields();
    },
    addition(date) {},
    isok(val) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const date = (() => {
            let date = new Date();
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? "0" + MM : MM;
            let d = date.getDate();
            d = d < 10 ? "0" + d : d;
            return y + "-" + MM + "-" + d;
          })();
          this.form.id || this.form.id === 0
            ? this.amend(date)
            : this.addition(date);
        } else {
          return false;
        }
      });
    },
  },
};
</script>
   
<style lang='scss'>
#Newteacher {
  .el-select {
    width: 100%;
  }
  .base {
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-around;
    padding-right: 25px;
    align-items: center;
    .step {
      color: rgba(129, 129, 129, 0.8);
    }
    .next {
      padding: 10px 25px;
      background: linear-gradient(to left, #17c7ba 30%, #10bd78 100%);
      border: 1px #1dbd84 solid;
      color: white;
    }
  }
}
</style>