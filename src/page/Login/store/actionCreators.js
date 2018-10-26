import * as ActionConstants from './constants';
import * as StringConstants from './../../../constant';
import axios from 'axios';
import {Modal} from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {fromJS} from 'immutable';

//用户登录Action
const authLoginAction = (user) => ({
    type: ActionConstants.AUTH_LOGIN_ACTION,
    user: fromJS(user)
});

//用户登录
export const authLogin = (values) => {

    return (dispatch) => {
        NProgress.start();
        //登录请求
        axios.post(StringConstants.SERVER_URL + "/sysUser/authLogin", JSON.stringify(values),
            {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((res) => {
            if (res.status === 200) { //请求成功
                let resp = res.data;
                if (resp.resultCode === StringConstants.SERVER_SUCCESS_RES_CODE) {
                    //将token存入本地
                    localStorage.setItem("token", resp.data.token);
                    localStorage.setItem("user", JSON.stringify(resp.data));
                    window.location.href = "/admin";
                    dispatch(authLoginAction(resp.data));
                    NProgress.done();

                } else if (resp.resultCode === StringConstants.SERVER_FAIL_RES_CODE) {
                    //显示错误信息
                    Modal.error({
                        title: '错误提示',
                        content: resp.resultMsg
                    });
                }
            } else {
                Modal.error({
                    title: '错误提示',
                    content: "网络异常"
                });
            }
            NProgress.done();
        }).catch((e) => {
            Modal.error({
                title: '错误提示',
                content: "网络异常"
            });
        })
    }
};