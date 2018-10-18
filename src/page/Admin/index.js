import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import AdminSlider from './AdminSlider/';
import AdminHeader from './AdminHeader/';
import AdminContent from './AdminContent/';
import AdminFooter from './AdminFooter/';
import {Layout} from 'antd';

//Admin首页组件
class Admin extends PureComponent {

    render() {
        return (
            <Layout className="ant-layout-has-sider">
                <AdminSlider/>
                <Layout>
                    <AdminHeader/>
                    <AdminContent/>
                    <AdminFooter/>
                </Layout>
            </Layout>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Admin);