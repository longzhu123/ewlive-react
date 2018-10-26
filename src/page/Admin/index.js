import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import AdminSlider from './AdminSlider/';
import AdminHeader from './AdminHeader/';
import AdminFooter from './AdminFooter/';
import Form from "../Service/Form";
import Chart from "../Service/Chart";
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
                            <Link to={"/admin"}>首页</Link>
                            {this.breadCrumbs()}
                        </Breadcrumb>
                        <div className="admin-normal-content">
                            <Switch>
                                <AuthorRoute exact path="/admin" name="首页" component={AdminIndex}/>
                                <AuthorRoute exact path="/admin/chart" name="图表" component={Chart}/>
                                <AuthorRoute exact path="/admin/form" name="表单" component={Form}/>
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
            '/admin/form': '表单',
            '/admin/chart': '图表'
        };
        const path = window.location.pathname;
        if(path !== "/admin"){
            let menuName = breadcrumbNameMap[path] === undefined ? '404页面':breadcrumbNameMap[path];
            return (
                <Breadcrumb.Item key={path}>
                    {" / "+menuName}
                </Breadcrumb.Item>
            );
        }

    }
}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Admin);