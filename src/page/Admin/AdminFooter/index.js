import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import './index.css';


const {Footer} = Layout;

//Admin首页Footer组件
class AdminFooter extends PureComponent {

    render() {
        return (
            <Footer className="admin-footer">
                优智直播 ©2018 Created by yangjie
            </Footer>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(AdminFooter);