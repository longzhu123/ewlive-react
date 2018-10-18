import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';


const {Content} = Layout;

//Admin首页内容组件
class AdminContent extends PureComponent {

    render() {
        return (
            <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                Content
            </Content>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(AdminContent);