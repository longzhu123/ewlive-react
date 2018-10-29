import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import './index.css';


//用户管理组件
class User extends PureComponent {

    render() {
        return (
           <div>
               <h1>用户管理</h1>
           </div>
        )

    }


}
const mapState = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapState, mapDispatchToProps)(User);