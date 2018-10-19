import React, {PureComponent} from 'react';
import {connect} from 'react-redux';


//Form组件
class Form extends PureComponent {

    render() {
        return (
            <div>Form组件</div>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Form);