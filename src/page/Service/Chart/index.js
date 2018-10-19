import React, {PureComponent} from 'react';
import {connect} from 'react-redux';


//Chart组件
class Chart extends PureComponent {

    render() {
        return (
            <div>Chart组件</div>
        )
    }

}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapState, mapDispatchToProps)(Chart);