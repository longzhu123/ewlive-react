import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import AdminSlider from './AdminSlider/';
import AdminHeader from './AdminHeader/';
import AdminFooter from './AdminFooter/';
import UserSetting from '../Service/Setting/User';
import MenuSetting from '../Service/Setting/Menu';
import RoleSetting from '../Service/Setting/Role';
import DicSetting from '../Service/Setting/Dic';

import LogError from '../Service/Monitor/LogError';
import LogLogin from '../Service/Monitor/LogLogin';
import LogOperate from '../Service/Monitor/LogOperate';
import liveRoomMgr from '../Service/LiveMgr/LiveRoomMgr';

import AdminIndex from "./AdminIndex";
import NoMatch from "../../common/NoMatch";
import {Breadcrumb, Layout} from 'antd';
import {Route, Switch, Link} from 'react-router-dom';
import AuthorRoute from '../../route/AuthorRoute';
import './index.css';

const {Content} = Layout;

//Admin首页组件
class Admin extends PureComponent {

    render() {
        return (
            <Layout className="ant-layout-has-sider">
                <AdminSlider/>
                <Layout>
                    <AdminHeader/>
                    <Content className='admin-layout-content'>
                        <Breadcrumb className="admin-content-bread">
                            {this.breadCrumbs()}
                        </Breadcrumb>
                        <div className="admin-normal-content">
                            <Switch>
                                <AuthorRoute exact path="/admin" component={AdminIndex}/>
                                <AuthorRoute exact path="/admin/setting/user" component={UserSetting}/>
                                <AuthorRoute exact path="/admin/setting/menu" component={MenuSetting}/>
                                <AuthorRoute exact path="/admin/setting/role" component={RoleSetting}/>
                                <AuthorRoute exact path="/admin/setting/dic" component={DicSetting}/>
                                <AuthorRoute exact path="/admin/system/monitor/log/operate" component={LogOperate}/>
                                <AuthorRoute exact path="/admin/system/monitor/log/login" component={LogLogin}/>
                                <AuthorRoute exact path="/admin/system/monitor/log/error" component={LogError}/>
                                <AuthorRoute exact path="/admin/live/roomMgr" component={liveRoomMgr}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </div>
                    </Content>
                    <AdminFooter/>
                </Layout>
            </Layout>
        )
    }

    breadCrumbs() {
        const breadcrumbNameMap = {
            '/admin': '首页',
            '/admin/setting/user': '用户管理',
            '/admin/setting/menu': '菜单管理',
            '/admin/setting/role': '角色管理',
            '/admin/setting/dic': '字典管理',
            '/admin/system/monitor/log/operate': '操作日志',
            '/admin/system/monitor/log/error': '异常日志',
            '/admin/system/monitor/log/login': '登录日志',
            '/admin/live/roomMgr': '直播房间管理'
        };
        const path = window.location.pathname;
        if (path !== "/admin") {
            let menuName = breadcrumbNameMap[path] === undefined ? '404页面' : breadcrumbNameMap[path];
            return (
                <Breadcrumb.Item key={path}>
                    <Link to={'/admin'}>首页</Link>{" / " + menuName}
                </Breadcrumb.Item>
            );
        } else {
            return (
                <Breadcrumb.Item key={path}>
                    <Link to={'/admin'}>首页</Link>
                </Breadcrumb.Item>
            );
        }

    }
}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Admin);