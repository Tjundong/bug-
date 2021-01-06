<template>
  <div class="brar0">
    <div class="User0">
      <div class="input">
        <div class="leftTop">
          <div class="input-left">
            成绩分析查询：<el-input
              placeholder="请输入内容"
              v-model="input1"
              clearable
            ></el-input>
          </div>
          <div class="input-lef">
            分析类型：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="input-lef">
            状态：
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="time">
            考试时间：
            <el-date-picker v-model="value1" type="date" placeholder="请选择">
            </el-date-picker>
          </div>
        </div>
        <div class="rightTop">
          <el-button type="primary">查询</el-button>
          <el-button type="primary" class="el-icon-plus" @click="routName">
            新增分析</el-button
          >
        </div>
      </div>
      <div class="table-bot">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
        >
          <!-- @current-change="handleCurrentChange" -->
          <el-table-column type="index" label="编号" width="60">
          </el-table-column>
          <el-table-column prop="grade" label="成绩分析名称" width="520">
          </el-table-column>
          <el-table-column :formatter="stage" label="学段" width="80">
          </el-table-column>
          <el-table-column label="年级" width="100"
            >七年级
          </el-table-column>
          <el-table-column label="入学年份" width="130"
            >2016级
          </el-table-column>
          <el-table-column prop="time" label="考试时间" width="140">
          </el-table-column>
          <el-table-column label="分析类型" width="150">
            总分基本分析
          </el-table-column>
          <el-table-column prop="name" label="创建人" width="150">
          </el-table-column>
          <el-table-column prop="date" label="创建时间" width="120">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-button
                type="success"
                plain
                class="btn"
                v-if="scope.row.type == '1'"
                @click="routName(scope)"
                >参数设置</el-button
              >
              <el-button type="success" plain class="btn1" v-else
                >分析完成</el-button
              >
            </template>
          </el-table-column>
          <!-- <el-table-column prop="type" label="状态" v-else>
            <el-button type="success" plain class="btn1">分析完成</el-button>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="sorter">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10]"
          :current-page="datas.pageIndex"
          :page-size="datas.pageSize"
          layout=" sizes, prev, pager, next, jumper"
          :total="totals"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getall } from "@/assets/api/homeapi";
import {mapMutations} from 'vuex';

export default {
  name: "User0",
  data() {
    return {
      input1: "",
      value: "",
      value1: "",
      totals: 0,
      options: [],
      tableData: [],
      datas: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    ...mapMutations('userStor',{
      next:'next'
    }),
    stage(row) {
      // console.log(row);
      return row.stage === "1" ? "小学" : row.stage === "2" ? "初中" : "高中";
    },
    //跳转下个路由
    routName(scope) {
      let data = scope.row ? {id:scope.row.id, step:Number(scope.row.step)} : {id: '', step: 0};
      this.next(data)
      this.$router.push({ name: "anal" });
    },
    handleSizeChange(val) {
      this.datas.pageIndex = 1;
      this.datas.pageSize = val;
      this.postall();
    },
    async handleCurrentChange(val) {
      this.indexSun = val;
      this.datas.pageIndex = val;
      this.postall();
    },
    async postall() {
      let getdata = await getall("/analysis", this.datas);
      this.tableData = getdata.data.data.data.list;
      // console.log(this.tableData);
      //   console.log(this.tableData.type);
      this.totals = getdata.data.data.data.num;
    },
  },
  mounted() {
    this.postall();
  },
};
</script>

<style lang='scss'>
.brar0 {
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
  .User0 {
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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
        font-size: 14px;
        display: flex;
        align-items: center;
      }
      .input-lef {
        margin-left: 30px;
        font-size: 14px;
        .el-input__inner {
          width: 150px;
        }
        .el-input__icon {
          line-height: 30px !important;
        }
      }
      .time {
        margin-left: 30px;
        font-size: 14px;
        .el-input__inner {
          width: 150px;
        }
        .el-input__icon {
          line-height: 30px !important;
        }
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
    .table-bot {
      flex: 1;
      .btn {
        padding: 6px 15px;
        background-color: #1dbd84;
        color: white;
        border: none;
      }
      .btn1 {
        padding: 6px 15px;
        background-color: #2c86cf;
        color: white;
        border: none;
      }
    }
    .sorter {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>