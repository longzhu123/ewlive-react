import React, {PureComponent} from 'react';
import {connect} from 'react-redux';


//首页组件
class AdminIndex extends PureComponent {

    render() {
        return (
            <div>首页</div>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(AdminIndex);