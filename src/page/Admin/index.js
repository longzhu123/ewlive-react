import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import AdminSlider from './AdminSlider/AdminSlider';
import {Layout} from 'antd';

//Admin首页组件
class Admin extends PureComponent {

    render() {
        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <AdminSlider/>
            </Layout>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Admin);