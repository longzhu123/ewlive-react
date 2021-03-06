import React,{Component} from "react";
import {Redirect,Route}from "react-router-dom";
import  util from  '../util/util';

//鉴权路由组件
class AuthorRoute extends Component {
    render() {
        let {component: Component, ...rest} = this.props; //获取顶层provider上所有的信息(路由信息和store)
        util.authToken();
        return(
            <Route {...rest} render={props=>{
                return true?<Component {...this.props} />:<Redirect to="/login" />
            }}/>
        )

    }

}
export default AuthorRoute;