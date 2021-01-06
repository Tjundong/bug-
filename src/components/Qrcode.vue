<template>
  <div class="Qrcode">
    <el-dialog title="邀请教师" :visible.sync="dialogVisible" width="600px">
      <div>
        邀请码：<el-switch
          v-model="value"
          active-color="#cccc"
          inactive-color="#13ce66"
        >
        </el-switch>
      </div>
      <div class="qrcodes" v-if="!value">
        <div class="qrcode">
          <VueQrcode :value="qrcodeNum" :options="{ size: 120 }" />
          <i
            class="el-icon-refresh-right"
            style="
              font-size: 19px;
              cursor: pointer;
              color: #10bd78;
              vertical-align: bottom;
              position: absolute;
              bottom: 6px;
              right: 50%;
              margin-right: -75px;
            "
            @click="open"
          ></i>
        </div>
        <div class="urlInp">
          邀请链接：<input type="text" :value="input" id="inputValue" />
          <span @click="copy" data-clipboard-target="#inputValue" class="btn"
            >复制链接</span
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="dialogEnt">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VueQrcode from "@xkeshi/vue-qrcode";
import Clipboard from "clipboard";
export default {
  name: "Qrcode",
  components: {
    VueQrcode,
  },
  props: {
    dialogVisible: Boolean,
  },
  data() {
    return {
      qrcodeNum: "892347628",
      value: true,
      input: "www.baidu.com",
    };
  },
  methods: {
    //取消
    cancel() {
      this.$emit("cancel", "1");
    },
    //确定
    dialogEnt(val) {
      this.$emit("cancel", "2");
    },
    //复制
    copy() {
      let clipboard = new Clipboard(".btn");
      clipboard.on("success", (e) => {
        this.$message({
          message: "复制成功",
          type: "success",
        });
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    //刷新二维码
    open() {
        const h = this.$createElement;
        this.$msgbox({
          message: h('div', null, [
            h('h3', {style:'text-align:center'}, '刷新二维码后，原来的二维码会失效 '),
            h('h3', {style:'margin-bottom:20px;text-align:center'}, '请谨慎操作')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 200);
                this.qrcodeNum = '18153571714',
                this.input = 'http://www.clipboardjs.cn/'
              }, 2000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'success',
            message: '刷新成功'
          });
        });
      }

  },
};
</script>

<style lang='scss'>
.qrcodes {
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 0 auto;
  .qrcode {
    display: flex;
    justify-content: center;
    position: relative;
    
  }
  
  .urlInp {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    #inputValue {
      width: 82%;
      border: 1px solid #ccc;
      height: 38px;
      border-radius: 5px;
      box-sizing: border-box;
      padding-left: 15px;
    }
    .btn {
      position: absolute;
      right: 0;
      cursor: pointer;
      color: #17c7ba;
      font-size: 16px;
      margin-right: 50px;
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
.el-dialog__body{
      border-top: 1px solid #ccc;
      
    }
</style>