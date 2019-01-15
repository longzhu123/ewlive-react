import * as StringConstant from '../constant';
import React from "react";
import axios from 'axios';
import {Modal, Select} from 'antd';

const Option = Select.Option;

let util = {
    //通用Ajax
    ajax(options) {
        options.data.token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios.post(options.url, JSON.stringify(options.data),
                {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((response) => {
                if (response.status === 200) {
                    let res = response.data;
                    if (res.resultCode === 1) {
                        resolve(res);
                    } else if (res.resultCode === 0) {
                        Modal.error({
                            "title": "错误提示",
                            "content": res.resultMsg
                        });
                        return;
                    } else if (res.resultCode === 2) {
                        window.location = '/login';
                    }
                } else {
                    reject(response.data);
                    return;
                }

            }).catch((e) => {
                Modal.error({
                    "title": "错误提示",
                    "content": "网络异常"
                })
                return;
            });


        });
    },
    //验证token是否有效
    authToken() {
        axios.post(StringConstant.SERVER_URL + "/sysUser/validateToken", JSON.stringify({"token": localStorage.getItem("token")}),
            {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((res) => {
            if (res.status === 200) { //请求成功
                let resp = res.data;
                if (resp.resultCode === StringConstant.SERVER_SUCCESS_RES_CODE) {
                } else {
                    window.location = '/login';
                }

            } else {
                Modal.error({
                    title: '错误提示',
                    content: "网络异常"
                });
            }
        }).catch((e) => {
            Modal.error({
                title: '错误提示',
                content: "网络异常"
            });
        });
    },
    //渲染下拉框列表
    OptionList: (data) => {
        if (!data) {
            return [];
        }
        let OptionMap = [];
        data.map((item, index) => {
            OptionMap.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
            return index;
        });
        return OptionMap;
    },
    /**
     * 将对象数组里面,指定的属性拼接成一个list
     * @param soureArray  对象数组
     * @param filedName	指定的属性名
     */
    convertArrayToFiledList:(soureArray,filedName)=>{
        let dataArray = [];
        for(let item of soureArray){
            dataArray.push(item[filedName]);
        }
        return dataArray;
    }
};

export default util;