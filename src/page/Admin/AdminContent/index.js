import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Layout, Breadcrumb} from 'antd';
import './index.css';

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
                <div className="admin-normal-content">Content</div>
            </Content>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(AdminContent);