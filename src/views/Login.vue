<template>
  <div class="login">
    <div id="bear-colo"></div>
    <div id="bear-colo1"></div>
    <div id="bear-colo2">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603684465174&di=0576a543495b979e9a045ed2121b377e&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20191017%2F32160ad3d1d64e6dbf4f8952127c07b6.gif"
      />
    </div>
    <div id="wrap">
      <div class="box">
        <div :class="'center-left'">
          <img src="@/assets/imgs/index/left.png" alt="" />
        </div>
        <div class="center-right">
          <ul>
            <h1><img src="@/assets/imgs/index/log.png" alt="" />好分析</h1>
            <li>
              <i class="icon iconfont icon-wode"></i
              ><input
                type="text"
                placeholder="请输入手机号"
                class="tex1"
                v-model="cellphone"
              /><span class="txt1">{{ txt1 }}</span>
            </li>
            <li>
              <i class="icon iconfont icon-50"></i
              ><input
                type="text"
                placeholder="请输入验证码"
                class="tex2"
                v-model="password"
              />
              <span
                :class="truefals ? 'txtsun txtcode' : 'txtsun txtcodes'"
                @click="phoneCode"
                >{{ phoneCodetxt }}</span
              >
            </li>
            <li>
              <i class="icon iconfont icon-zixun"></i
              ><input
                type="text"
                placeholder="请输入短信验证码"
                class="tex3"
                v-model="verification"
              /><span class="txt3"></span>
              <button id="end" @click="end">获取</button>
            </li>
            <li><button class="endr" @click="endr">登陆/注册</button></li>
          </ul>

         
        </div>
      </div>
      <DialogRout @cancel="cancel" :dialogVisible='dialogVisible' :userId='userId' :loginbut='true' />
    </div>
  </div>
</template>

<script>
import { maths } from "../assets/commit/mathroo";
import { postall, getall } from "../assets/api/homeapi";
import DialogRout from '@/components/Dialog'
export default {
  name: "Login",
  components: {
    DialogRout
  },
  data() {
    return {
      cellphone: "",
      password: "",
      verification: "",
      radio1: "",
      dialogVisible: false,
      phoneCodetxt: "发送验证码",
      truefals: false,
      timr: null,
      txt1: "请输入正确的手机号",
      apps: {},
      dialogRout: [],
      userId: "",
    };
  },
  methods: {
    //取消事件
    cancel(){
      this.dialogVisible = false
    },
    //发送验证码
    async phoneCode() {
      if (/^1[3|4|5|7|8][0-9]{9}$/.test(this.cellphone)) {
        let phoneCodetim = maths(9999, 1000);
        this.truefals = false;
        let istim = 10;
        let data = {
          phoneCode: phoneCodetim,
          phone: this.cellphone,
        };
        this.apps = phoneCodetim;
        //请求验证码
        let datas = await postall("/code", data);
        this.timr = setInterval(() => {
          istim--;
          istim < 0
            ? (this.phoneCodetxt = "重新发送")
            : (this.phoneCodetxt = istim + "s");
          if (istim < 0) {
            this.truefals = true;
            clearInterval(this.timr);
          }
        }, 1000);
      } else {
        this.truefals = true;
      }
    },
    //点击登录
    async endr() {
      const mess = this.$message({
        message: "正在登录",
        iconClass: "el-icon-loading",
      });
      if (/^1[3|4|5|7|8][0-9]{9}$/.test(this.cellphone)) {
        let data = {
          phoneCode: this.apps,
          phone: this.cellphone,
          code: this.verification,
        };
        let datas = await postall("/login2", data);
        let app = datas.data.data;
        this.userId = app.data.id;
        //判断用户是否存在
        if (app.code == "1") {
          localStorage.setItem("name", JSON.stringify(datas.data));
          this.dialogVisible = true;
          mess.close();
         
        } else {
          mess.close();
          this.txt1 = app.message;
          this.$message.error(app.message);
        }
      }
    },
    //发送同步的iput验证码
    end() {
      this.verification = this.apps;
    },
  },
  watch: {
    //判断手机号是否合法
    cellphone() {
      if (/^1[3|4|5|7|8][0-9]{9}$/.test(this.cellphone)) {
        (this.truefals = true), (this.txt1 = "");
      } else {
        (this.truefals = false), (this.txt1 = "请输入正确的手机号");
      }
    },
  },
  // mounted() {
  //   if (localStorage.getItem("name")) {
  //     this.$router.push({ name: "Home" });
  //   }
  // },
};
</script>

<style lang="scss">
@import "../assets/iconfont/iconfont.css";
* {
  margin: 0;
  padding: 0;
}

input,
button {
  outline: none;
  border: none;
}

li,
select {
  list-style: none;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.login,
#wrap,
#app {
  width: 100%;
  height: 100%;
}
#bear-colo {
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.198);
}

#bear-colo1 {
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.287);
}
#bear-colo2 {
  text-align: center;
  padding-top: 18%;
  color: #ffffff;
  font-size: 40px;
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#wrap {
  background-color: #9bd0ab;
  width: 100%;
  height: 100%;
  padding: 100px 120px;
  box-sizing: border-box;

  .box {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .center-left {
      width: 50%;
      height: 100%;
      padding: 8% 8%;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .center-right {
      // width: 50%;
      padding-right: 13%;

      & > ul {
        width: 400px;

        h1 {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        li {
          width: 100%;
          display: flex;
          border-bottom: 2px #e9e5e5 solid;
          margin-top: 40px;

          input {
            height: 30px;
            width: 100%;
            padding-left: 15px;
            box-sizing: border-box;
          }

          .icon {
            font-size: 20px;
            color: #b8b8b8;
          }
          & > span {
            width: 200px;
            color: red;
            font-size: 12px;
          }
          .txtsun {
            display: flex;
            width: 150px;
            height: 30px;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            font-size: 15px;
          }
          .txtcode {
            border: 1px #04b678 solid;
            color: #04b678;
            cursor: pointer;
          }
          .txtcodes {
            border: 1px #ccc solid;
            color: #ccc;
            cursor: not-allowed;
          }
          #end {
            width: 100px;
            color: #34c491;
            background-color: rgba(169, 169, 169, 0);

            &:hover {
              color: #04b678;
              cursor: pointer;
            }
          }

          &:last-child {
            border-bottom: none;

            .endr {
              width: 100%;
              height: 40px;
              color: #ffffff;
              border-radius: 5px;
              background: linear-gradient(to left, #17c7ba 30%, #10bd78 100%);

              &:hover {
                background: linear-gradient(to left, #13a59b 30%, #0ea569 100%);
                cursor: pointer;
              }
            }
          }
        }
      }

    }
  }

}
</style>
