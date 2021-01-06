<template>
  <div class="anal2">
    <div class="heads">宝华实验学校2019年上学期七年级期末考试</div>
    <div class="message">
      <span>学生及科目成绩信息</span>
      <el-button type="primary" class="el-icon-download">数据导入</el-button>
    </div>
    <div class="anal2-from">
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
          <el-select v-model="value" placeholder="批量操作">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- <div>

    </div> -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="school" label="学校" width="520">
        </el-table-column>
        <el-table-column prop="grade" label="班级" width="100">
        </el-table-column>
        <el-table-column prop="candidate" label="考号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="130">
        </el-table-column>
        <el-table-column prop="language" label="语文" width="120">
        </el-table-column>
        <el-table-column prop="mathematics" label="数学" width="120">
        </el-table-column>
        <el-table-column prop="English" label="英语" width="120">
        </el-table-column>
        <el-table-column prop="address" label="操作" >
             <div class="operation" >
          <i class="el-icon-edit-outline" ></i>
          <i class="el-icon-delete"  ></i>
        </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapMutations} from 'vuex'

export default {
  name: "Anal2",
  props:{},
  data() {
    return {
      input1: "",
      input2: "",
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableData: [
        {
          school:'宝华实验学校',
          grade:1,
          candidate:'23556121',
          name: "王小虎",
          language:'66',
          mathematics:'88',
          English:'99',
          operation:0
        },
         {
          school:'宝华实验学校',
          grade:1,
          candidate:'23556121',
          name: "王小虎",
          language:'66',
          mathematics:'88',
          English:'99',
          operation:0
        },
         {
          school:'宝华实验学校',
          grade:1,
          candidate:'23556121',
          name: "王小虎",
          language:'66',
          mathematics:'88',
          English:'99',
          operation:0
        },
         {
          school:'宝华实验学校',
          grade:1,
          candidate:'23556121',
          name: "王小虎",
          language:'66',
          mathematics:'88',
          English:'99',
          operation:0
        },
        
         {
          school:'宝华实验学校',
          grade:1,
          candidate:'23556121',
          name: "王小虎",
          language:'66',
          mathematics:'88',
          English:'99',
          operation:0
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
        ...mapMutations('userStor',{
      routs:'routs'
    }),
    next(val){
      this.routs(val)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="scss">
.head {
  border-radius: 5px 5px 0 0 !important;
}
.anal2 {
  height: 100%;
  display: flex;
  flex-direction: column;
  .heads {
    background-color: white;
    padding: 10px;
    text-align: center;
    font-size: 19px;
    font-weight: bold;
    border-radius: 0 0 5px 5px;

  }
  .message {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button--primary {
      padding: 9px 13px;
      background: linear-gradient(to left, #17c7ba 30%, #10bd78 100%);
      border: 1px #1dbd84 solid;
      color: white;
      & > span {
        padding-left: 10px;
      }
    }
  }
  .anal2-from {
    box-sizing: border-box;
    padding: 10px;
    flex: 1;
    background-color: white;
    .input {
      padding-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .rightTop {
        .el-input__inner {
          width: 110px;
        }
        .el-input__icon {
          line-height: 30px !important;
        }
      }
      .leftTop {
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
        width: 300px;
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
</style>