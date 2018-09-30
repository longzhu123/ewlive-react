import axios from 'axios';
import {Modal} from 'antd';
import * as StringConstant from '../constant';
import {Redirect} from 'react-router-dom';

let util = {
    //通用Ajax
    ajax(options) {
        options.params.token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
            axios.post(StringConstant.SERVER_URL + options.url, JSON.stringify(options.data),
                {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((res) => {
                if (response.status === 200) {
                    let res = response.data;
                    if (res.resultCode === 1) {
                        resolve(res);
                    } else if (res.resultCode === 0) {
                        Modal.info({
                            "title": "错误提示",
                            "content": res.resultMsg
                        })
                    } else if (res.resultCode === 3) {
                        return (
                            <Redirect to="/login"/>
                        )
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
    }
};

export default util;