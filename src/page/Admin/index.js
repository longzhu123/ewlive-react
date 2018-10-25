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
import {Route, Switch} from 'react-router-dom';
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
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>表单</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="admin-normal-content">
                            <Switch>
                                <AuthorRoute exact path="/admin" component={AdminIndex}/>
                                <AuthorRoute exact path="/admin/chart" component={Chart}/>
                                <AuthorRoute exact path="/admin/form" component={Form}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </div>
                    </Content>
                    <AdminFooter/>
                </Layout>
            </Layout>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Admin);