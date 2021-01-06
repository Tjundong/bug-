<template>
  <div class="dialog">
    <el-dialog title="选择学校" :visible.sync="dialogVisible" width="600px">
      <div class="dialog-txt">
        当前学校已关联{{ dialogRout.length }}个学校，{{
          dialogRout.length > 0 ? "请选择学校" : "请申请学校"
        }}
      </div>
      <div class="dialog-bear">
        <el-radio
          v-for="item in dialogRout"
          :key="item.id"
          v-model="radio1"
          :label="item.id"
          border
          change
          class="dialog-radio"
          >{{ item.name }}</el-radio
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="dialogEnt">{{
          dialogRout.length > 0 ? "确定" : "申请"
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postall, getall } from "@/assets/api/homeapi";

export default {
  name: "Dialog",
  data() {
    return {
      dialogRout: [],
      radio1: "",
    };
  },
  props: {
    dialogVisible: Boolean,
    userId: String,
    loginbut:Boolean
  },
  methods: {
      //取消
    cancel() {
      this.$emit("cancel",'1');
    },
    //确定
    async dialogEnt(val) {
      if (val.path[0].innerText === "确定") {
        let date = {
          userId: this.userId,
          id: this.radio1,
        };
         //请求home左侧列表
        let datas = await postall("/schoolRouter", date);
        localStorage.setItem("rout", JSON.stringify(datas.data.data.data));
        localStorage.setItem("radio1", this.radio1);
        this.$router.push({ name: "Home" });
        this.$emit("cancel",'2');
      
      } else {
        console.log(val.path[0].innerText);
      }
    },
  },
  watch: {
    async dialogVisible(a, b) {
      if (a) {
        let dialogRouts = await getall("/schoolList", { id: this.userId });
        dialogRouts = dialogRouts.data.data.data;
        localStorage.setItem("dialog", JSON.stringify(dialogRouts));
        let dialogRout = JSON.parse(localStorage.getItem("dialog"));
        //   if (dialogRout.length > 0) {
          this.dialogRout = dialogRout;
        //默认选中按钮
        if(this.loginbut){
        this.radio1 = dialogRout[0].id;
      }else{
        this.radio1 =  localStorage.getItem("radio1");
      }
        //   }
      }
    },
  },
};
</script>

<style lang='scss'>
.dialog {
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin: 5px 0;
  }
  .dialog-txt {
    width: 400px;
    text-align: center;
  }
  .dialog-bear {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-radio {
      display: block;
      width: 400px;
      margin: 5px 0;
      .el-radio__input {
        float: right;
      }
    }
  }
  .el-dialog__footer {
    display: flex;
    justify-content: center;
    .el-button + .el-button {
      margin-left: 100px;
      background: linear-gradient(to left, #17c7ba 30%, #10bd78 100%);
      border: none;
    }
  }
}
</style>