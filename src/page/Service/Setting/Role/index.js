import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import './index.css';


//角色管理组件
class Role extends PureComponent {

    render() {
        return (
           <div>
               <h1>角色管理</h1>
           </div>
        )

    }


}
const mapState = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapState, mapDispatchToProps)(Role);