import {post,get} from './httpapi'
export  function postall(url,data){
 return post(url,data);
}
export  function getall(url,data){
    return get(url,data);
   }