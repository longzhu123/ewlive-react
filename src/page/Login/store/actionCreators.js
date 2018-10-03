import * as ActionConstants from './constants';
import * as StringConstants from './../../../constant';
import  axios from 'axios';
import  {Modal} from 'antd';

//用户登录Action
const  authLoginAction =  (loginToken)=>({
   type: ActionConstants.AUTH_LOGIN_ACTION,
    loginToken
});

//用户登录
export const authLogin = (values) => {
    let _this = this;
    return (dispatch) => {
        //登录请求
        axios.post(StringConstants.SERVER_URL+"/sysUser/authLogin",JSON.stringify(values),
            {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((res)=>{
            if(res.status === 200){ //请求成功
                let resp = res.data;
                if(resp.resultCode === StringConstants.SERVER_SUCCESS_RES_CODE){
                    Modal.success({
                        title: '成功',
                        content: "登录成功"
                    });
                    //将token存入本地
                    localStorage.setItem("token",resp.data.token);
                    dispatch(authLoginAction(resp.data.token));
                    //跳转到登录页
                    window.location.href = "/admin";
                }else if(resp.resultCode === StringConstants.SERVER_FAIL_RES_CODE){
                    //显示错误信息
                    Modal.error({
                        title: '错误提示',
                        content: resp.resultMsg
                    });
                }
            }else{
                Modal.error({
                    title: '错误提示',
                    content: "网络异常"
                });
            }

        }).catch((e)=>{
            Modal.error({
                title: '错误提示',
                content: "网络异常"
            });
        })
    }
};