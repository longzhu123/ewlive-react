import React, {PureComponent} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import {Icon, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {actionCreators} from './store';
import './index.css';

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;
//Admin首页左侧组件
class AdminSlider extends PureComponent {
    render() {
        const {collapsed, leftMenuSelectKey, leftMenuClick} = this.props;
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ overflowY: 'auto' }}
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
                    <SubMenu
                        key="/admin/setting"
                        title={<span><Icon type="setting"/><span>系统管理</span></span>}
                    >
                        <Menu.Item key="/admin/setting/user">
                            <Link to={'/admin/setting/user'}><span><Icon type="user"/>用户管理</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/setting/menu">
                            <Link to={'/admin/setting/menu'}><span><Icon type="bars"/>菜单管理</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/setting/role">
                            <Link to={'/admin/setting/role'}><span><Icon type="team"/>角色管理</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/setting/dic">
                            <Link to={'/admin/setting/dic'}><span><Icon type="book"/>字典管理</span></Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="/admin/system/monitor"
                        title={<span><Icon type="alert"/><span>系统监控</span></span>}
                    >
                        <Menu.Item key="/admin/system/monitor/log/operate">
                            <Link to={'/admin/system/monitor/log/operate'}><span><Icon type="solution"/>操作日志</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/system/monitor/log/error">
                                <Link to={'/admin/system/monitor/log/error'}><span><Icon type="exception"/>异常日志</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/system/monitor/log/login">
                            <Link to={'/admin/system/monitor/log/login'}><span><Icon type="file-done"/>登录日志</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="/admin/live"
                        title={<span><Icon type="youtube" /><span>直播管理</span></span>}
                    >
                        <Menu.Item key="/admin/live/roomMgr">
                            <Link to={'/admin/live/roomMgr'}><span><FontAwesomeIcon icon={["fab", "modx"]} size="sm"/><span>&nbsp;&nbsp;直播房间管理</span></span></Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }

    componentDidMount() {
        this.props.changeLeftMenuSelectKey(window.location.pathname);
    }
}


const mapState = (state) => ({
    collapsed: state.get("adminHeader").get("collapsed"),
    leftMenuSelectKey: state.get("adminSlider").get("leftMenuSelectKey")
});

const mapDispatchToProps = (dispatch) => ({
    changeLeftMenuSelectKey(pathName) {
        dispatch(actionCreators.changeLeftMenuSelectKey(pathName));
    },
    leftMenuClick(e) {
        dispatch(actionCreators.changeLeftMenuSelectKey(e.key));
    }
});

export default connect(mapState, mapDispatchToProps)(AdminSlider);