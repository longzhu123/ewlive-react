import axios from 'axios';
import {Modal} from 'antd';
import * as StringConstant from '../constant';
import {Redirect} from 'react-router-dom';

let util = {
    //通用Ajax
    ajax(options) {
        options.data.token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios.post(StringConstant.SERVER_URL + options.url, JSON.stringify(options.data),
                {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((response) => {
                if (response.status === 200) {
                    let res = response.data;
                    if (res.resultCode === 1) {
                        resolve(res);
                    } else if (res.resultCode === 0) {
                        Modal.info({
                            "title": "错误提示",
                            "content": res.resultMsg
                        })
                    } else if (res.resultCode === 2) {
                        // return (
                        //     <Redirect to="/login"/>
                        // )
                    }
                } else {
                    reject(response.data);
                }

            }).catch((e) => {
                Modal.info({
                    "title": "错误提示",
                    "content": "网络异常"
                })
            });


        });
    },
    //验证token是否有效
    async authToken(callback){
        // let isAuth = false;
        // await axios.post(StringConstant.SERVER_URL+"/sysUser/validateToken",JSON.stringify({"token":localStorage.getItem("token")}),
        //     {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((res)=>{
        //     if(res.status === 200){ //请求成功
        //         let resp = res.data;
        //         if(resp.resultCode === StringConstant.SERVER_SUCCESS_RES_CODE){
        //             isAuth = true;
        //         }
        //         return isAuth;
        //     }else{
        //         Modal.error({
        //             title: '错误提示',
        //             content: "网络异常"
        //         });
        //     }
        //
        // }).catch((e)=>{
        //     Modal.error({
        //         title: '错误提示',
        //         content: "网络异常"
        //     });
        // });
        // return isAuth;
    }

};

export default util;