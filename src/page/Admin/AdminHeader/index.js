import {connect} from "react-redux";
import React, {PureComponent} from 'react';
import {Layout, Icon, Menu} from 'antd';
import './index.css';


const {Header} = Layout;
const SubMenu = Menu.SubMenu;

//Admin首页头部组件
class AdminHeader extends PureComponent {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    render() {
        return (
            <Header className="admin-header">
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
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


const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(AdminHeader);