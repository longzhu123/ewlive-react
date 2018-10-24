import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Icon, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {actionCreators} from './store';
import './index.css';
const {Sider} = Layout;

//Admin首页左侧组件
class AdminSlider extends PureComponent {
    render() {
        const {collapsed,leftMenuSelectKey,leftMenuClick} = this.props;
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className="logo" style={collapsed ? {backgroundSize: '70%'} : {backgroundSize: '30%'}}/>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[leftMenuSelectKey]}
                    onClick={leftMenuClick}
                >
                    <Menu.Item key={"/admin"}>
                        <Link to={"/admin"}>
                            <Icon type="home"/><span>首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={"/admin/form"} >
                        <Link to={"/admin/form"}>
                            <Icon type="form"/><span>表单</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={"/admin/chart"} >
                        <Link to={"/admin/chart"}>
                            <Icon type="area-chart"/><span>图表</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }

    componentDidMount(){
        this.props.changeLeftMenuSelectKey(window.location.pathname);
    }
}


const mapState = (state) => ({
    collapsed: state.get("adminHeader").get("collapsed"),
    leftMenuSelectKey:state.get("adminSlider").get("leftMenuSelectKey")
});

const mapDispatchToProps = (dispatch) => ({
    changeLeftMenuSelectKey(pathName){
        dispatch(actionCreators.changeLeftMenuSelectKey(pathName));
    },
    leftMenuClick(e){
        dispatch(actionCreators.changeLeftMenuSelectKey(e.key));
    }
});

export default connect(mapState, mapDispatchToProps)(AdminSlider);