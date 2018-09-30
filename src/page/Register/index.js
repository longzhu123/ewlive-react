import React, {PureComponent} from 'react';
import {connect} from 'react-redux';


//注册组件
class Register extends PureComponent {

    render() {
        return (
            <div>注册页面</div>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Register);