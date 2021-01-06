<template>
<div class="bear2">
  <div class="user2">
    <div class="input">
      <div class="leftTop">
        <div class="input-left">
          手机号码：<el-input
            placeholder="请输入内容"
            v-model="input1"
            clearable
          ></el-input>
        </div>
        <div class="input-right">
          姓名：<el-input
            placeholder="请输入内容"
            v-model="input2"
            clearable
          ></el-input>
        </div>
        <el-button type="primary">查询</el-button>
      </div>
      <div class="rightTop">
        <el-button type="plain" plain class="el-icon-eleme" @click="open(2)">
          邀请教师</el-button
        >
        <el-button type="primary" class="el-icon-plus" @click="open(1)">
          新增教师</el-button
        >
      </div>
    </div>
    <div class="indication">
      <div v-for="item in styletit" :key="item.txt" :class="item.clas">
        {{ item.txt }}
      </div>
    </div>
    <div class="displ">
      <div
        class="indication bgColor"
        v-for="(item, index) in tableData"
        :key="item.id"
      >
        <div class="txt">{{ datas.pageSize * (datas.pageIndex - 1) + 1 + index }}</div>
        <div class="cell">{{ item.phone }}</div>
        <div class="name">{{ item.name }}</div>
        <div class="phase">{{ stages(item.stage) }}</div>
        <div class="subject">{{ subjects(item.subject) }}</div>
        <div class="grade">七年级</div>
        <div class="time">{{ item.date }}</div>
        <div class="but" v-if="item.status === 0">
          <el-button
            type="success"
            plain
            class="btn"
            @click="pass"
            :id="index + 1 + (indexSun - 1) * 10"
            >正常</el-button
          >
        </div>
        <div class="but" v-else-if="item.status === 1">
          <el-button type="danger" plain class="btn1" disabled>禁用</el-button>
        </div>
        <div class="operation" :slot="item">
          <i class="el-icon-edit-outline" @click="$refs.entss.operck(item)"></i>
          <i class="el-icon-delete"  @click="operack(2)"></i>
        </div>
      </div>
    </div>
    <div class="sorter">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
         :page-sizes="[5,10]"
    :current-page="datas.pageIndex"
        :page-size='datas.pageSize'
        layout=" sizes, prev, pager, next, jumper"
        :total="totals"
      >
      </el-pagination>
    </div>
  <Qrcoder :dialogVisible='dialogVisible' @cancel='cancel' />
  <Teacher ref="entss" />
  </div>
  </div>
</template>

<script>
import { postall } from "@/assets/api/homeapi";
import Qrcoder from '@/components/Qrcode';
import newaddTeacher from '@/components/newaddTeacher';
export default {
  name: "User2",
 components:{
   Qrcoder,
   Teacher:newaddTeacher
 },
  data() {
    return {
      input1: "",
      input2: "",
      itemid:'',
      flag:false,
      totals:0,
      dialogVisible:false,
      indexSun: 1,
      datas : {
      pageIndex: 1,
      pageSize: 10,
      phone:18153571714
    },
      tableData: [],
      styletit: [
        {
          txt: "编号",
          clas: "txt",
        },
        {
          txt: "手机号",
          clas: "cell",
        },
        {
          txt: "教师姓名",
          clas: "name",
        },
        {
          txt: "学段",
          clas: "phase",
        },
        {
          txt: "任教科目",
          clas: "subject",
        },
        {
          txt: "任教年级/班级",
          clas: "grade",
        },
        {
          txt: "更新时间",
          clas: "time",
        },
        {
          txt: "状态",
          clas: "status",
        },
        {
          txt: "操作",
          clas: "operation",
        },
      ],
    };
  },
   mounted() {
     this.postall();
    this.$bus.$off('getnewMsg');
    this.$bus.$on('getnewMsg',this.oper);
   },

  methods: {
        async postall() {
      let getdata = await postall("/newpost", this.datas);
      this.tableData = getdata.data.data.data.list;
      this.totals =  getdata.data.data.data.num
    },
    handleSizeChange(val) {
      this.datas.pageIndex = 1
      this.datas.pageSize = val;
      this.postall();
    },
    async handleCurrentChange(val) {
      this.indexSun = val
      this.datas.pageIndex = val;
      this.postall();
    },
    stages(stage) {
      if (stage === "1") return "小学阶段";
      else if (stage === "2") return "初中阶段";
      else if (stage === "3") return "高中阶段";
    },
    subjects(subject) {
      if (subject === "1") return "语文";
      else if (subject === "2") return "数学";
      else if (subject === "3") return "英语";
      else if (subject === "4") return "道法";
      else if (subject === "5") return "思美";
      else if (subject === "6") return "体育";
    },
    pass(e) {
      if (Number(e.path[1].id) > 0) {
        this.tableData[
          Number(e.path[1].id) - (this.indexSun - 1) * 10 - 1
        ].status = 1;
      } else {
        return;
      }
    },
    //邀请新增教师
    open(val) {
    if(val === 1){
      this.$refs.entss.dialogVisible = true;
        // this.flag = !this.flag
    this.titText = '添加教师'
      }else if(val === 2){
      this.dialogVisible = true;
     }
    },
    //子组件点击
    cancel(){
    this.dialogVisible = false
    },
    //修改删除
    operack(val,item){  
      if(val === 1){
        this.itemid = item
        this.$refs.entss.dialogVisible = true;
      }else if(val === 2){
        this.$alert('是否要删除该条信息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success',
              message: `删除成功`
            })
        this.tableData.splice(item,1)
        }
        
    })
      }
    },
    
      oper(form){
          let index =  this.tableData.findIndex(item => item.id == form.id)
          this.tableData.splice(index,1,form) 
      }

  },
};
</script>

<style lang='scss'>
.bear2{
    background-color: #f2f2f2;
  padding: 10px;
  padding-right: 25px;
  height: 100%;
  box-sizing: border-box;
  & > div {
      background-color: white;
      border-radius: 15px;
      width: 100%;
      height: 100%;
    }
  .user2 {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;

  .input {
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftTop,
    .rightTop {
      display: flex;
      align-items: center;
      .el-icon-eleme {
        padding: 8px 13px;
        color: #25c088;
        border-color: #25c088;
      }
      .el-icon-plus {
        padding: 8px 13px;
      }
    }
    .el-input {
      
      width: auto;
    }
    .el-input__inner {
      width: 255px;
      height: 30px;
    }
    .input-left {
      display: flex;
      align-items: center;
    }
    .input-right {
      padding-left: 20px;
      display: flex;
      align-items: center;
    }
    .el-button--primary {
      background: linear-gradient(to left, #17c7ba 30%, #10bd78 100%);
      border: none;
      padding: 8px 27px;
      margin-left: 20px;
    }
  }
  .indication {
    text-align: left;
    font-size: 12px;
    display: flex;
    background-color: #f0f9f6;
    height: 36px;
    border: solid #d8e8e2 1px;
    border-radius: 5px;
    margin-top: 10px;
    align-items: center;
    justify-content: space-between;
    .txt {
      width: 65px;
      text-align: center;
    }
    .cell {
      width: 100px;
    }
    .name {
      width: 160px;
    }
    .phase {
      width: 70px;
    }
    .subject {
      width: 60px;
    }
    .grade {
      width: 100px;
    }
    .time {
      width: 90px;
    }
    .status {
      width: 70px;
      text-align: center;
    }
    .operation {
      width: 130px;
    }
  }
  .displ {
    flex: 1;
  }
  .sorter {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: flex-end;
  }
  .bgColor {
    border: none;
    border-bottom: 1px solid #d8e8e2;
    height: 42px;
    line-height: 42px;
    background-color: white;
    .btn {
      padding: 6px 15px;
      background-color: #1dbd84;
      color: white;
      border: none;
    }
    .btn1 {
      padding: 6px 15px;
      background-color: #d54141;
      color: white;
      border: none;
    }
    .operation {
      & > i {
        font-size: 15px;
        color: #25c088;
        margin-right: 25px;
        cursor: pointer;
      }
    }
  }
}
 .xin{
            width: 470px;
            height: 250px;
        }
        .xin>ul{
            display: flex;
            width: 390px;
            height: 40px;
            align-items: center;
        }
        .xin>ul>li:nth-child(1){
            width: 100px;
            text-align: right;
            color: #ababab;
        }
        .xin>ul>li>input{
            width: 220px;
            height: 30px;
            margin-left: 10px;
            border: 1px solid #d8e8e2;
            padding-left: 20px;
            box-sizing: border-box;
        }   
        .xin>ul>li>select{
            width: 220px;
            height: 30px;
            margin-left: 10px;
            border: 1px solid #d8e8e2;
            padding-left: 20px;
            box-sizing: border-box;
        }  
}

</style>