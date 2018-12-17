import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import './index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

//菜单管理组件
class Menu extends PureComponent {

    render() {
        return (
            <div>
                Favorite Food: <FontAwesomeIcon icon="igloo"/>
                <h1>菜单管理</h1>
            </div>
        )

    }


}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Menu);