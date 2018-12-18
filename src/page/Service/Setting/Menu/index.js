import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import './index.css';
import FontList from '../../../../common/FontList'
//菜单管理组件
class Menu extends PureComponent {

    render() {
        return (
            <div>
                <FontList/>
            </div>
        )

    }


}


const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Menu);