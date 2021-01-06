<template>
<div>
    <template v-for="item in router" >
  <el-submenu v-if="item.children" :index='item.name' :key="item.name">
    <template slot="title" > <i :class="item.icon"></i><span>{{item.name}}</span></template>
        <Submenu :router='item.children'/>
  </el-submenu>
    <el-menu-item v-else :key="item.name" :index="'/' + item.path">{{item.name}}</el-menu-item>
  </template>
  </div>
</template>

<script>
export default {
    name:'Submenu',
    props:{
        router:Array
    },
    data(){
        return{
            index:'1'
        }
    },
    mounted(){

    },
    methods:{
      css(){
        this.$emit('ddd','asd')
      }
    }
};
</script>

<style>
</style>
