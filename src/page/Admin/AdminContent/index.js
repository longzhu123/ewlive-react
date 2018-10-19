import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Layout} from 'antd';
import {Route,Switch} from 'react-router-dom';
import './index.css';
import AuthorRoute from '../../../route/AuthorRoute';
import Chart from "../../Service/Chart";
import Form from "../../Service/Form";
import NoMatch from "../../../common/NoMatch";
import AdminIndex from "../AdminIndex";

const {Content} = Layout;

//Admin首页内容组件
class AdminContent extends PureComponent {

    render() {
        return (
            <Content className='admin-layout-content'>
                <Breadcrumb className="admin-content-bread">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>表单</Breadcrumb.Item>
                </Breadcrumb>
                <div className="admin-normal-content">
                    <Switch>
                        <AuthorRoute exact path="/admin" component={AdminIndex}/>
                        <AuthorRoute exact path="/page/chart" component={Chart}/>
                        <AuthorRoute exact path="/page/form" component={Form}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Content>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(AdminContent);