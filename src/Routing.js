import router from './router'
import store from '@/store'




router.beforeEach((to, from, next) => {
    let arr = ['Home', 'Login','analy'].concat(store.state.arr);
    // let indexRout = store.state.arr[0]
    let data = JSON.parse(localStorage.getItem('rout')) || [];
    const routDat = (rout) => {
        rout.map(item => {
            if (item.path) {
                arr.push(item.id)
                return
            }
            if (item.children) {
                routDat(item.children);
                return
            }
        })
    }
    routDat(data)
    // console.log(to.path);
    // if (to.path === '/analysis') {
    //     next(indexRout)
    //     return
    // }
    if (!arr.includes(to.name)) {
        router.go(-1)
    }
    next()
})

export default router
