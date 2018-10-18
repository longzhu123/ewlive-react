import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Icon, Layout, Menu} from 'antd';
import './index.css';

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

//Admin首页左侧组件
class AdminSlider extends PureComponent {
    render(){
        return(
            <Sider
            >
                <div className="logo" style={{backgroundSize: '30%'}}/>
                <Menu
                    theme="dark"
                    mode="inline"
                >
                    <Menu.Item key={"/app"}>
                        <Icon type="home"/><span>首页</span>
                    </Menu.Item>
                    <Menu.Item key={"/app/form"}>
                        <Icon type="form"/><span>表单</span>
                    </Menu.Item>
                    <SubMenu
                        key="/app/chart"
                        title={<span><Icon type="area-chart"/><span>图表</span></span>}
                    >
                        <Menu.Item key="/app/chart/echarts">
                            <span>echarts</span>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/app/richText">
                        <Icon type="edit"/><span>富文本</span>
                    </Menu.Item>
                    <Menu.Item key="/app/upload">
                        <Icon type="upload"/><span>文件上传</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}


const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(AdminSlider);