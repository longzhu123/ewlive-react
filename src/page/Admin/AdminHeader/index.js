import {connect} from "react-redux";
import React, {PureComponent} from 'react';
import {Layout, Icon, Menu} from 'antd';
import {actionCreators} from './store';
import './index.css';


const {Header} = Layout;
const SubMenu = Menu.SubMenu;

//Admin首页头部组件
class AdminHeader extends PureComponent {


    render() {
        const {collapsed,toggleClick} = this.props;
        return (
            <Header className="admin-header">
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={toggleClick}
                />
                <Menu
                    mode="horizontal"
                    className='head-menu-lay-out'
                >
                    <SubMenu
                        title={<span>
                            <Icon type="user" className="head-icon"/>
                        </span>}
                    >
                        <Menu.Item key="logout" className="menu-item-text logout">
                            <span>logout</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}


const mapState = (state) => ({
    collapsed:state.get("adminHeader").get("collapsed")
});

const mapDispatchToProps = (dispatch) => ({
    toggleClick(){
        dispatch(actionCreators.toggleClick());
    }
});

export default connect(mapState, mapDispatchToProps)(AdminHeader);