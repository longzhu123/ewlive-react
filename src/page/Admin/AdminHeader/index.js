import {connect} from "react-redux";
import React, {PureComponent} from 'react';
import {Layout, Icon, Menu} from 'antd';
import './index.css';


const {Header} = Layout;
const SubMenu = Menu.SubMenu;
//Admin首页头部组件
class AdminHeader extends PureComponent {
    render() {
        return (
            <Header style={{background: '#fff', padding: 0}} className="header">
                <Icon
                    className="trigger"
                    type={'menu-unfold'}
                />
                <Menu
                    mode="horizontal"
                    style={{lineHeight: '64px', float: 'right'}}
                >
                    <SubMenu
                        title={<span>
                            <Icon type="user" style={{fontSize: 16, color: '#1DA57A'}}/>
                        </span>}
                    >
                        <Menu.Item key="logout" style={{textAlign: 'center'}} className="logout">
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