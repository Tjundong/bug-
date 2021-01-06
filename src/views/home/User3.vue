<template>
<div class="bears">
  <div class="User3">
    <div class="input">
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
    <div class="indication">
      <div v-for="item in styletit" :key="item.txt" :style="item.style">
        {{ item.txt }}
      </div>
    </div>
    <div class="displ">
      <div class="tableun" v-for="(item, index) in list" :key="item.id">
        <div class="txt">{{ datas.pageSize * (datas.pageIndex - 1) + 1 + index }}</div>
        <div class="cull">{{ item.phone }}</div>
        <div class="name">{{ item.name }}</div>
        <div class="time">{{ item.time }}</div>
        <div class="but" v-if="item.status === 0">
          <el-button
            type="success"
            plain
            class="btn"
            @click="pass"
            :id="datas.pageSize * (datas.pageIndex - 1) + 1 + index"
            >通过</el-button
          >
          <el-button
            type="danger"
            plain
            class="btn1"
            @click="refuse"
            :id="datas.pageSize * (datas.pageIndex - 1) + 1 + index"
            >拒绝</el-button
          >
        </div>
        <div class="but" v-else-if="item.status === 1">
          <el-button type="success" disabled class="btn3">已通过</el-button>
        </div>
        <div class="but" v-else-if="item.status === 2">
          <el-button type="danger" disabled class="btn2">已拒绝</el-button>
        </div>
      </div>
    </div>
    <div class="sorter">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10]"
        :current-page="datas.pageIndex"
        :page-size='datas.pageSize'
        layout=" sizes, prev, pager, next, jumper"
        :total="totals"
      >
      </el-pagination>
    </div>
  </div>
  </div>
</template>

<script>
import { postall } from "@/assets/api/homeapi";

export default {
  name: "User3",
  data() {
    return {
      indexSun: 1,
      totals:0,
      input1: "",
      input2: "",
      datas: {
        pageIndex: 1,
        pageSize: 10,
      },
      styletit: [
        {
          style: "width:60px; textAlign:center;",
          txt: "编号",
        },
        {
          style: "width:100px; ",
          txt: "手机号",
        },
        {
          style: "width:180px; ",
          txt: "教师姓名",
        },
        {
          style: "width:140px; ",
          txt: "申请时间",
        },
        {
          style: "width:140px; paddingRight: 60px;",
          txt: "操作",
        },
      ],
      list: [],
    };
  },
  mounted() {
    this.postall();
    // console.log(this.list);
  },
  methods: {
    async postall() {
      let getdata = await postall("/newlist", this.datas);
      this.list = getdata.data.data.data.list;
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
    pass(e) {
      if (Number(e.path[1].id) > 0) {
        this.list[
          Number(e.path[1].id) - (this.indexSun - 1) * 10 - 1
        ].status = 1;
      } else {
        return;
      }
    },
    refuse(e) {
      if (Number(e.path[1].id) > 0) {
        this.list[
          Number(e.path[1].id) - (this.indexSun - 1) * 10 - 1
        ].status = 2;
      } else {
        return;
      }
    },
  },
};
</script>

<style lang='scss'>
.bears{
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
}
.User3 {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
  .input {
    padding-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;

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
  }
  .displ {
    flex: 1;
  }
  .tableun {
    text-align: left;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d8e8e2;
    height: 42px;
    line-height: 42px;
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
    .btn2 {
      padding: 6px 6px;
      background-color: white;
      color: #d54141;
      border: 1px #d54141 solid;
    }
    .btn3 {
      padding: 6px 6px;
      background-color: white;
      color: #1dbd84;
      border: 1px #1dbd84 solid;
    }
    .txt {
      width: 60px;
      text-align: center;
    }
    .cull {
      width: 100px;
    }
    .name {
      width: 180px;
    }
    .time {
      width: 140px;
    }
    .but {
      width: 140px;
      padding-right: 60px;
      display: flex;
    }
  }
  .sorter {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: flex-end;
    padding-right: 100px;
  }
}
</style>