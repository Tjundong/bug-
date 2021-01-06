<template>
  <el-container class="home">
    <el-header class="hearbgcolor"
      ><div class="imglog">
        <img src="@/assets/imgs/home/homlog.png" alt="" />
      </div>
      <div class="hear-right">
        <div class="hear-right-img" @click="switchover"><el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span v-text="name"></span></div>
        
        <div class="hear-right-quit" @click="quit">
          <i class="el-icon-switch-button"></i>退出
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="260px"
        ><el-menu
          :default-active="submenuindx"
          :default-openeds="openeds"
          :router="true"
        >
        <Submenu :router='routubmenu'/>
        <Dialog  @cancel="cancel" :dialogVisible='roubmenu' :userId='userId' :loginbut='false' />
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
    <el-footer class="btbgcolor"
      ><span class="spanmarig">Copyright &copy; 易校园有限公司</span>
      <span class="spanmarig">湘ICP备15014295号-2</span>
      <span class="spanmarig">公安机关备案案号：43011102001327</span>
      友情链接：易校园</el-footer
    >
  </el-container>
</template>

<script>
import Submenu from '@/components/Submenu'
import {postall} from '@/assets/api/homeapi'
import Dialog from '@/components/Dialog';

export default {
  name: "Home",
  components: {
Submenu,
Dialog
  },
  data() {
    return {
      name:'',
      submenuindx: '',
      routubmenu:JSON.parse(localStorage.getItem('rout')) || [],
      openeds:[],
      roubmenu:false,
      userId:''
    };
  },
 async mounted () {

  let date = JSON.parse(localStorage.getItem("name"))
    if (date == null) {
        this.$router.push({ name: "Login" });
    }else{
      this.userId = date.data.data.id;
    this.name = date.data.data.nickName;
    //标题函数
    await this.openedss(this.routubmenu);
    //重定向函数
    await this.active(this.routubmenu,this.$route.path);
    }
  },
  methods:{
    //点击退出
    quit(){
      this.$message({
          message: '正在退出',
          type: 'warning'
        });
        localStorage.clear();
    this.$router.push({ name: "Login"});
    },
    openedss(router){
      //获取标题展开
      router.forEach(item => {
        if(item.children){
          this.openeds.push(item.name);
        }
      });
    },
    active(rout,path){
          //2次重定向
          if(path && path !== '/'){
          this.submenuindx = '/' + path.split('/')[1];
          // console.log(this.submenuindx);
            return 
          }
          //重定向
      rout.some(item => {
        if(item.path){
          this.submenuindx = '/' + item.path;
          // console.log(item.path);
          this.$router.push({path:item.path})
          return true
        }
        if(item.children){
          this.active(item.children);
          return true
        }
      })
    },
    switchover(){
      this.roubmenu = true
    },
  cancel(){
  //  console.log(this.submenuindx, 2222);
      this.roubmenu = false
    }
  },
  watch: {
    $route(to) {
          this.routubmenu = JSON.parse(localStorage.getItem('rout')) || []
    // this.$router.push({path: '/'})
    //标题函数
    this.openedss(this.routubmenu);
    //重定向函数
   this.active(this.routubmenu,this.$route.path)
    }
  },

};
</script>

<style lang="scss">
.home {
  height: 100%;
  .el-header,
  .el-footer {
    text-align: center;
    // line-height: 60px;
  }
  .el-submenu {
    border-bottom: solid #d8e8e2 1px;
    &:last-child {
      border: none;
    }
  }
  .hearbgcolor {
    background: linear-gradient(to left, #17c7ba 30%, #10bd78 100%);
    display: flex;
    justify-content: space-between;
    .imglog {
      height: 60px;
      & > img {
        height: 60px;
      }
    }
    .hear-right {
      color: white;
      font-size: 11px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .hear-right-img{
        display: flex;
      align-items: center;
      padding-right: 45px;
      &>span{
        padding-left: 8px;
      }
      }
      .hear-right-quit {
        cursor: pointer;
        display: flex;
        align-items: center;
        &>i{
          padding-right: 8px;
        }
      }
    }
  }
  .btbgcolor {
    color: #dbdbdb;
    height: 40px !important;
    line-height: 40px;
    font-size: 12px;
    background-color: #343533;
    .spanmarig {
      margin-right: 12px;
    }
  }
  .el-aside {
    background-color: #ffffff;
    // border-right: solid 1px #ccc;
    .el-menu {
      border: none;
    }
  }

.el-main{
  padding: 0;
  box-sizing: border-box;

}

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
