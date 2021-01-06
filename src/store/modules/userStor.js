export default {
    namespaced: true,
    state:{
        list:JSON.parse(sessionStorage.getItem('listX'))
    },
    mutations:{
        next(state,data){
            state.list = data;
            sessionStorage.setItem('listX',JSON.stringify(data));
        },
        routs(state,enindx){
            state.list.step += enindx;
            sessionStorage.setItem('listX',JSON.stringify(state.list));
        }
    },
}