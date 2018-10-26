import {connect} from "react-redux";
import React, {PureComponent} from 'react';
import {Icon, Layout, Menu} from 'antd';
import {actionCreators} from './store';
import './index.css';
import headPic from '../../../static/img/headPic.jpg';
import {Link} from 'react-router-dom';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

//Admin首页头部组件
class AdminHeader extends PureComponent {


    render() {
        const {collapsed, toggleClick, loginOut} = this.props;
        const  localUser = JSON.parse(localStorage.getItem("user"));
        return (
            <Header className="admin-header">
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={toggleClick}
                />
                <Menu
                    mode="horizontal"
                    style={{lineHeight: '64px', float: 'right'}}
                >
                    <SubMenu
                        title={<span className="avatar"><img src={headPic} alt="头像"/><i className="on bottom b-white"/></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 -{localUser.nickName}</Menu.Item>
                            <Menu.Item key="setting:2">个人设置</Menu.Item>
                            <Menu.Item key="loginOut"><Link to={'/login'} onClick={loginOut}>退出登录</Link></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }

}


const mapState = (state) => ({
    collapsed: state.get("adminHeader").get("collapsed")
});

const mapDispatchToProps = (dispatch) => ({
    toggleClick() {
        dispatch(actionCreators.toggleClick());
    },
    //登出
    loginOut() {
        localStorage.clear();
    }
});

export default connect(mapState, mapDispatchToProps)(AdminHeader);