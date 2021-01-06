<template>
  <div>3333333</div>
</template>

<script>
import { mapMutations} from 'vuex'

export default {
name:'Anal3',
  props:{},
methods:{
       ...mapMutations('userStor',{
      routs:'routs'
    }),
    next(val){
      this.routs(val)
    },
}
}
</script>

<style>

</style>