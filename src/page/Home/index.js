import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Home extends PureComponent {
    render() {
        return (
            localStorage.getItem("token") === null ?
                <Redirect to="/login"/> :
                <Redirect to="/admin"/>
        )
    }

}


export default connect(null, null)(Home);